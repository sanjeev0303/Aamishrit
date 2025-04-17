"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import type { PaymentInfo } from "@/types"

// Define the payment form schema
const paymentFormSchema = z.object({
  method: z.enum(["cod", "upi", "phonepe"]),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

interface PaymentFormProps {
  onSubmit: (data: PaymentInfo) => void
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  // Initialize form with react-hook-form
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      method: "cod",
    },
  })

  // Handle form submission
  const handleSubmit = (values: PaymentFormValues) => {
    onSubmit({
      method: values.method,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="upi" id="upi" disabled />
                      </FormControl>
                      <FormLabel htmlFor="upi" className="font-medium cursor-not-allowed text-muted-foreground">
                        UPI
                      </FormLabel>
                    </FormItem>
                    <Badge variant="outline" className="ml-auto">
                      Coming Soon
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="phonepe" id="phonepe" disabled />
                      </FormControl>
                      <FormLabel htmlFor="phonepe" className="font-medium cursor-not-allowed text-muted-foreground">
                        PhonePe
                      </FormLabel>
                    </FormItem>
                    <Badge variant="outline" className="ml-auto">
                      Coming Soon
                    </Badge>
                  </div>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="cod" id="cod" />
                    </FormControl>
                    <FormLabel htmlFor="cod" className="font-medium">
                      Cash On Delivery (COD)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("method") === "cod" && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-center text-gray-600">Payment will be collected upon delivery</p>
          </div>
        )}

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  )
}
