"use client"

import { Button } from '@/components/ui/button'
import { getAllProducts } from '@/https/api'
import { Product } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Page = ({ params }: { params: { slug: string } }) => {
    const { slug } = params
    const [page, setPage] = useState(1);

      const isPrevPage = page > 1;
      const isNextPage = page < 4;

      const headings = cva(
        "text-2xl lg:text-3xl uppercase text-brown-text font-medium"
      );

      const addToCartHandler = () => {
        console.log("adding in cart");
      };

    const { data: products, isLoading } = useQuery({
        queryKey: ['products',  slug],
        queryFn: () => getAllProducts(),
        staleTime: 10 * 1000,
    })

    if (isLoading) return <div className="w-full h-[80vh] flex items-center justify-center">
    <Loader2 className="animate-spin" />
  </div>

    const filteredProducts = products?.filter(
        (product: any) => product.category === slug
    )

    console.log("filteredProducts: ", filteredProducts);


    return (
        <div className="w-full flex space-x-8 select-none">
      <main className="lg:pt-6 lg:pl-6 pt-2 w-full">
        <h1 className={headings()}>{`Products by category: ${slug}`}</h1>

        <div className="px-5">
          {isLoading ? (
            <div className="w-full h-[80vh] flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <>
              {Array.isArray(filteredProducts) ? (
                <div className="grid lg:grid-cols-4 lg:gap-5 sm:grid-cols-1 md:grid-cols-3 md:gap-5 pt-4 lg:pt-8">
                {
                    filteredProducts?.map((product: Product) => (
                        <div key={product.id} className="flex flex-col mx-auto">
                          <Link href={`/products/${product.id}`}>
                            <div className="h-[22rem] rounded-lg overflow-hidden">
                              <Image
                                src={product.images[0] || "/placeholder.svg?height=500&width=500"}
                                alt={product.name}
                                width={1500}
                                height={500}
                                className="object-cover h-full rounded-lg"
                              />
                            </div>
                          </Link>
                          <div className="flex flex-col px-2">
                            <div className="text-brown-text font-medium text-lg">{product.name}</div>
                            <div className="text-brown-heading font-medium text-[1.1rem]">₹ {product.price}.00</div>
                          </div>
                        </div>
                      )
                    )
                }
                </div>
              ) : (
                <div className="col-span-full text-center">No products found</div>
              )
            }
              {(!products || products.length === 0) && (
                <div className="col-span-full text-center">No products found</div>
              )}
            </>
          )}
        </div>

        <article className="select-none flex space-x-3 flex-row items-center justify-center mt-5 py-3">
          <Button
            size={"sm"}
            disabled={!isPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
            className="text-[#FDF7F0] bg-[#6B4226]"
          >
            Prev
          </Button>
          <span className="select-none text-brown-heading font-medium">
            {page} of {4}
          </span>
          <Button
            size={"sm"}
            disabled={!isNextPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="text-[#FDF7F0] bg-[#6B4226]"
          >
            Next
          </Button>
        </article>
      </main>
    </div>
    )
}

export default Page
