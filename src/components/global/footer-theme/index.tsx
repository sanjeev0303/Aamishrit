import React from 'react'

const FooterTheme = () => {
  return (
    <footer className="bg-[#6B4226] text-[#FDF7F0] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">Jaggery Luxe</h3>
              <p className="text-[#E6D5C1]">Premium jaggery products for the discerning customer.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#E6D5C1] hover:text-white">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#E6D5C1] hover:text-white">
                    Track Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#E6D5C1] hover:text-white">
                    Help & Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact Us</h4>
              <address className="text-[#E6D5C1] not-italic">
                Email: support@jaggeryluxe.com
                <br />
                Phone: +1 (555) 123-4567
              </address>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-[#8B5A2B] text-center text-[#E6D5C1]">
            <p>&copy; {new Date().getFullYear()} Jaggery Luxe. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}

export default FooterTheme
