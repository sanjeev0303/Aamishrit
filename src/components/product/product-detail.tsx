"use client"

import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import type { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Separator } from "../ui/separator"
import { useAppDispatch, useAppSelector } from "@/store/store"
import { getProductsById } from "@/api/products"
import { addToCart } from "@/store/slices/cartSlice"
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice"
import { formatPrice } from "@/lib/utils"

interface ProductDetailProps {
  id: string
}

export default function ProductDetail({ id }: ProductDetailProps) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showAllThumbnails, setShowAllThumbnails] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const isInWishlist = useAppSelector((state) => state.wishlist.items)

  const nextImage = () => {
    if (!product?.images?.length) return
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    if (!product?.images?.length) return
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const {data, isLoading} = useQuery({
    queryKey: ["productId"],
    queryFn: () => getProductsById(id)
  })


  const unitMap: Record<string, string> = {
    "Jaggery": "/kg",
    "Herbal Tea": "/30g",
    "Cookies": "/200g",
  };


  useEffect(() => {
    async function loadProduct() {
      try {
        const productData = await data
        if (productData) {
          setProduct(productData)
          setIsWishlisted(isInWishlist.some((item) => item.ID === product?.ID))
        } else {
          toast.error("Product not found")
          router.push("/products")
        }
      } catch (error) {
        console.error('Error loading product:', error)
        toast.error("Failed to load product. Please try again later.")
      }
    }

    loadProduct()
  }, [id, router, isInWishlist, data])

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
          <div className="h-32 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-10 bg-gray-200 animate-pulse rounded w-full"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="mt-2 text-gray-600">The product you are looking for does not exist or has been removed.</p>
        <Button className="mt-6" onClick={() => router.push("/products")}>
          Back to Products
        </Button>
      </div>
    )
  }

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        // quantity,
      }),
    )
    toast.success(`${product.name} added to cart`)
  }

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(String(product.ID)))
      toast.success(`${product.name} removed from wishlist`)
    } else {
      addToWishlist(product)
      toast.success(`${product.name} added to wishlist`)
    }
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="min-h-screen bg-[#FDF7F0]">
        {/* Main Content */}
      <main className="container mx-auto px-4 py-8">

      <div className="mb-6 flex items-center">
          <Link href="/" className="flex items-center text-[#8B5A2B] hover:text-[#6B4226] transition-colors">
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Product Details - Main Section with 70/30 split */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Images - 70% width section */}
      <div className="lg:w-[70%] space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-[#D4B08C] h-[400px] md:h-[600px] bg-white">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-[#6B4226]" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-[#6B4226]" />
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images?.slice(0, showAllThumbnails ? product.images.length : 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-[#8B5A2B]" : "border-[#D4B08C]"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className="object-cover w-24 h-24"
                  />
                </button>
              ))}
              {(product.images?.length ?? 0) > 4 && !showAllThumbnails && (
                <button
                  onClick={() => setShowAllThumbnails(true)}
                  className="flex-shrink-0 rounded-md overflow-hidden border-2 border-[#D4B08C] w-24 h-24 flex items-center justify-center bg-[#F0E6D9]"
                  aria-label="Show all thumbnails"
                >
                  <Plus className="h-6 w-6 text-[#8B5A2B]" />
                </button>
              )}
            </div>
      </div>

      {/* Product Info - 30% width section with scrollable content */}
      <div className="lg:w-[30%] space-y-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#D4B08C] scrollbar-track-[#F0E6D9]">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#6B4226]">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.reviews[0].rating)
                          ? "fill-[#8B5A2B] text-[#8B5A2B]"
                          : i < product.reviews[0].rating
                            ? "fill-[#8B5A2B] text-[#8B5A2B] opacity-50"
                            : "text-[#D4B08C]"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[#8B5A2B]">
                  {product.reviews[0].rating} ({product.reviews[0].rating} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#6B4226]">{formatPrice(product?.price)} {unitMap[product?.Category[0]?.name] || ""}</span>
              {/* {product.originalPrice && (
                <span className="text-lg text-[#8B5A2B] line-through">{product.originalPrice}</span>
              )} */}
            </div>

            <div>
              <p className="text-[#8B5A2B]">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className={`font-medium ${product.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </div>

            <Separator className="border-[#E6D5C1]" />

            <div>
            <div className="space-y-4">
          <div className="flex items-center">
            <span className="mr-4 font-medium">Quantity:</span>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-r-none"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="h-8 w-12 flex items-center justify-center border-y border-x-0 border-input">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-l-none"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="ml-4 text-sm text-gray-500">{product.stock} available</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={isWishlisted ? "text-red-500" : ""}
              onClick={handleToggleWishlist}
            >
              <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
              {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </div>
            </div>

            <Separator className="border-[#E6D5C1]" />

            <div>
              <h3 className="font-medium text-[#6B4226] mb-2">Product Details:</h3>
              <ul className="grid grid-cols-1 gap-2 text-[#8B5A2B]">
                <li>
                  {/* <span className="font-medium">Weight:</span> {product.weight} */}
                </li>
              </ul>
            </div>

            <Separator className="border-[#E6D5C1]" />

            <div>
              <h3 className="font-medium text-[#6B4226] mb-2">Features:</h3>
              <ul className="space-y-2">
                {/* {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#8B5A2B] flex items-center justify-center text-white mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-[#8B5A2B]">{feature}</span>
                  </li>
                ))} */}
              </ul>
            </div>
          </div>
      </div>

      {/* Related Products */}
      {/* <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#6B4226] mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link href={`/product/${relatedProduct.id}`} key={relatedProduct.id} className="block">
                <Card className="border-[#D4B08C] bg-[#FDF7F0] h-full hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative h-[200px]">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-[#6B4226] hover:underline line-clamp-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-[#8B5A2B] mt-1 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(relatedProduct.rating) ? "fill-[#8B5A2B] text-[#8B5A2B]" : "text-[#D4B08C]"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[#8B5A2B] ml-1">({relatedProduct.reviewCount})</span>
                    </div>
                    <div className="font-bold text-[#6B4226] mt-2">{relatedProduct.price}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div> */}

        {/* Reviews Section */}
        {/* <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#6B4226] mb-6">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card className="border-[#D4B08C] bg-[#FDF7F0]">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-5xl font-bold text-[#6B4226] mb-2">{product.rating}</div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-[#8B5A2B] text-[#8B5A2B]"
                              : i < product.rating
                                ? "fill-[#8B5A2B] text-[#8B5A2B] opacity-50"
                                : "text-[#D4B08C]"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[#8B5A2B] mb-6">Based on {product.reviewCount} reviews</p>

                    <form onSubmit={handleSubmitReview} className="w-full">
                      <h3 className="font-medium text-[#6B4226] mb-4">Write a Review</h3>
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setReviewRating(i + 1)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-8 w-8 ${
                                i < reviewRating ? "fill-[#8B5A2B] text-[#8B5A2B]" : "text-[#D4B08C]"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <Textarea
                        placeholder="Share your experience with this product..."
                        className="mb-4 border-[#D4B08C] bg-white"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                      />
                      <Button type="submit" className="w-full bg-[#8B5A2B] hover:bg-[#6B4226] text-white">
                        Submit Review
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="border-[#D4B08C] bg-[#FDF7F0]">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3 border border-[#D4B08C]">
                            <AvatarImage src={review.avatar} alt={review.user} />
                            <AvatarFallback className="bg-[#8B5A2B] text-white">{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-[#6B4226]">{review.user}</div>
                            <div className="text-sm text-[#8B5A2B]">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-[#8B5A2B] text-[#8B5A2B]" : "text-[#D4B08C]"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <h4 className="font-medium text-[#6B4226] mb-2">{review.title}</h4>
                      <p className="text-[#8B5A2B]">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}

                {reviews.length > 3 && (
                  <div className="flex justify-center mt-6">
                    <Button variant="outline" className="border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#F0E6D9]">
                      Load More Reviews
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  )
}
