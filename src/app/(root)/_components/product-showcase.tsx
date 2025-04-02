import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Chamomile Herbal Tea",
    category: "herbal-tea",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1741718234361-ebb40aac7533?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 2,
    name: "Organic Palm Jaggery",
    category: "jaggery",
    price: 8.49,
    image: "https://images.unsplash.com/photo-1741620979760-bccef3bb5b17?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 3,
    name: "Millet Chocolate Cookies",
    category: "cookies",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1741800459656-4116dcb230ae?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 4,
    name: "Lavender Sleep Tea",
    category: "herbal-tea",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1741851373559-6879db14fd8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 5,
    name: "Coconut Jaggery Blocks",
    category: "jaggery",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1742144897663-6c8c6faaf1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 6,
    name: "Oatmeal Raisin Cookies",
    category: "cookies",
    price: 7.49,
    image: "https://images.unsplash.com/photo-1742330425089-1f91d18eaa4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 7,
    name: "Ginger Turmeric Tea",
    category: "herbal-tea",
    price: 13.49,
    image: "https://images.unsplash.com/photo-1742770711842-c29e32ee01d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 8,
    name: "Date Palm Jaggery Powder",
    category: "jaggery",
    price: 10.99,
    image: "https://plus.unsplash.com/premium_photo-1743089372149-e6f465618eab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    isBestseller: false,
  },
]

const ProductShowcase = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="section-title text-brown-heading">Featured Products</h2>
        <p className="text-center text-brown-text/80 max-w-2xl mx-auto mb-12">
          Discover our most popular organic products, handcrafted with premium ingredients for your health and
          enjoyment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:grid-cols-4 lg:gap-12">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="relative overflow-hidden h-64 ">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                  {product.isNew && <Badge className="bg-luxury-medium text-white">New</Badge>}
                  {product.isBestseller && <Badge className="bg-luxury-dark text-white">Bestseller</Badge>}
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-luxury-text/60 uppercase mb-1">
                  {product.category.split("-").join(" ")}
                </div>
                <h3 className="text-lg font-semibold text-luxury-text mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-luxury-dark">${product.price.toFixed(2)}</span>
                  <Button variant="outline" className="border-luxury-medium text-luxury-dark hover:bg-luxury-light">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
