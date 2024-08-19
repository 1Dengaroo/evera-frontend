import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Links Section */}
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <a href="/" className="text-sm text-gray-600 hover:text-black mx-2">
              Home
            </a>
            <a
              href="/shop"
              className="text-sm text-gray-600 hover:text-black mx-2"
            >
              Shop
            </a>
            <a
              href="/contact"
              className="text-sm text-gray-600 hover:text-black mx-2"
            >
              Contact
            </a>
            <a
              href="/about"
              className="text-sm text-gray-600 hover:text-black mx-2"
            >
              About Us
            </a>
          </div>

          {/* Social Media Icons Section */}
          <div className="flex items-center mb-4 md:mb-0">
            <a
              href="https://facebook.com"
              className="text-gray-600 hover:text-black mx-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-600 hover:text-black mx-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-600 hover:text-black mx-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-4 text-center text-sm text-gray-500">
          © 2024 Evera. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
