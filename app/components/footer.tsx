import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 mt-0">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-1">
            <h3 className="font-bold text-2xl mb-4">SHOP.CO</h3>
            <p className="text-gray-600 text-sm mb-4">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-xl">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-xl">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-xl">in</span>
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <span className="text-xl">⚫</span>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider">COMPANY</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-black">About</a></li>
              <li><a href="#" className="hover:text-black">Features</a></li>
              <li><a href="#" className="hover:text-black">Works</a></li>
              <li><a href="#" className="hover:text-black">Career</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider">HELP</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-black">Customer Support</a></li>
              <li><a href="#" className="hover:text-black">Delivery Details</a></li>
              <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider">FAQ</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-black">Account</a></li>
              <li><a href="#" className="hover:text-black">Manage Deliveries</a></li>
              <li><a href="#" className="hover:text-black">Orders</a></li>
              <li><a href="#" className="hover:text-black">Payments</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm tracking-wider">RESOURCES</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-black">Free eBooks</a></li>
              <li><a href="#" className="hover:text-black">Development Tutorial</a></li>
              <li><a href="#" className="hover:text-black">How to - Blog</a></li>
              <li><a href="#" className="hover:text-black">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="flex gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png" alt="PayPal" className="h-8 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-8 object-contain" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-8 object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;