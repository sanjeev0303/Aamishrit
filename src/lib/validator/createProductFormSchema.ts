import { z } from "zod";


export const CreateProductFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.string().min(1, "Price is required"),
    category: z.string().min(1, "Category is required"),
    stock: z.string().min(1, "Stock is required"),
    images: z.array(z.instanceof(File)).min(1, {
        message: 'Design image is required',
      }),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
});
