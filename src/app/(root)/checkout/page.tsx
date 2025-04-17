"use client";

import { useState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { createOrder } from "@/Dummies/api";
import PaymentForm from "./payment-form";
import CheckoutItems from "./chekcout-items";
import AddressForm from "../profile/_components/address-form";
import {
  createUserAddress,
  getUserAddresses,
  getCurrentUser,
} from "@/Dummies/api";
import { useAppSelector, useAppDispatch } from "@/react-redux/store";
import { clearCart } from "@/react-redux/slices/cartSlice";
import type { Address, PaymentInfo } from "@/Dummies/dummy-types";
import { useOptimistic } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import EmptyState from "@/components/global/empty-state";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const [step, setStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  // Fetch current user
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  // Fetch user addresses
  const { data: addresses = [], isLoading: isLoadingAddresses } = useQuery({
    queryKey: ["userAddresses", user?.id],
    queryFn: () => (user ? getUserAddresses(user.id) : Promise.resolve([])),
    enabled: !!user,
  });

  // Optimistic UI state for addresses
  const [optimisticAddresses, addOptimisticAddress] = useOptimistic<
    Address[],
    Partial<Address>
  >(addresses, (state, newAddress) => [
    ...state.map((addr) =>
      newAddress.isDefault ? { ...addr, isDefault: false } : addr
    ),
    {
      id: `temp_${Date.now()}`,
      fullName: newAddress.fullName || "",
      addressLine1: newAddress.addressLine1 || "",
      addressLine2: newAddress.addressLine2 || "",
      landmark: newAddress.landmark || "",
      city: newAddress.city || "",
      state: newAddress.state || "",
      pinCode: newAddress.pinCode || "",
      country: newAddress.country || "India",
      mobileNumber: newAddress.mobileNumber || "",
      isDefault: newAddress.isDefault || state.length === 0,
      userId: user?.id || "",
    } as Address,
  ]);

  // Add address mutation
  const addAddressMutation = useMutation({
    mutationFn: (addressData: Partial<Address>) => {
      if (!user) throw new Error("User not authenticated");
      return createUserAddress(addressData, user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAddresses", user?.id] });
      setIsAddingAddress(false);
      toast.success("Address added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add address", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
    },
  });

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      router.push(`/orders/${data.id}`);
    },
    onError: (error) => {
      toast.error("Failed to place order", {
        description:
          error instanceof Error ? error.message : "Please try again later",
      });
    },
  });

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  // Set default address if available
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      setSelectedAddressId(
        defaultAddress ? defaultAddress.id : addresses[0].id
      );
    }
  }, [addresses, selectedAddressId]);

  // Add address handler with optimistic updates
  const handleAddAddress = async (addressData: Partial<Address>) => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    try {
      // Wrap the optimistic update in startTransition
      startTransition(() => {
        // Apply optimistic update
        addOptimisticAddress(addressData);
      });

      // Actual API call
      await addAddressMutation.mutateAsync(addressData);

      // Select the new address (will be updated after query invalidation)
      const updatedAddresses = await getUserAddresses(user.id);
      const newAddress = updatedAddresses.find(
        (addr) =>
          addr.fullName === addressData.fullName &&
          addr.addressLine1 === addressData.addressLine1
      );
      if (newAddress) {
        setSelectedAddressId(newAddress.id);
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  // Payment submission handler
  const handlePaymentSubmit = (data: PaymentInfo) => {
    setPaymentInfo(data);
    setStep(3);
    toast.success("Payment information saved");
  };

  // Place order handler with optimistic UI
  const handlePlaceOrder = async () => {
    if (!selectedAddressId || !paymentInfo) {
      toast.error("Missing required information");
      return;
    }

    const selectedAddress = optimisticAddresses.find(
      (addr) => addr.id === selectedAddressId
    );
    if (!selectedAddress) {
      toast.error("Selected address not found");
      return;
    }

    // Show optimistic toast
    toast.loading("Processing your order...");

    try {
      await createOrderMutation.mutateAsync({
        items: cartItems,
        shippingAddress: selectedAddress,
        paymentInfo,
        subtotal,
        shipping,
        tax,
        total,
      });
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="container w-full h-screen mx-auto px-4 py-12 lg:pt-20 flex items-center justify-center">
        <EmptyState
          title="Your cart is empty"
          description="Add some items to your cart before proceeding to checkout."
          icon="shopping-cart"
          action={
            <Button
              onClick={() => router.push("/")}
              className="bg-brown-400 text-brown-700 hover:bg-brown-300 hover:text-brown-800"
            >
              Continue Shopping
            </Button>
          }
        />
      </div>
    );
  }

  // Get the selected address for display
  const selectedAddress = selectedAddressId
    ? optimisticAddresses.find((addr) => addr.id === selectedAddressId)
    : null;

  return (
    <div className="container mx-auto px-4 py-12 lg:pt-20">
      <h1 className="text-3xl font-bold mb-8 text-brown-heading">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-2">
                  1
                </div>
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 1 ? (
                isAddingAddress ? (
                  <AddressForm
                    onSubmit={handleAddAddress}
                    onCancel={() => setIsAddingAddress(false)}
                    isSubmitting={addAddressMutation.isPending}
                  />
                ) : (
                  <div className="space-y-6">
                    {isLoadingAddresses ? (
                      <div className="animate-pulse space-y-4">
                        <div className="h-12 bg-gray-200 rounded"></div>
                        <div className="h-12 bg-gray-200 rounded"></div>
                      </div>
                    ) : optimisticAddresses.length > 0 ? (
                      <RadioGroup
                        value={selectedAddressId || ""}
                        onValueChange={setSelectedAddressId}
                      >
                        <div className="space-y-4">
                          {optimisticAddresses.map((address: Address) => (
                            <div
                              key={address.id}
                              className="flex items-start space-x-3"
                            >
                              <RadioGroupItem
                                value={address.id}
                                id={`address-${address.id}`}
                                className="mt-1"
                              />
                              <div className="grid gap-1.5">
                                <Label
                                  htmlFor={`address-${address.id}`}
                                  className="font-medium"
                                >
                                  {address.fullName}{" "}
                                  {address.isDefault && "(Default)"}
                                </Label>
                                <div className="text-sm text-gray-500">
                                  <p>{address.addressLine1}</p>
                                  {address.addressLine2 && (
                                    <p>{address.addressLine2}</p>
                                  )}
                                  <p>
                                    {address.city}, {address.state}{" "}
                                    {address.pinCode}
                                  </p>
                                  <p>{address.country}</p>
                                  <p>{address.mobileNumber}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    ) : (
                      <p className="text-gray-500">
                        No saved addresses. Please add a shipping address.
                      </p>
                    )}

                    <div className="flex justify-between items-center">
                      {!isAddingAddress && (
                        <Button
                          variant="outline"
                          onClick={() => setIsAddingAddress(true)}
                        >
                          Add New Address
                        </Button>
                      )}

                      <Button
                        onClick={() => setStep(2)}
                        disabled={
                          isAddingAddress ||
                          !selectedAddressId ||
                          optimisticAddresses.length === 0
                        }
                      >
                        Continue to Review
                      </Button>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex justify-between">
                  <div>
                    {selectedAddress && (
                      <div className="text-sm">
                        <p className="font-medium">
                          {selectedAddress.fullName}
                        </p>
                        <p>{selectedAddress.addressLine1}</p>
                        {selectedAddress.addressLine2 && (
                          <p>{selectedAddress.addressLine2}</p>
                        )}
                        <p>
                          {selectedAddress.city}, {selectedAddress.state}{" "}
                          {selectedAddress.pinCode}
                        </p>
                        <p>{selectedAddress.country}</p>
                        <p>{selectedAddress.mobileNumber}</p>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStep(1)}
                  >
                    Change
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 2: Order Review */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-2">
                  2
                </div>
                Order Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 2 ? (
                <div className="space-y-6">
                  <CheckoutItems items={cartItems} />

                  <div className="mt-6 space-y-3 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Subtotal ({cartItems.length} items)
                      </span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tax (5%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setStep(3)}>
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              ) : step > 2 ? (
                <div className="space-y-4">
                  <p className="font-medium">Order Summary</p>
                  <div className="flex justify-between text-sm">
                    <span>{cartItems.length} items</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStep(2)}
                  >
                    View Details
                  </Button>
                </div>
              ) : (
                <div className="text-gray-500">
                  Please complete the shipping information first.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-2">
                  3
                </div>
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 3 ? (
                <PaymentForm onSubmit={handlePaymentSubmit} />
              ) : (
                <div className="text-gray-500">
                  {step < 3
                    ? "Please review your order first."
                    : "Payment completed."}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Place Order Button */}
          {step === 3 && paymentInfo && (
            <Button
              className="w-full py-6 text-lg"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={createOrderMutation.isPending}
            >
              {createOrderMutation.isPending ? "Processing..." : "Place Order"}
            </Button>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Show current checkout progress */}
              <div className="mt-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                        step >= 1
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-200"
                      }`}
                    >
                      {step > 1 ? "✓" : "1"}
                    </div>
                    <span
                      className={step >= 1 ? "font-medium" : "text-gray-500"}
                    >
                      Shipping Address
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                        step >= 2
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-200"
                      }`}
                    >
                      {step > 2 ? "✓" : "2"}
                    </div>
                    <span
                      className={step >= 2 ? "font-medium" : "text-gray-500"}
                    >
                      Order Review
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                        step >= 3
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-200"
                      }`}
                    >
                      3
                    </div>
                    <span
                      className={step >= 3 ? "font-medium" : "text-gray-500"}
                    >
                      Payment
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
