import { z } from "zod";

export const AddressFormSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    mobileNumber: z.string().min(1, "Mobile number is required"),
    pinCode: z.string().min(1, "PIN code is required"),
    addressLine1: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    addressLine2: z.string().optional(),
    landmark: z.string().optional(),
    isDefault: z.boolean().default(false),
  })
