"use client"

import ProductGrid from "@/components/product/product-grid"
import ProductGridSkeleton from "@/components/product/Product-grid-skeleton"
import { getCategory } from "@/Dummies/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { notFound } from "next/navigation"
import React, { Suspense } from "react"

export const dymanic = "force-dymanic"

export default  function CategoryPage({
  params,
}: {
  params:  { slug: string }
}) {

const { slug } = params

  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategory(slug),
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 w-1/3 mb-4 rounded"></div>
          <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
          <div className="h-4 bg-gray-200 w-5/6 mb-8 rounded"></div>
        </div>
      </div>
    )
  }

  if (error || !category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 lg:pt-28">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          {category.productImages && (
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src={category.productImages[0] || "/placeholder.svg?height=300&width=800" || "/placeholder.svg"}
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
