
import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="glass-effect border-t border-white/20 py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Company Info */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">GL</span>
              </div>
              <span className="font-bold text-2xl text-white">Green Living</span>
            </div>
            <p className="text-white/80 text-sm max-w-sm leading-relaxed">
              Cùng nhau xây dựng một lối sống xanh, bền vững cho tương lai của hành tinh.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-white text-lg mb-4">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📞</span>
                </div>
                <span className="text-white/90 font-medium">0123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xl">✉️</span>
                </div>
                <span className="text-white/90 font-medium">hello@greenliving.vn</span>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-white text-lg mb-4">Theo dõi chúng tôi</h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com/greenliving"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover-lift"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/greenliving"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover-lift"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com/@greenliving"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover-lift"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/70 text-sm">
            © 2024 Green Living. Tất cả quyền được bảo lưu. Thiết kế với 💚 cho môi trường.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
