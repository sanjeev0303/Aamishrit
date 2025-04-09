import { Suspense } from "react"
import ProductGrid from "@/components/product/product-grid"
import ProductGridSkeleton from "@/components/product/Product-grid-skeleton"
import ProductFilters from "@/components/product/product-filter"

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-brown-heading">All Products</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-[15vw]">
          <ProductFilters />
        </div>

        <div className="w-full md:w-3/4">
          <Suspense fallback={<ProductGridSkeleton count={12} />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
