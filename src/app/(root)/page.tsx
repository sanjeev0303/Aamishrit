"use client";

import Footer from "@/components/global/footer";
import AboutSection from "./_components/about";
import HeroImage from "./_components/hero-image";
import ProductShowcase from "./_components/product-showcase";
import ShopSection from "./_components/shop";



const AdminPage = () => {

  return (
    <div className="flex flex-col items-center w-full">
        <HeroImage />
        <ShopSection />
        <ProductShowcase />
        <AboutSection />
        <Footer />
    </div>
  );
};

export default AdminPage;
