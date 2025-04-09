import { z } from "zod";

const isServer = typeof window === "undefined";

export const ProductSchema = z.object({
    name: z.string().min(1, { message: "Product name is required" }),
    description: z.string().min(1, { message: "Product description is required" }),
    price: z.number().nonnegative({ message: "Price must be a non-negative number" }),
    images: z.array(
        z.instanceof(File, { message: "Each item must be a File" })
    ).refine((files) => {
        if (isServer) {
            return files.every(file => file instanceof File);
        } else {
            return files instanceof FileList && files.length > 0 && Array.from(files).every(file => file instanceof File);
        }
    }, { message: "Product images should be valid files" }),
    category: z.string().min(1, { message: "Category is required" }),
    stock: z.number().int().nonnegative({ message: "Stock must be a non-negative integer" }),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
    userId: z.string().optional()
});
