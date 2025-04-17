"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    id: "jaggery",
    name: "Jaggery",
    description: "Natural sweeteners with rich nutrients",
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867131/Aamishrit%20Products/pk438cgnfbhfudf2xznt.jpg",
    link: "/category/jaggery",
  },
  {
    id: "herbal-tea",
    name: "Herbal Tea",
    description: "Soothing blends for wellness and relaxation",
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867159/Aamishrit%20Products/qpxqfxejqb3gtpcmok5u.jpg",
    link: "/category/herbal-tea",
  },
  {
    id: "cookies",
    name: "Cookies",
    description: "Artisanal treats made with organic ingredients",
    image:
      "https://res.cloudinary.com/df0nvtma5/image/upload/v1744867132/Aamishrit%20Products/scno9q4ojlggniqgmxyh.jpg",
    link: "/category/cookies",
  },
];

const ShopSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 px-4 md:px-8 ">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title text-brown-heading">Shop by Category</h2>
          <p className="text-center text-brown-text/80 max-w-2xl mx-auto mb-12">
            Explore our carefully curated collection of premium organic
            products, each crafted with attention to quality and sustainability.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="product-card flex flex-col"
            >
              <div className="relative overflow-hidden h-80">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow bg-brown-300/50">
                <h3 className="text-2xl font-semibold text-brown-800/90 mb-2">
                  {category.name}
                </h3>
                <p className="text-brown-700/80 mb-4 flex-grow">
                  {category.description}
                </p>
                <Link href={category.link}>
                  <Button className="w-full bg-brown-heading hover:text-brown-background text-brown-light-text hover:bg-brown-heading/80 transition duration-300 ease-in-out">
                    Browse {category.name}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ShopSection;
