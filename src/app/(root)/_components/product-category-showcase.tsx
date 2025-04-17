"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ChevronRight } from "lucide-react";
import Link from "next/link";

// Product interface based on the provided types
interface Product {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

// Props interface for the component
interface ProductCategoryShowcaseProps {
  products?: Product[];
  isLoading?: boolean;
}

const ProductCategoryShowcase = ({
  products: initialProducts,
  isLoading = false,
}: ProductCategoryShowcaseProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(isLoading);

  // Fetch products if not provided as props
  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
      setLoading(false);
    } else {
      const fetchProducts = async () => {
        try {
          // Replace with your actual API endpoint
          const response = await fetch("/api/products");
          const data = await response.json();
          setProducts(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching products:", error);
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [initialProducts]);

  // Extract unique categories
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = Array.from(
        new Set(products.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    }
  }, [products]);

  // Format price to currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <div className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center text-brown-heading mb-4">
            Our Products
          </h2>
          <p className="text-center text-brown-text/80 max-w-2xl mx-auto mb-12">
            Discover our collection of premium organic products, carefully
            crafted for your health and enjoyment.
          </p>
        </motion.div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-brown-text">
              No product categories available.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => {
              const categoryProducts = products.filter(
                (product) => product.category === category
              );

              if (categoryProducts.length === 0) {
                return null;
              }

              return (
                <div key={category} className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-brown-heading">
                      {formatCategoryName(category)}
                    </h3>
                    <Link
                      href={`/category/${category}`}
                      className="flex items-center text-brown-600 hover:text-brown-800 transition-colors"
                    >
                      <span className="mr-1">View all</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8"
                  >
                    {categoryProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                          {product.isNew && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-brown-600 text-white">
                                New
                              </Badge>
                            </div>
                          )}
                          {product.isBestseller && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-brown-700/80 text-white">
                                Bestseller
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-semibold text-brown-text mb-2 line-clamp-1">
                            {product.name}
                          </h4>
                          {product.description && (
                            <p className="text-sm text-brown-text/70 mb-3 line-clamp-2">
                              {product.description}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-lg font-bold text-brown-700">
                              {formatPrice(product.price)}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-brown-700 bg-brown-300 hover:bg-brown-200 hover:text-brown-800 rounded-full"
                            >
                              <ShoppingCart className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCategoryShowcase;
