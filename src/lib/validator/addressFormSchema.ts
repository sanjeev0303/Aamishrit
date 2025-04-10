import { z } from "zod";

export const AddressFormSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" }),
  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, {
      message: "Please enter a valid 10-digit Indian mobile number",
    }),
  pinCode: z
    .string()
    .regex(/^\d{6}$/, { message: "Please enter a valid 6-digit PIN code" }),
  addressLine1: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  addressLine2: z.string().optional(),
  landmark: z.string().optional(),
  city: z.string().min(2, { message: "Please enter a valid city name" }),
  state: z.string({ required_error: "Please select a state" }),
  isDefault: z.boolean().default(false),
});
