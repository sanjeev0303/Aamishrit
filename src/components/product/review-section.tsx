"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import type { Review } from "@/types"
import { Star } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ReviewSectionProps {
  productId: string
  productRating: number
  reviewCount: number
  reviews?: Review[]
  isLoading?: boolean
}

export default function ReviewSection({
//   productId,
  productRating,
  reviewCount,
  reviews,
  isLoading,
}: ReviewSectionProps) {
  const [reviewText, setReviewText] = useState("")
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [showAllReviews, setShowAllReviews] = useState(false)

//   const queryClient = useQueryClient()

//   const submitReviewMutation = useMutation({
//     mutationFn: submitProductReview,
//     onSuccess: () => {
//       // Invalidate and refetch reviews
//       queryClient.invalidateQueries({ queryKey: ["productReviews", productId] })

//       // Reset form
//       setReviewText("")
//       setReviewTitle("")
//       setReviewRating(5)

//       // Show success message
//       toast.success("Review Submitted", {
//         description: "Thank you for your feedback! Your review will be published after moderation.",
//       })
//     },
//     onError: (error) => {
//       toast.error("Failed to Submit Review", {
//         description: error instanceof Error ? error.message : "Please try again later.",
//       })
//     },
//   })

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!reviewTitle.trim()) {
      toast.error("Review Title Required", {
        description: "Please provide a title for your review.",
      })
      return
    }

    if (reviewText.trim().length === 0) {
      toast.error("Review Cannot Be Empty", {
        description: "Please write your review before submitting.",
      })
      return
    }

    // submitReviewMutation.mutate({
    //   productId,
    //   review: {
    //     title: reviewTitle,
    //     comment: reviewText,
    //     rating: reviewRating,
    //   },
    // })
  }

  if (isLoading) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Skeleton className="h-16 w-16 mb-2" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-40 mb-6" />
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-24 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <Skeleton className="h-10 w-10 rounded-full mr-3" />
                        <div>
                          <Skeleton className="h-5 w-32 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="text-5xl font-bold mb-2">{productRating.toFixed(1)}</div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(productRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : i < productRating
                              ? "fill-yellow-400 text-yellow-400 opacity-50"
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500 mb-6">Based on {reviewCount} reviews</p>

                  <form onSubmit={handleSubmitReview} className="w-full">
                    <h3 className="font-medium mb-4">Write a Review</h3>
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
                              i < reviewRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Review title"
                      className="w-full p-2 mb-2 border rounded-md"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="Share your experience with this product..."
                      className="mb-4"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={4}
                    />
                    {/* <Button type="submit" className="w-full" disabled={submitReviewMutation.isPending}>
                      {submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}
                    </Button> */}
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500 text-lg">No reviews yet. Be the first to share your thoughts!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3)

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="text-5xl font-bold mb-2">{productRating.toFixed(1)}</div>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(productRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : i < productRating
                            ? "fill-yellow-400 text-yellow-400 opacity-50"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-500 mb-6">Based on {reviewCount} reviews</p>

                <form onSubmit={handleSubmitReview} className="w-full">
                  <h3 className="font-medium mb-4">Write a Review</h3>
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
                            i < reviewRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Review title"
                    className="w-full p-2 mb-2 border rounded-md"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                  />
                  <Textarea
                    placeholder="Share your experience with this product..."
                    className="mb-4"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                  />
                  {/* <Button type="submit" className="w-full" disabled={submitReviewMutation.isPending}>
                    {submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}
                  </Button> */}
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-6">
            {displayedReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      {/* <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={review.} alt={review.user} />
                        <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                      </Avatar> */}
                      <div>
                        <div className="font-medium">{review.user_id}</div>
                        <div className="text-sm text-gray-500">{review.created_at}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-medium mb-2">{review.comment}</h4>
                  <p className="text-gray-600">{review.comment}</p>
                </CardContent>
              </Card>
            ))}

            {reviews.length > 3 && (
              <div className="flex justify-center mt-6">
                <Button variant="outline" onClick={() => setShowAllReviews(!showAllReviews)}>
                  {showAllReviews ? "Show Less" : "Load More Reviews"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
