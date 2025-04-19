import api from "@/utils/axios";
import { Category } from "@/types";

export async function getAllCategories(): Promise<Category[]> {
    try {
        const res = await api.get("/categories");
        return res.data;
    } catch (err: any) {
        throw new Error(err?.response?.data?.message || "Failed to fetch categories")
    }
}

// export async function getCategoryById(id: string | number): Promise<Category | null> {
//     try {
//         const res = await api.get(`/categories/${id}`);
//         return res.data;
//     } catch (err: any) {
//         throw new Error(err?.response?.data?.message || `Failed to fetch category ${id}`);
//     }
// }


// export async function getCategoryById(id: string | number): Promise<Category | null> {
//     try {
//       const res = await api.get(`/categories/${id}`);
//       const category = res.data;

//       return {
//         ID: category.ID,
//         name: category.name,
//         description: category.description,
//         images: category.images,
//         Products: category.Products,
//       };
//     } catch (err: any) {
//       throw new Error(err?.response?.data?.message || `Failed to fetch category ${id}`);
//     }
//   }



export async function getCategoryById(id: string | number): Promise<Category | null> {
    console.log("[getCategoryById] Fetching category with ID:", id);

    try {
      const res = await api.get(`/categories/${id}`);
      console.log("[getCategoryById] Raw response data:", res.data);

      const category = res.data;

      // Check and log individual fields
      console.log("[getCategoryById] Parsed fields:");
      console.log("  ID:", category.ID);
      console.log("  Name:", category.name);
      console.log("  Description:", category.description);
      console.log("  Images:", category.images);
      console.log("  Products:", category.Products);

      const formattedCategory = {
        ID: category.ID,
        name: category.name,
        description: category.description,
        images: category.images,
        Products: category.Products,
      };

      console.log("[getCategoryById] Returning formatted category:", formattedCategory);
      return formattedCategory;

    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || `Failed to fetch category ${id}`;
      console.error("[getCategoryById] Error fetching category:", errorMessage);
      throw new Error(errorMessage);
    }
  }

