import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-[#6B4226] text-[#FDF7F0] w-full ">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Image src="/logo.png" alt="logo" width={70} height={50} className="mb-4" />
            <p className="text-[#E6D5C1] text-sm mt-4">
              Premium organic products for a healthier lifestyle. Sustainably sourced and carefully crafted.
            </p>
            <div className="flex space-x-4 mt-6">
              <Link href="#" className="text-[#E6D5C1] hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-[#E6D5C1] hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-[#E6D5C1] hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-[#E6D5C1] hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-[#E6D5C1] hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#E6D5C1] hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#E6D5C1] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/herbal-tea" className="text-[#E6D5C1] hover:text-white transition-colors">
                  Herbal Tea
                </Link>
              </li>
              <li>
                <Link href="/shop/jaggery" className="text-[#E6D5C1] hover:text-white transition-colors">
                  Jaggery
                </Link>
              </li>
              <li>
                <Link href="/shop/cookies" className="text-[#E6D5C1] hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-[#E6D5C1] text-sm mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-luxury-darkest text-[#E6D5C1] border-[#8B5A2B]"
              />
              <Button className="bg-[#8B5A2B] hover:bg-[#E6D5C1] hover:text-[#8B5A2B] text-[#E6D5C1]">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-luxury-medium mt-8 pt-8 text-center text-[#E6D5C1] text-sm">
          <p>© {new Date().getFullYear()} Luxury Organic Products. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
