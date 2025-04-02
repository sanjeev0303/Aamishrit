"use client"



import ProductCard from "@/components/global/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cva } from "class-variance-authority";
import { useSearchParams } from "next/navigation";
import { useState } from "react";


const imageLink = "https://images.unsplash.com/photo-1549982305-cb0411f8d27f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const Products = () => {
//   const searchQuery = useSearchParams();

//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState("");
//   const [maxPrice, setMaxPrice] = useState(100000);
//   const [category, setCategory] = useState(searchQuery.get("category") || "");
  const [page, setPage] = useState(1);


  const isPrevPage = page > 1;
  const isNextPage = page < 4;


  const headings = cva("text-2xl lg:text-3xl uppercase text-brown-text font-medium")

  const addToCartHandler = () => {
    console.log("adding in cart");

  }

  return (
    <div className=" w-full flex space-x-8 select-none ">

      <main className="lg:pt-6 lg:pl-6 pt-2">
        <h1 className={headings()}>Products</h1>

        <div className="px-5 grid lg:grid-cols-4 lg:gap-5 sm:grid-cols-1 md:grid-cols-3 md:gap-5 pt-4 lg:pt-8">
        <ProductCard productId="1" name="camera" photo={imageLink} price={20} stock={10} handler={addToCartHandler} />
        </div>
        <article className="select-none flex space-x-3 flex-row items-center justify-center mt-5 py-3">
            <Button size={"sm"} disabled={!isPrevPage} onClick={() => setPage(prev => prev - 1)} className="text-[#FDF7F0] bg-[#6B4226]">Prev</Button>
            <span className="select-none text-brown-heading font-medium">{page} of {4}</span>
            <Button size={"sm"} disabled={!isNextPage} onClick={() => setPage(prev => prev + 1)} className="text-[#FDF7F0] bg-[#6B4226]">Next</Button>
        </article>
      </main>
    </div>
  );
};

export default Products;
