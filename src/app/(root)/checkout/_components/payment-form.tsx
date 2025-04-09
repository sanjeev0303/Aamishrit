"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "sonner"

interface PaymentFormProps {
  onSubmit: (data: any) => void
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned

      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }

      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (paymentMethod === "credit-card") {
      if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
        toast.error("Invalid card number")
        return
      }

      if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
        toast.error("Invalid expiry date (MM/YY)")
        return
      }

      if (formData.cvv.length < 3) {
        toast.error("Invalid CVV")
        return
      }
    }

    onSubmit({
      method: paymentMethod,
      ...formData,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <RadioGroupItem disabled={true} value="credit-card" id="credit-card" />
            <Label htmlFor="credit-card" className="font-medium">
              Credit Card
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem disabled={true} value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="font-medium">
              PayPal
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="font-medium">
              COD (Cash ON Delivery)
            </Label>
          </div>
        </div>
      </RadioGroup>

      {paymentMethod === "credit-card" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleInputChange}
              maxLength={19} // 16 digits + 3 spaces
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Name on Card</Label>
            <Input
              id="cardName"
              name="cardName"
              placeholder="John Doe"
              value={formData.cardName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                maxLength={5} // MM/YY
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                type="password"
                placeholder="123"
                value={formData.cvv}
                onChange={handleInputChange}
                maxLength={4}
                required
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "paypal" && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-center text-gray-600">You will be redirected to PayPal to complete your payment.</p>
        </div>
      )}

      {paymentMethod === "cod" && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-center text-gray-600">Payment is done on the delivery time</p>
        </div>
      )}

      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  )
}
