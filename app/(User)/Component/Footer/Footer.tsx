import { Category } from "../Categotys";

import Link from "next/link";
export default function Footer() {
  return (
    <>
      <footer className="bg-white text-black pt-12 pb-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Men Accessories</h2>
            <p className="text-sm text-gray-600 leading-6">
              Premium men’s wallets, belts, bags & grooming essentials.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-black transition">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition">
                <i className="ri-twitter-x-line text-xl"></i>
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition">
                  Wallets
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Bags
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Belts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Grooming Kits
                </a>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📍 Mumbai, India</li>
              <li>📞 +91 98765 43210</li>
              <li>✉ support@menaccessories.com</li>
            </ul>

            {/* NEWSLETTER */}
            <div className="mt-4">
              <p className="text-sm mb-2">Subscribe for updates</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-3 py-2 bg-gray-100 text-black text-sm rounded-l-md outline-none"
                />
                <button className="bg-black text-white hover:bg-gray-800 font-medium px-4 py-2 rounded-r-md text-sm">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-300 mt-10 pt-5 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Men Accessories. All Rights Reserved.
        </div>
      </footer>
    </>
  );
}
