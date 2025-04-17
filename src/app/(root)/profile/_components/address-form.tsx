"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AddressFormSchema } from "@/Dummies/validator/address-form-schema"
import { toast } from "@/components/ui/use-toast"

// List of Indian states
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
]

type AddressFormValues = z.infer<typeof AddressFormSchema>

interface AddressFormProps {
  address?: any
  onSubmit: (formData: AddressFormValues) => void
  onCancel: () => void
  isSubmitting: boolean
}

export default function AddressForm({ address, onSubmit, onCancel, isSubmitting }: AddressFormProps) {
  // Track optimistic UI state
  const [isOptimisticSubmitting, setIsOptimisticSubmitting] = useState(false)

  // Initialize form with react-hook-form
  const form = useForm<AddressFormValues, any>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      pinCode: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      city: "",
      state: "",
      isDefault: address?.isDefault ?? false,
    },
  })

  // Update form values when address prop changes
  useEffect(() => {
    if (address) {
      // Normalize the address data to match our form schema
      const normalizedAddress = {
        fullName: address.fullName || address.name || "",
        mobileNumber: address.mobileNumber || address.phone || "",
        pinCode: address.pinCode || address.zip || "",
        addressLine1: address.addressLine1 || address.street || "",
        addressLine2: address.addressLine2 || "",
        landmark: address.landmark || "",
        city: address.city || "",
        state: address.state || "",
        isDefault: Boolean(address.isDefault),
      }

      form.reset(normalizedAddress)
    }
  }, [address, form])

  // Handle form submission with optimistic UI updates
  const handleSubmit = async (values: AddressFormValues) => {
    try {
      // Start optimistic UI update
      setIsOptimisticSubmitting(true)

      // Show optimistic toast
      toast({
        title: address ? "Updating address..." : "Saving address...",
        description: "Your address is being processed.",
      })

      // Submit the form data directly (no need for FormData conversion)
      await onSubmit(values)

      // Show success toast
      toast({
        title: address ? "Address updated!" : "Address saved!",
        description: "Your address has been successfully saved.",
        variant: "default",
      })
    } catch (error) {
      // Show error toast if submission fails
      toast({
        title: "Something went wrong",
        description: "Your address could not be saved. Please try again.",
        variant: "destructive",
      })
      console.error("Form submission error:", error)
    } finally {
      // End optimistic UI update
      setIsOptimisticSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="10-digit mobile number"
                    {...field}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </FormControl>
                <FormDescription>We'll send delivery updates on this number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pinCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PIN Code*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="6-digit PIN code"
                    {...field}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || undefined}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    {INDIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City/District/Town*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (House No, Building, Street, Area)*</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your full address" {...field} className="min-h-[80px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apartment/Suite/Floor (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Additional address details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Nearby landmark for easy navigation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} id="isDefault" />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="isDefault" className="cursor-pointer">
                      Make this my default address
                    </FormLabel>
                    <FormDescription>
                      This address will be used as the default for all deliveries and communications
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isSubmitting || isOptimisticSubmitting}
            className="bg-brown-heading hover:bg-brown-heading/90 text-white"
          >
            {isSubmitting || isOptimisticSubmitting ? "Saving..." : address ? "Update Address" : "Save Address"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-brown-heading text-brown-heading hover:bg-brown-heading/10"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
}
