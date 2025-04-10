"use client"


import ProductGrid from "@/components/product/product-grid"
import { getCategory } from "@/https/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import ProductGridSkeleton from "../../../../components/product/Product-grid-skeleton"

type Props = {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params

  const {data: category} = useQuery({
    queryKey: ["categoryById", slug],
    queryFn: async () => getCategory(slug)
  })

  console.log("category: ", category);


  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">

        <div className="w-full">
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            {category.productImages && (
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src={category.productImages[0] || "/placeholder.svg?height=300&width=800"}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{category.name}</h1>
                </div>
              </div>
            )}

            {!category.productImages && (
              <div className="p-6">
                <h1 className="text-3xl font-bold">{category.name}</h1>
              </div>
            )}

            {category.description && (
              <div className="p-6 pt-0 border-b">
                <p className="text-gray-600">{category.description}</p>
              </div>
            )}
          </div>

          {/* Products */}
          <h2 className="text-2xl font-bold mb-6">Products</h2>
          <Suspense fallback={<ProductGridSkeleton count={12} />}>
            <ProductGrid categorySlug={slug} />
          </Suspense>
        </div>
      </div>
  )
}
