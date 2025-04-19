import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 mt-18 pt-2">
      <div className="mb-6 h-8">
        <Skeleton className="h-8 w-32" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Images skeleton */}
        <div className="lg:w-[70%] space-y-4">
          <Skeleton className="h-[400px] md:h-[600px] w-full rounded-lg" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 w-24 rounded-md" />
            ))}
          </div>
        </div>

        {/* Product Info skeleton */}
        <div className="lg:w-[30%] space-y-6">
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

          <Separator className="border-[#E6D5C1]" />

          <div>
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-32" />
            </div>

            <div className="flex flex-col gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <Separator className="border-[#E6D5C1]" />

          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>

          <Separator className="border-[#E6D5C1]" />

          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start">
                  <Skeleton className="h-6 w-6 rounded-full mr-3" />
                  <Skeleton className="h-6 w-full" />
                </div>
              ))}
            </div>
          </div>
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

