"use client"

import { onAuthenticateUser } from "@/actions/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { createUserAddress, getUserAddress } from "@/https/api"
import { useAppSelector } from "@/react-redux/store"
import type { Address, PaymentInfo } from "@/types"
import { useRouter } from "next/navigation"
import { startTransition, useEffect, useOptimistic, useState } from "react"
import { toast } from "sonner"
import AddressForm from "../../profile/_components/address-list"
import CheckoutItems from "./checkout-items"
import PaymentForm from "./payment-form"

export default function CheckoutPage() {
  const router = useRouter()
  const cartItems = useAppSelector((state) => state.cartReducer?.items ?? [])
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isAddressesLoading, setIsAddressesLoading] = useState(true)

  useEffect(() => {
   setMounted(true)
  }, [])

  // Optimistic UI state for addresses
  const [optimisticAddresses, addOptimisticAddress] = useOptimistic<Address[], Partial<Address>>(
    addresses,
    (state, newAddress) => [
      ...state.map((addr) => (newAddress.isDefault ? { ...addr, isDefault: false } : addr)),
      {
        id: `temp_${Date.now()}`,
        fullName: newAddress.fullName || "",
        mobileNumber: newAddress.mobileNumber || "",
        addressLine1: newAddress.addressLine1 || "",
        addressLine2: newAddress.addressLine2 || "",
        landmark: newAddress.landmark || "",
        city: newAddress.city || "",
        state: newAddress.state || "",
        pinCode: newAddress.pinCode || "",
        country: "India",
        isDefault: newAddress.isDefault || state.length === 0,
        userId: userId || "",
      } as Address,
    ],
  )

  // Calculate totals
  const subtotal = cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  // Fetch user ID on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const result = await onAuthenticateUser()
        if (result?.user?.id) {
          setUserId(result.user.id)
        } else {
          toast.error("Authentication required")
          router.push("/sign-in")
        }
      } catch (error) {
        console.error("Authentication error:", error)
        toast.error("Authentication failed")
        router.push("/sign-in")
      }
    }
    fetchUserId()
  }, [router])

  // Fetch user addresses when userId is available
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userId) return

      setIsAddressesLoading(true)
      try {
        const addressData = await getUserAddress(userId)
        setAddresses(addressData)
      } catch (error) {
        console.error("Error fetching addresses:", error)
        toast.error("Failed to load addresses")
      } finally {
        setIsAddressesLoading(false)
      }
    }

    if (userId) {
      fetchAddresses()
    }
  }, [userId])

  // Set default address if available
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find((addr) => addr.isDefault)
      setSelectedAddressId(defaultAddress ? defaultAddress.id : addresses[0].id)
    }
  }, [addresses, selectedAddressId])

  // Add address handler with optimistic updates
  const handleAddAddress = async (formData: FormData) => {
    if (!userId) {
      toast.error("User not authenticated")
      return
    }

    try {
      // Extract form data for optimistic update
      const addressData: Partial<Address> = {
        fullName: formData.get("fullName") as string,
        mobileNumber: formData.get("mobileNumber") as string,
        pinCode: formData.get("pinCode") as string,
        addressLine1: formData.get("addressLine1") as string,
        addressLine2: (formData.get("addressLine2") as string) || undefined,
        landmark: (formData.get("landmark") as string) || undefined,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        isDefault: formData.get("isDefault") === "true",
      }

      // Wrap the optimistic update in startTransition
      startTransition(() => {
        // Apply optimistic update
        addOptimisticAddress(addressData)
      })

      // Actual API call
      const result = await createUserAddress(formData, userId)

      // Update with real data
      const updatedAddresses = await getUserAddress(userId)
      setAddresses(updatedAddresses)

      // Select the new address
      if (result.address && result.address.id) {
        setSelectedAddressId(result.address.id)
      }

      setIsAddingAddress(false)
      toast.success("Address added successfully")
    } catch (error) {
      console.error("Error adding address:", error)
      toast.error("Failed to add address")

      // Refresh addresses to revert optimistic update on error
      const updatedAddresses = await getUserAddress(userId)
      setAddresses(updatedAddresses)
    }
  }

  // Payment submission handler
  const handlePaymentSubmit = (data: PaymentInfo) => {
    setPaymentInfo(data)

    // Place order immediately after payment method selection
    handlePlaceOrder(data)
  }

  // Place order handler with optimistic UI
  const handlePlaceOrder = async (paymentData: PaymentInfo = paymentInfo!) => {

    if (!userId) {
      toast.error("User not authenticated")
      return
    }

    if (!selectedAddressId) {
      toast.error("Please select a shipping address")
      return
    }

    const selectedAddress = optimisticAddresses.find((addr) => addr.id === selectedAddressId)
    if (!selectedAddress) {
      toast.error("Selected address not found")
      return
    }

    console.log("selectedAddress", selectedAddress);


    // Show optimistic toast
    toast.loading("Processing your order...")

    try {
      const orderResult = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          shippingAddress: selectedAddress,
          paymentInfo: paymentData,
          subtotal,
          shipping,
          tax,
          total,
        }),
      });

      if (!orderResult.ok) {
        throw new Error('Failed to create order');
      }

      // Clear cart (in a real app, this would dispatch to Redux)
    //   const dispatch = useDispatch()
    //   dispatch(clearCart())

      toast.dismiss()
      toast.success("Order placed successfully!")

      // Navigate to order confirmation
    //   router.push(`/orders/${orderResult.id}`)
    } catch (error) {
      toast.dismiss()
      toast.error("Failed to place order", {
        description: error instanceof Error ? error.message : "Please try again later",
      })
    }
  }

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart")
    }
  }, [cartItems.length, router])

  if (cartItems.length === 0) {
    return null
  }

  if (!mounted) {
    return null

  }

  // Get the selected address for display
  const selectedAddress = selectedAddressId ? optimisticAddresses.find((addr) => addr.id === selectedAddressId) : null

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

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
                    isSubmitting={false}
                  />
                ) : (
                  <div className="space-y-6">
                    {isAddressesLoading ? (
                      <div className="animate-pulse space-y-4">
                        <div className="h-12 bg-gray-200 rounded"></div>
                        <div className="h-12 bg-gray-200 rounded"></div>
                      </div>
                    ) : optimisticAddresses.length > 0 ? (
                      <RadioGroup value={selectedAddressId || ""} onValueChange={setSelectedAddressId}>
                        <div className="space-y-4">
                          {optimisticAddresses.map((address: Address) => (
                            <div key={address.id} className="flex items-start space-x-3">
                              <RadioGroupItem value={address.id} id={`address-${address.id}`} className="mt-1" />
                              <div className="grid gap-1.5">
                                <Label htmlFor={`address-${address.id}`} className="font-medium">
                                  {address.fullName} {address.isDefault && "(Default)"}
                                </Label>
                                <div className="text-sm text-gray-500">
                                  <p>{address.addressLine1}</p>
                                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                                  <p>
                                    {address.city}, {address.state} {address.pinCode}
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
                      <p className="text-gray-500">No saved addresses. Please add a shipping address.</p>
                    )}

                    <div className="flex justify-between items-center">
                      {!isAddingAddress && (
                        <Button variant="outline" onClick={() => setIsAddingAddress(true)}>
                          Add New Address
                        </Button>
                      )}

                      <Button
                        onClick={() => setStep(2)}
                        disabled={isAddingAddress || !selectedAddressId || optimisticAddresses.length === 0}
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
                        <p className="font-medium">{selectedAddress.fullName}</p>
                        <p>{selectedAddress.addressLine1}</p>
                        {selectedAddress.addressLine2 && <p>{selectedAddress.addressLine2}</p>}
                        <p>
                          {selectedAddress.city}, {selectedAddress.state} {selectedAddress.pinCode}
                        </p>
                        <p>{selectedAddress.country}</p>
                        <p>{selectedAddress.mobileNumber}</p>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setStep(1)}>
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
                  <CheckoutItems items={cartItems}/>

                  <div className="mt-6 space-y-3 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subtotal ({cartItems.length} items)</span>
                      <span>₹ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Shipping</span>
                      <span>{shipping === 0 ? "Free" : `₹ ${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tax</span>
                      <span>₹ {tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => setStep(3)}>Proceed to Payment</Button>
                  </div>
                </div>
              ) : step > 2 ? (
                <div className="space-y-4">
                  <p className="font-medium">Order Summary</p>
                  <div className="flex justify-between text-sm">
                    <span>{cartItems.length} items</span>
                    <span>₹ {total.toFixed(2)}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setStep(2)}>
                    View Details
                  </Button>
                </div>
              ) : (
                <div className="text-gray-500">Please complete the shipping information first.</div>
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
                  {step < 3 ? "Please review your order first." : "Payment completed."}
                </div>
              )}
            </CardContent>
          </Card>
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
                  <span className="text-gray-500">Subtotal ({cartItems.length} items)</span>
                  <span>₹ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹ ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>₹ {tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Show current checkout progress */}
              <div className="mt-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-gray-200"}`}
                    >
                      {step > 1 ? "✓" : "1"}
                    </div>
                    <span className={step >= 1 ? "font-medium" : "text-gray-500"}>Shipping Address</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-gray-200"}`}
                    >
                      {step > 2 ? "✓" : "2"}
                    </div>
                    <span className={step >= 2 ? "font-medium" : "text-gray-500"}>Order Review</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-gray-200"}`}
                    >
                      3
                    </div>
                    <span className={step >= 3 ? "font-medium" : "text-gray-500"}>Payment</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
