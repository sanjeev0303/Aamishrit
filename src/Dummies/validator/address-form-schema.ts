import * as z from "zod"

export const AddressFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  pinCode: z.string().regex(/^\d{6}$/, "PIN code must be 6 digits"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  addressLine2: z.string().optional(),
  landmark: z.string().optional(),
  city: z.string().min(2, "City name is required"),
  state: z.string().min(2, "State is required"),
  isDefault: z.boolean().default(false),
})
