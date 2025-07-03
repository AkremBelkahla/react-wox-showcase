import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const menuItems = [
  { label: 'HOME', href: '#home', image: 'https://picsum.photos/900/1600?random=60' },
  { label: 'Presentation', href: '#presentation', image: 'https://picsum.photos/900/1600?random=61' },
  { label: 'SERVICES', href: '#services', image: 'https://picsum.photos/900/1600?random=62' },
  { label: 'PROCESS', href: '#process', image: 'https://picsum.photos/900/1600?random=63' },
  { label: 'REGISTRATION 1', href: '#registration1', image: 'https://picsum.photos/900/1600?random=64' },
  { label: 'REGISTRATION 2', href: '#registration2', image: 'https://picsum.photos/900/1600?random=65' },
  { label: 'PORTFOLIO', href: '#portfolio', image: 'https://picsum.photos/900/1600?random=66' },
  { label: 'ACTIVITIES', href: '#activities', image: 'https://picsum.photos/900/1600?random=67' },
  { label: 'CONTACT', href: '#contact', image: 'https://picsum.photos/900/1600?random=68' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(menuItems[0].image);
  const isMobileOrTablet = useMediaQuery('(max-width: 1024px)');

  const handleClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-4 md:top-8 left-4 md:left-8 z-50">
        <img 
          src="https://www.11-76.com/themes/wox/img/logo-light.png" 
          alt="Logo" 
          className={`mix-blend-difference ${isMobileOrTablet ? 'h-6' : 'h-12'}`}
        />
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 md:top-8 right-4 md:right-8 z-50 text-white mix-blend-difference"
      >
        <Menu className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black z-50 grid grid-cols-1 md:grid-cols-2">
          <div className="relative overflow-hidden hidden md:block">
            <img 
              src={activeImage}
              alt="Menu background"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <div className="relative flex items-center justify-center bg-white">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 md:top-8 right-4 md:right-8 text-black hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            
            <nav className="text-center">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(item.href)}
                  onMouseEnter={() => setActiveImage(item.image)}
                  className="block text-black text-2xl md:text-4xl mb-6 md:mb-8 hover:text-gray-600 transition-colors font-light uppercase tracking-widest w-full"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}