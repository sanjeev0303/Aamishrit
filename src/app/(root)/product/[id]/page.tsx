import { Suspense } from "react"
import ProductDetail from "@/components/product/product-detail"
import ProductDetailSkeleton from "@/components/product/product-detail-skeleton"

export default async function ProductPage({ params }: { params: { id: string } }) {
    console.log(params);

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail id={params.id} />
      </Suspense>
    </div>
  )
}
