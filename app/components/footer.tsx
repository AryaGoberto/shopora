import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-0">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-1">
            <h3 className="font-bold text-2xl mb-4">Shopora</h3>
            <p className="text-gray-600 text-sm mb-4">
              We have clothes that suits your style and which you&apos;re proud
              to wear. From women to men.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Twitter size={20} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Facebook size={20} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Linkedin size={20} className="text-gray-700" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Instagram size={20} className="text-gray-700" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider">COMPANY</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:text-black">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Career
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider">HELP</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:text-black">
                  Customer Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Delivery Details
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider">FAQ</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:text-black">
                  Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Manage Deliveries
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Payments
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider">RESOURCES</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:text-black">
                  Free eBooks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Development Tutorial
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  How to - Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Youtube Playlist
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            Shopora © 2000-2023, All Rights Reserved
          </p>
          <div className="flex gap-3">{/* img */}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
