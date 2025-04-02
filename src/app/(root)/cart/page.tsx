"use client"

import { useEffect, useRef, useState } from "react"
// import CartItem from "./_components/CartItem"
import { CheckCircle2, AlertCircle } from "lucide-react"
// import ShippingForm from "./_components/ShippingForm"
import { useScrollLock } from "@/hooks/use-scroll-lock"
import CartItem from "./_components/CardItem"

const cartItem = [
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
  {
    productId: "sdkflaji;",
    photo:
      "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Camera",
    price: 3000,
    quantity: 4,
    stock: 100,
  },
]
const subtotal = 4000
const tax = Math.round(subtotal * 0.18)
const shippingCharges = 200
const total = subtotal + tax + shippingCharges
const discount = 200

// Define the form submission result type
export type FormSubmissionResult = {
  status: "success" | "error"
  message: string
}

export default function CartPage() {
  const [couponCode, setCouponCode] = useState<string>("")
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false)
  const [showShippingForm, setShowShippingForm] = useState<boolean>(false)
  const [formResult, setFormResult] = useState<FormSubmissionResult | null>(null)
  const mainContentRef = useRef(null)
  useScrollLock(true)

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true)
      else setIsValidCouponCode(false)
    }, 1000)

    return () => {
      clearTimeout(timeOutID)
      setIsValidCouponCode(false)
    }
  }, [couponCode])

  // Handle form submission result
  const handleFormSubmissionResult = (result: FormSubmissionResult) => {
    setFormResult(result)
    if (result.status === "success") {
      // You could redirect to payment page or show payment options here
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden mt-20 ">

    {/* Main content - Scrollable */}
    <div className="flex flex-col lg:flex-row flex-grow overflow-hidden px-4 md:px-8 lg:px-12  gap-8">
      <main
        ref={mainContentRef}
        className="w-full lg:w-[70%] overflow-y-auto scrollbar-hide smooth-scroll space-y-4 pr-2 pb-6 py-8"
      >
        {showShippingForm ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shipping Information</h2>
              <button
                onClick={() => {
                  setShowShippingForm(false)
                  setFormResult(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Back to Cart
              </button>
            </div>

            {formResult && (
              <div
                className={`mb-6 p-4 rounded-md flex items-center gap-2 ${
                  formResult.status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
              >
                {formResult.status === "success" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <p>{formResult.message}</p>
              </div>
            )}

            {/* <ShippingForm onSubmissionResult={handleFormSubmissionResult} /> */}
          </div>
        ) : (
          cartItem.map((item, index) => <CartItem cartItem={item} key={index} />)
        )}
      </main>
      <aside className="w-full lg:w-[30%] flex flex-col self-center sticky top-6 bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-600">Subtotal:</p>
            <p>₹{subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Charges:</p>
            <p>₹{shippingCharges}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax:</p>
            <p>₹{tax}</p>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <p>Discount:</p>
              <p>- ₹{discount}</p>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg">
              <p>Total:</p>
              <p>₹{total - discount}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {!showShippingForm && (
            <>
              <div className="space-y-2">
                <label htmlFor="coupon" className="text-sm font-medium">
                  Apply Coupon
                </label>
                <div className="flex">
                  <input
                    id="coupon"
                    placeholder="Enter coupon code"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90">Apply</button>
                </div>
              </div>

              {couponCode && (
                <div className="text-sm">
                  {isValidCouponCode ? (
                    <span className="text-green-600 block p-2 bg-green-50 rounded">
                      ₹{discount} off using <code className="bg-green-100 px-1 rounded">{couponCode}</code>
                    </span>
                  ) : (
                    <span className="text-red-600 block p-2 bg-red-50 rounded">Invalid coupon code</span>
                  )}
                </div>
              )}
            </>
          )}

          <button
            className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
            onClick={() => setShowShippingForm(!showShippingForm)}
          >
            {showShippingForm ? "View Cart" : "Proceed to Shipping"}
          </button>

          {showShippingForm && formResult?.status === "success" && (
            <button className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors">
              Proceed to Payment
            </button>
          )}
        </div>
      </aside>
    </div>
    </div>
  )
}
