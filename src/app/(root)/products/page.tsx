import ProductGrid from "@/components/product/product-grid";
import ProductGridSkeleton from "@/components/product/Product-grid-skeleton";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-6 lg:pt-20
    ">
      <h1 className="text-3xl font-bold mb-8 text-brown-heading">
        All Products
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <Suspense>
          <div className="w-full ">
            <Suspense fallback={<ProductGridSkeleton count={12} />}>
              <ProductGrid />
            </Suspense>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
