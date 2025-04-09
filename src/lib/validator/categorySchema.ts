import { z } from "zod"

export const CategorySchema = z.object({
    id: z.string(),
  name: z.string({ message: "Category name should be a string" }).min(4),
  product: z.array(z.string())
})
