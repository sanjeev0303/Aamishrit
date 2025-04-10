// "use client"

// import { useEffect } from "react"
// import { Control, useForm, } from "react-hook-form"
// import type * as z from "zod"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { AddressFormSchema } from "@/lib/validator/addressFormSchema"
// import { zodResolver } from "@hookform/resolvers/zod"

// // List of Indian states
// const INDIAN_STATES = [
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttar Pradesh",
//   "Uttarakhand",
//   "West Bengal",
//   "Andaman and Nicobar Islands",
//   "Chandigarh",
//   "Dadra and Nagar Haveli and Daman and Diu",
//   "Delhi",
//   "Jammu and Kashmir",
//   "Ladakh",
//   "Lakshadweep",
//   "Puducherry",
// ]

// type AddressFormValues = z.infer<typeof AddressFormSchema>

// interface AddressFormProps {
//   address?: Partial<AddressFormValues>
//   onSubmit: (data: FormData) => void
//   onCancel: () => void
//   isSubmitting: boolean
// }

// export default function AddressForm({ address, onSubmit, onCancel, isSubmitting }: AddressFormProps) {
//   // Initialize form with react-hook-form
//   const form = useForm<AddressFormValues>({
//     resolver: zodResolver(AddressFormSchema),
//     defaultValues: {
//       fullName: "",
//       mobileNumber: "",
//       pinCode: "",
//       addressLine1: "",
//       addressLine2: "",
//       landmark: "",
//       city: "",
//       state: "",
//       isDefault: false,
//     },
//   })

//   // Update form values when address prop changes
//   useEffect(() => {
//     if (address) {
//       form.reset({
//         fullName: address.fullName || "",
//         mobileNumber: address.mobileNumber || "",
//         pinCode: address.pinCode || "",
//         addressLine1: address.addressLine1 || "",
//         addressLine2: address.addressLine2 || "",
//         landmark: address.landmark || "",
//         city: address.city || "",
//         state: address.state || "",
//         isDefault: Boolean(address.isDefault),
//       })
//     }
//   }, [address, form])

//   // Update the handleSubmit function to properly handle the form submission
//   const handleSubmit = form.handleSubmit((values) => {
//     const formData = new FormData()

//     // Add all form values to FormData
//     Object.entries(values).forEach(([key, value]) => {
//       if (value !== undefined && value !== null) {
//         formData.append(key, value.toString())
//       }
//     })

//     onSubmit(formData)
//   })

//   return (
//     <Form {...form}>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <FormField
//             control={form.control as unknown as Control<AddressFormValues>}
//             name="fullName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Full Name*</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your full name" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control as unknown as Control<AddressFormValues>}
//             name="mobileNumber"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Mobile Number*</FormLabel>
//                 <FormControl>
//                   <Input placeholder="10-digit mobile number" {...field} />
//                 </FormControl>
//                 <FormDescription>
//                     <span>We'll send delivery updates on this number</span>
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control as unknown as Control<AddressFormValues>}
//             name="pinCode"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>PIN Code*</FormLabel>
//                 <FormControl>
//                   <Input placeholder="6-digit PIN code" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control as unknown as Control<AddressFormValues>}
//             name="state"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>State*</FormLabel>
//                 <Select onValueChange={field.onChange} defaultValue={field.value}>
//                   <FormControl>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select your state" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {INDIAN_STATES.map((state) => (
//                       <SelectItem key={state} value={state}>
//                         {state}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control as unknown as Control<AddressFormValues>}
//             name="city"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>City/District/Town*</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Enter your city" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="md:col-span-2">
//             <FormField
//               control={form.control as unknown as Control<AddressFormValues>}
//               name="addressLine1"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Address (House No, Building, Street, Area)*</FormLabel>
//                   <FormControl>
//                     <Textarea placeholder="Enter your full address" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <FormField
//             control={form.control as unknown as Control<AddressFormValues>}
//             name="addressLine2"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Apartment/Suite/Floor (Optional)</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Additional address details" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control as unknown as Control<AddressFormValues>}
//             name="landmark"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Landmark (Optional)</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Nearby landmark for easy navigation" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="md:col-span-2">
//             <FormField
//               control={form.control as unknown as Control<AddressFormValues>}
//               name="isDefault"
//               render={({ field }) => (
//                 <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
//                   <FormControl>
//                     <Checkbox checked={field.value} onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <div className="space-y-1 leading-none">
//                     <FormLabel>Make this my default address</FormLabel>
//                     <FormDescription>
//                       This address will be used as the default for all deliveries and communications
//                     </FormDescription>
//                   </div>
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>

//         <div className="flex gap-4">
//           <Button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? "Saving..." : address ? "Update Address" : "Save Address"}
//           </Button>
//           <Button type="button" variant="outline" onClick={onCancel}>
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }


import React from 'react'

const AddressForm = () => {
  return (
    <div>AddressForm</div>
  )
}

export default AddressForm
