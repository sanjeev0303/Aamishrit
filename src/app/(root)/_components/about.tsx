import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const aboutItems = [
  {
    id: "herbal-tea",
    title: "Herbal Tea",
    description:
      "Our herbal teas are carefully crafted blends of premium herbs, flowers, and spices, sourced from organic farms around the world. Each blend is designed to provide specific wellness benefits, from calming relaxation to immune support. We ensure that all our teas are free from artificial flavors and preservatives, offering you a pure and natural experience with every sip.",
    image:
      "https://images.unsplash.com/photo-1591189863381-eb96afe5b841?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "jaggery",
    title: "Jaggery",
    description:
      "Our jaggery is a natural sweetener made from concentrated sugarcane juice, without the use of chemicals in processing. Rich in minerals like iron, magnesium, and potassium, it's a healthier alternative to refined sugar. We source our jaggery from sustainable farms that use traditional methods to preserve its nutritional value and distinctive caramel-like flavor that enhances any dish or beverage.",
    image:
      "https://img.freepik.com/free-photo/healthy-jaggery-still-life-arrangement_23-2149161545.jpg?t=st=1743764792~exp=1743768392~hmac=0bf22047bf273ec61c643ea1638e476ca6481973e6341f050a26db474de70bb0&w=1380",
  },
  {
    id: "cookies",
    title: "Cookies",
    description:
      "Our artisanal cookies are baked with love using organic, whole-food ingredients. We prioritize nutrition without compromising on taste, using ancient grains like millet and natural sweeteners like our own jaggery. Each cookie is crafted in small batches to ensure quality and freshness, offering you a guilt-free indulgence that's perfect for any time of day.",
    image:
      "https://images.unsplash.com/photo-1530751127259-074b0cdc0469?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  //   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  //   const y = useTransform(scrollYProgress, [1, 0.2, 0.8, 1], [100, 0, 0, 100]);

  return (
    <section ref={sectionRef} className="py-16 px-4 md:px-8 bg-brown-text/90 text-brown-background w-full">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">About Our Products</h2>
          <p className="text-center text-luxury-text/80 max-w-2xl mx-auto mb-12">
            Learn more about our commitment to quality, sustainability, and the
            unique benefits of our organic products.
          </p>
        </motion.div>

        <div className="space-y-16">
          {aboutItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center`}
            >
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                //   viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative h-64 md:h-96 rounded-lg overflow-hidden"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
              <div className="w-full md:w-1/2">
                <motion.h3
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                //   viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-2xl md:text-3xl font-bold text-luxury-darkest mb-6"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                //   viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-luxury-text/80 mb-6 leading-relaxed"
                >
                  {item.description}
                </motion.p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
