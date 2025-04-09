"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingCart, Star, ChevronRight, ChevronLeft, Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export default function ProductDetailPage() {
  // Sample product data
  const product = {
    id: "101",
    name: "Artisanal Jaggery Block",
    description:
      "Our premium Artisanal Jaggery Block is handcrafted using traditional methods that have been passed down through generations. Made from the finest sugarcane, this jaggery block offers a rich, complex flavor profile with notes of caramel, molasses, and a subtle earthiness that mass-produced alternatives simply cannot match.",
    longDescription:
      "Each block is carefully processed to preserve the natural nutrients and minerals found in sugarcane, making it not just a sweetener, but a nutritious alternative to refined sugar. The deep golden-brown color is a testament to its purity and the careful attention given during production.\n\nOur jaggery is sourced from sustainable farms where sugarcane is grown without harmful pesticides, ensuring you get a product that's good for both you and the environment. The traditional slow-cooking process allows the sugarcane juice to develop its characteristic rich flavor, resulting in a jaggery block that adds depth and complexity to any dish it's used in.\n\nUnlike refined sugar, which is stripped of all nutrients during processing, our jaggery retains essential minerals like iron, magnesium, and potassium. It's also rich in antioxidants and has a lower glycemic index compared to regular sugar, making it a healthier choice for those mindful of their sugar intake.\n\nWhether you're using it to sweeten your tea or coffee, as an ingredient in traditional desserts, or as a natural sweetener in your baking, our Artisanal Jaggery Block will elevate your culinary creations with its distinctive flavor and nutritional benefits.",
    price: "$89.99",
    originalPrice: "$99.99",
    stock: 15,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    features: [
      "100% Natural and Unrefined",
      "Rich in Iron and Minerals",
      "No Chemical Additives",
      "Traditional Slow-Cooked Process",
      "Sustainable Farming Practices",
    ],
    weight: "500g",
    dimensions: "10cm x 10cm x 5cm",
    origin: "Western Ghats, India",
    colors: ["Golden Brown", "Dark Amber", "Honey Gold"],
  }

  // Related products
  const relatedProducts = [
    {
      id: "102",
      name: "Organic Jaggery Powder",
      description: "Finely ground organic jaggery powder for easy use in cooking and baking.",
      price: "$59.99",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviewCount: 78,
    },
    {
      id: "103",
      name: "Premium Jaggery Gift Box",
      description: "Assorted jaggery varieties presented in an elegant gift box.",
      price: "$129.99",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviewCount: 42,
    },
    {
      id: "104",
      name: "Jaggery Infused Honey",
      description: "Pure honey naturally infused with artisanal jaggery for a unique sweetness.",
      price: "$79.99",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviewCount: 56,
    },
    {
      id: "105",
      name: "Jaggery Coated Nuts",
      description: "Premium mixed nuts coated with a thin layer of our signature jaggery.",
      price: "$69.99",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviewCount: 38,
    },
  ]

  // Sample reviews
  const reviews = [
    {
      id: 1,
      user: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "March 15, 2024",
      title: "Authentic taste of childhood",
      comment:
        "This jaggery block transported me back to my grandmother's kitchen in rural India. The flavor is rich, complex, and exactly how traditional jaggery should taste. I appreciate that it's made without chemicals and preserves all the natural minerals. Will definitely purchase again!",
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "February 28, 2024",
      title: "Excellent alternative to refined sugar",
      comment:
        "As someone trying to move away from processed sugars, this jaggery has been a wonderful discovery. The caramel notes add depth to my morning tea, and I love using it in baking. Taking off one star only because it's a bit difficult to break into smaller pieces, but the taste more than makes up for it.",
    },
    {
      id: 3,
      user: "Sophia Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "February 10, 2024",
      title: "Worth every penny",
      comment:
        "The quality of this jaggery is exceptional. It dissolves beautifully in hot drinks and adds a complexity that regular sugar simply cannot match. I've started using it in my homemade granola and the results are amazing. The sustainable farming practices are also a huge plus for me.",
    },
  ]

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [showAllThumbnails, setShowAllThumbnails] = useState(false)

  // In a real app, you would check if the product is in the wishlist on component mount
  useEffect(() => {
    // Simulate checking if product is in wishlist
    const checkWishlist = () => {
      // This would be replaced with actual logic to check local storage or API
      const mockWishlistCheck = false
      setIsInWishlist(mockWishlistCheck)
    }

    checkWishlist()
  }, [])

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const toggleWishlist = () => {
    // In a real app, you would add/remove from wishlist via API or local storage
    setIsInWishlist(!isInWishlist)

    toast({
      title: !isInWishlist ? "Added to Wishlist" : "Removed from Wishlist",
      description: !isInWishlist
        ? `${product.name} has been added to your wishlist.`
        : `${product.name} has been removed from your wishlist.`,
    })
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} (${selectedColor}) has been added to your cart.`
    })
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (reviewText.trim().length === 0) {
      toast({
        title: "Review cannot be empty",
        description: "Please write your review before submitting.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback! Your review will be published after moderation.",
    })

    setReviewText("")
    setReviewRating(5)
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
              {product.images.slice(0, showAllThumbnails ? product.images.length : 4).map((image, index) => (
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
              {product.images.length > 4 && !showAllThumbnails && (
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
                        i < Math.floor(product.rating)
                          ? "fill-[#8B5A2B] text-[#8B5A2B]"
                          : i < product.rating
                            ? "fill-[#8B5A2B] text-[#8B5A2B] opacity-50"
                            : "text-[#D4B08C]"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[#8B5A2B]">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[#6B4226]">{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-[#8B5A2B] line-through">{product.originalPrice}</span>
              )}
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
              <h3 className="font-medium text-[#6B4226] mb-3">Color:</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-md border ${
                      selectedColor === color
                        ? "border-[#8B5A2B] bg-[#8B5A2B]/10 text-[#6B4226]"
                        : "border-[#D4B08C] text-[#8B5A2B] hover:border-[#8B5A2B]/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-[#6B4226] font-medium">Quantity:</span>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-8 w-8 rounded-r-none border-[#D4B08C]"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="h-8 px-4 flex items-center justify-center border-y border-[#D4B08C] bg-white">
                    {quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="h-8 w-8 rounded-l-none border-[#D4B08C]"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Button
                  className="bg-[#8B5A2B] hover:bg-[#6B4226] text-white"
                  disabled={product.stock <= 0}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant={isInWishlist ? "default" : "outline"}
                  className={
                    isInWishlist
                      ? "bg-[#6B4226] hover:bg-[#8B5A2B] text-white"
                      : "border-[#8B5A2B] text-[#8B5A2B] hover:bg-[#F0E6D9]"
                  }
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isInWishlist ? "fill-white" : ""}`} />
                  {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>

            <Separator className="border-[#E6D5C1]" />

            <div>
              <h3 className="font-medium text-[#6B4226] mb-2">Product Details:</h3>
              <ul className="grid grid-cols-1 gap-2 text-[#8B5A2B]">
                <li>
                  <span className="font-medium">Weight:</span> {product.weight}
                </li>
                <li>
                  <span className="font-medium">Dimensions:</span> {product.dimensions}
                </li>
                <li>
                  <span className="font-medium">Origin:</span> {product.origin}
                </li>
              </ul>
            </div>

            <Separator className="border-[#E6D5C1]" />

            <div>
              <h3 className="font-medium text-[#6B4226] mb-2">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-[#8B5A2B] flex items-center justify-center text-white mr-3 mt-0.5">
                      ✓
                    </div>
                    <span className="text-[#8B5A2B]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
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
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
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
        </div>
      </main>
    </div>
  )
}
