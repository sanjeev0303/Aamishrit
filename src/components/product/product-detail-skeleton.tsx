import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function ProductDetailSkeleton() {
  return (
    <div>
      <div className="mb-4">
        <Skeleton className="h-6 w-64" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-[500px] w-full rounded-lg" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-md" />
            ))}
          </div>
        </div>

        {/* Product Info skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-40" />
          </div>

          <Skeleton className="h-8 w-32" />

          <div>
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3" />
          </div>

          <Skeleton className="h-6 w-40" />

          <Separator />

          <div>
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-32" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-12 w-full sm:w-1/2" />
              <Skeleton className="h-12 w-full sm:w-1/2" />
            </div>
          </div>

          <Separator />

          <div>
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4" />
          </div>

          <Separator />

          <Skeleton className="h-8 w-40" />
        </div>
      </div>

      {/* Related Products skeleton */}
      <div className="mb-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="h-[200px] w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews skeleton */}
      <div className="mb-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="border rounded-lg p-6">
              <div className="flex flex-col items-center text-center">
                <Skeleton className="h-16 w-16 mb-2" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-40 mb-6" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-10 rounded-full mr-3" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

