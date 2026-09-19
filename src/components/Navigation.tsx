import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { natureImage } from '../utils/natureImage';

const menuItems = [
  { label: 'HOME', href: '#home', image: natureImage(900, 1600, 1) },
  { label: 'Presentation', href: '#presentation', image: natureImage(900, 1600, 2) },
  { label: 'SERVICES', href: '#services', image: natureImage(900, 1600, 3) },
  { label: 'PROCESS', href: '#process', image: natureImage(900, 1600, 4) },
  { label: 'REGISTRATION 1', href: '#registration1', image: natureImage(900, 1600, 5) },
  { label: 'REGISTRATION 2', href: '#registration2', image: natureImage(900, 1600, 6) },
  { label: 'PORTFOLIO', href: '#portfolio', image: natureImage(900, 1600, 7) },
  { label: 'ACTIVITIES', href: '#activities', image: natureImage(900, 1600, 8) },
  { label: 'CONTACT', href: '#contact', image: natureImage(900, 1600, 9) },
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