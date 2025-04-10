import { z } from "zod";

const ProductItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    productImages: z.array(z.any()),
    description: z.string(),
    price: z.string(),
    category: z.string(),
    quantity: z.number()
});

const ShippingAddressSchema = z.object({
    id: z.string(),
    fullName: z.string(),
    mobileNumber: z.string(),
    addressLine1: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    isDefault: z.boolean()
});

const PaymentInfoSchema = z.object({
    method: z.enum(["cod"])
});

export const CreateOrderSchema = z.object({
    items: z.array(ProductItemSchema),
    shippingAddress: ShippingAddressSchema,
    paymentInfo: PaymentInfoSchema,
    subtotal: z.number(),
    shipping: z.number(),
    tax: z.number(),
    total: z.number()
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
