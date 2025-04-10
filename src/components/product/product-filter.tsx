"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get initial filter values from URL
  const initialCategories = searchParams.get("categories")?.split(",") || []
//   const initialBrands = searchParams.get("brands")?.split(",") || []
//   const initialPriceRange = [
//     Number.parseInt(searchParams.get("minPrice") || "0"),
//     Number.parseInt(searchParams.get("maxPrice") || "1000"),
//   ]

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories)

  // Sample filter options
  const categories = [
    { id: "jaggery", name: "Jaggery" },
    { id: "herbal-tea", name: "Herbal Tea" },
    { id: "millet-cookies", name: "millet-cookies" },
  ]

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","))
    }

    router.push(`/products?${params.toString()}`)
  }

  const resetFilters = () => {
    setSelectedCategories([])
    router.push("/products")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-brown-heading">Filters</h2>
        <Button variant="ghost" size="sm" className="text-brown-heading/80" onClick={resetFilters}>
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "brands", "price"]}>
        <AccordionItem value="categories">
          <AccordionTrigger className="text-brown-heading">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none text-brown-text peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={selectedBrands.includes(brand.id)}
                    onCheckedChange={() => handleBrandChange(brand.id)}
                  />
                  <label
                    htmlFor={`brand-${brand.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={priceRange} max={1000} step={10} onValueChange={handlePriceChange} />
              <div className="flex items-center justify-between">
                <span className="text-sm">${priceRange[0]}</span>
                <span className="text-sm">${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem> */}
      </Accordion>

      <Button className="w-full bg-brown-heading text-brown-light-text hover:bg-brown-heading/90" onClick={applyFilters}>
        Apply Filters
      </Button>
    </div>
  )
}
