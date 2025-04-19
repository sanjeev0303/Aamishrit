// app/categories/[id]/page.tsx
import { getCategoryById } from "@/api/category"
import { notFound } from "next/navigation"
import ProductGrid from "@/components/product/product-grid"
import ProductGridSkeleton from "@/components/product/Product-grid-skeleton"
import Image from "next/image"
import { Suspense } from "react"

export default async function CategoryPage({
  params,
}: {
  params: { id: string | number }
}) {
  const category = await getCategoryById(params.id)

  if (!category) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          {category.images?.[0] && (
            <div className="relative h-48 md:h-64 w-full">
              <Image
                src={category.images[0]}
                alt={category.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {category.name}
                </h1>
              </div>
            </div>
          )}

          <div className="p-6 pt-0 border-b">
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>

        {/* Products */}
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <Suspense fallback={<ProductGridSkeleton count={12} />}>
          <ProductGrid categoryId={params.id} />
        </Suspense>
      </div>
    </div>
  )
}
