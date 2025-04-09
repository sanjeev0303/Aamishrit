"use server"


import { client } from "@/lib/prisma"

export async function getCategories() {
  try {
    const categories = await client.category.findMany({
      where: {
        isActive: true,
      },
      include: {
        children: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    })

    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await client.category.findUnique({
      where: {
        slug,
        isActive: true,
      },
      include: {
        children: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
          },
        },
        parent: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return category
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error)
    return null
  }
}

export async function getProductsByCategory(categorySlug: string, options?: { limit?: number }) {
  try {
    const category = await client.category.findUnique({
      where: {
        slug: categorySlug,
        isActive: true,
      },
      select: {
        id: true,
        children: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!category) {
      return []
    }

    // Get all subcategory IDs to include their products too
    const categoryIds = [category.id, ...(category.children?.map((child) => child.id) || [])]

    const products = await client.product.findMany({
      where: {
        categoryId: {
          in: categoryIds,
        },
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        originalPrice: true,
        productImages: true,
        stock: true,
        rating: true,
        reviewCount: true,
        onSale: true,
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: options?.limit || undefined,
    })

      // Transform the data to match the expected format
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price.toNumber(),
      originalPrice: product.originalPrice?.toNumber(),
      images: product.productImages.map((img) => img) || ["/placeholder.svg?height=300&width=300"],
      stock: product.stock,
      rating: product.rating,
      reviewCount: product.reviewCount,
      features: [], // This would be fetched separately if needed
      onSale: product.onSale,
      category: product.category,
    }))
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error)
    return []
  }
}
