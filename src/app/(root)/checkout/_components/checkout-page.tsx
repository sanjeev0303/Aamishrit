"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { createOrder } from "@/actions/api"
import PaymentForm from "./payment-form"
import CheckoutItems from "./checkout-items"
import AddressForm from "../../profile/_components/adddress-form"
import { useAppSelector } from "@/react-redux/store"
import { clearCart } from "@/react-redux/slices/cartSlice"
import { createUserAddress, getUserAddress } from "@/https/api"
import { onAuthenticateUser } from "@/actions/user"
import { Address } from "@/types"

export default function CheckoutPage() {
  const router = useRouter()
  const cartItems = useAppSelector((state) => state.cartReducer.items)
  const [step, setStep] = useState(1)
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState(null)
  const [userId, setUserId] = useState<string | null>("null")

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

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  // Fetch user addresses
  const {
    data: addresses,
    isLoading: isAddressesLoading,
    refetch: refetchAddresses,
  } = useQuery({
    queryKey: ["userAddresses"],
    queryFn: () => {
      if (!userId) throw new Error("User not authenticated")
      return getUserAddress(userId)
    },
  })

  // Set default address if available
  useEffect(() => {
    if (addresses && addresses.length > 0 && !selectedAddressId ) {
      const defaultAddress = addresses.find((addr: any) => addr.isDefault)
      setSelectedAddressId(defaultAddress ? defaultAddress.id : addresses[0].id)
    }
  }, [addresses, selectedAddressId, router])

  // Add address mutation
  const addAddressMutation = useMutation({
    mutationFn: (formData: any) => {
      if (!userId) throw new Error("User not authenticated")
      // Make sure we're passing the isDefault field
      return createUserAddress(formData, userId)
    },
    onSuccess: () => {
      refetchAddresses()
      setIsAddingAddress(false)
      toast.success("Address added successfully")
    },
    onError: (error) => {
      toast.error("Failed to add address", {
        description: error instanceof Error ? error.message : "Please try again later",
      })
    },
  })

  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      clearCart()
      toast.success("Order placed successfully!")
      router.push(`/orders/${data.id}`)
    },
    onError: (error) => {
      toast.error("Failed to place order", {
        description: error instanceof Error ? error.message : "Please try again later",
      })
    },
  })

  const handleAddAddress = (addressData: any) => {
    addAddressMutation.mutate(addressData)
  }

  const handlePaymentSubmit = (data: any) => {
    setPaymentInfo(data)
    setStep(3)
  }

  const handlePlaceOrder = () => {
    if (!selectedAddressId || !paymentInfo) {
      toast.error("Missing required information")
      return
    }

    const selectedAddress = addresses?.find((addr: any) => addr.id === selectedAddressId)

    createOrderMutation.mutate({
      items: cartItems,
      shippingAddress: selectedAddress,
      paymentInfo,
      subtotal,
      shipping,
      tax,
      total,
    })
  }

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart")
    }
  }, [cartItems.length, router])

  if (cartItems.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Step 1: Shipping */}
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
                    {isAddressesLoading ? (
                      <div className="animate-pulse space-y-4">
                        <div className="h-12 bg-gray-200 rounded"></div>
                        <div className="h-12 bg-gray-200 rounded"></div>
                      </div>
                    ) : addresses && addresses.length > 0 ? (
                        <RadioGroup value={selectedAddressId || ""} onValueChange={setSelectedAddressId}>
                        <div className="space-y-4">
                          {addresses.map((address: Address, index: number) => (
                            <div key={index} className="flex items-start space-x-3">
                              <RadioGroupItem value={address.id} id={`address-${address.id}`} className="mt-1" />
                              <div className="grid gap-1.5">
                                <Label htmlFor={`address-${address.fullName}`} className="font-medium">
                                  {address.fullName} {address.isDefault && "(Default)"}
                                </Label>
                                <div className="text-sm text-gray-500">
                                  <p>{address.addressLine1}</p>
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

                      <Button onClick={() => setStep(2)} disabled={!selectedAddressId && !isAddingAddress}>
                        Continue to Payment
                      </Button>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex justify-between">
                  <div>
                    {selectedAddressId && addresses && (
                      <div className="text-sm">
                        {(() => {
                          const address = addresses.find((a: any) => a.id === selectedAddressId)
                          return address ? (
                            <>
                              <p className="font-medium">{address.name}</p>
                              <p>{address.street}</p>
                              <p>
                                {address.city}, {address.state} {address.zip}
                              </p>
                              <p>{address.country}</p>
                              <p>{address.phone}</p>
                            </>
                          ) : null
                        })()}
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

          {/* Step 2: Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-2">
                  2
                </div>
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 2 ? (
                <PaymentForm onSubmit={handlePaymentSubmit} />
              ) : step > 2 ? (
                <div className="flex justify-between">
                  <div className="text-sm">
                    <p className="font-medium">Credit Card</p>
                    <p>**** **** **** 1234</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setStep(2)}>
                    Change
                  </Button>
                </div>
              ) : (
                <div className="text-gray-500">Please complete the shipping information first.</div>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Review */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-2">
                  3
                </div>
                Review Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step === 3 ? (
                <CheckoutItems items={cartItems} />
              ) : (
                <div className="text-gray-500">Please complete the payment information first.</div>
              )}
            </CardContent>
            {step === 3 && (
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={createOrderMutation.isPending}
                >
                  {createOrderMutation.isPending ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {/* Order Summary */}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
