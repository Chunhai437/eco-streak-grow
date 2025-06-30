
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-50 border-t border-green-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Company Info */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 gradient-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">GL</span>
            </div>
            <span className="font-bold text-xl text-green-800">Green Living</span>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-end mb-4 md:mb-0">
            <p className="text-green-700 mb-2">Liên hệ với chúng tôi</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📞</span>
              <span className="text-green-800 font-medium">0123 456 789</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <p className="text-green-700 mr-2">Theo dõi chúng tôi:</p>
            <a
              href="https://facebook.com/greenliving"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-800 hover:text-blue-600 transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://instagram.com/greenliving"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-800 hover:text-pink-600 transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://tiktok.com/@greenliving"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-800 hover:text-gray-600 transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-200 mt-6 pt-4 text-center">
          <p className="text-green-600 text-sm">
            © 2024 Green Living. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
