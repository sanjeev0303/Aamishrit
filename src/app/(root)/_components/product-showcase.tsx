"use client"

import ProductCategoryShowcase from "./product-category-showcase"

// Sample product data for demonstration
const sampleProducts = [
  {
    id: 1,
    name: "Red Tea",
    category: "herbal-tea",
    description: "A soothing blend of premium herbs for relaxation",
    price: 12.99,
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867159/Aamishrit%20Products/u2uzwiddo35yoeozqqsi.jpg",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 2,
    name: "Blue Tea",
    category: "herbal-tea",
    description: "Antioxidant-rich tea with butterfly pea flower",
    price: 14.99,
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867162/Aamishrit%20Products/wvsfzmbsmkpmur2bpftp.jpg",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 3,
    name: "Aamishrit Red Tea",
    category: "herbal-tea",
    description: "Our signature blend with rare Himalayan herbs",
    price: 13.49,
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867155/Aamishrit%20Products/k4w7by9cyzf8f54ctzuy.jpg",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 4,
    name: "Jaggery Cubes",
    category: "jaggery",
    description: "Convenient cubes of pure, unrefined sweetness",
    price: 8.49,
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867164/Aamishrit%20Products/bwcmvsflossebovalzi9.jpg",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 5,
    name: "Jaggery Powder",
    category: "jaggery",
    description: "Fine powder for easy mixing in recipes",
    price: 9.99,
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867153/Aamishrit%20Products/pwgzyohqkh9kxomybmxn.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 6,
    name: "Organic Jaggery",
    category: "jaggery",
    description: "Traditional blocks of organic sugarcane jaggery",
    price: 10.99,
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867135/Aamishrit%20Products/gpbvr15alzc8pafdzxiv.jpg",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 7,
    name: "Millet Cookies",
    category: "cookies",
    description: "Nutritious cookies made with ancient grains",
    price: 6.99,
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867164/Aamishrit%20Products/apbrsckvticigvgz2e6c.jpg",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 8,
    name: "Hemp Cookies",
    category: "cookies",
    description: "Protein-rich cookies with organic hemp seeds",
    price: 7.49,
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867142/Aamishrit%20Products/ynajmcqaeiu2gcuddtvt.jpg",
    isNew: true,
    isBestseller: false,
  },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-brown-50">
      <ProductCategoryShowcase products={sampleProducts} />
    </div>
  )
}
