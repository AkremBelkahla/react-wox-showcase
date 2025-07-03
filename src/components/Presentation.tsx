import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSlider } from '../hooks/useSlider';
import { useMediaQuery } from '../hooks/useMediaQuery';

const images = [
  "https://picsum.photos/900/1600",
  "https://picsum.photos/900/1600?random=10",
  "https://picsum.photos/900/1600?random=11",
  "https://picsum.photos/900/1600?random=12"
];

const content = [
  {
    title: "Presentation",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat"
  },
  {
    title: "Our Mission",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse  "
  },
  {
    title: "Our Vision",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archite"
  }
];

export default function Presentation() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isTabletPortrait = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  const prevImage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      setIsTransitioning(false);
    }, 500);
  };

  const nextText = () => {
    if (currentTextIndex < content.length - 1) {
      setCurrentTextIndex(prev => prev + 1);
    }
  };
  
  const prevText = () => {
    if (currentTextIndex > 0) {
      setCurrentTextIndex(prev => prev - 1);
    }
  };

  const imageSlider = useSlider({
    itemsLength: images.length,
    onNext: nextImage,
    onPrev: prevImage,
  });

  const textSlider = useSlider({
    itemsLength: content.length,
    onNext: nextText,
    onPrev: prevText,
  });

  return (
    <section className={`
      h-screen w-full snap-start relative
      ${isTabletPortrait ? 'flex flex-col' : 'grid grid-cols-1 md:grid-cols-2'}
    `}>
      <div className="section-title-vertical left-side"><span>Presentation</span></div>
      
      {/* Première ligne/colonne */}
      <div 
        {...imageSlider.dragProps}
        className={`relative
          ${isTabletPortrait ? 'h-[50vh]' : 'h-[50vh] md:h-screen'}
          overflow-hidden
        `}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            } ${isTransitioning ? 'opacity-0' : ''}`}
          >
            <img 
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              draggable="false"
            />
          </div>
        ))}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          <button onClick={prevImage} className="p-2 text-black pointer-events-auto">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextImage} className="p-2 text-black pointer-events-auto">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Deuxième ligne/colonne */}
      <div 
        {...textSlider.dragProps}
        className={`bg-black relative
          ${isTabletPortrait ? 'h-[50vh]' : 'h-[50vh] md:h-screen'}
          select-none
        `}>
        {content.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 p-8 md:p-16 flex items-center transition-opacity duration-500 ${
              index === currentTextIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-white px-2 select-none">
              <h3 className="text-2xl md:text-3xl mb-4 md:mb-6">{item.title}</h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          <button 
            onClick={prevText} 
            className={`p-2 text-white pointer-events-auto ${currentTextIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentTextIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextText} 
            className={`p-2 text-white pointer-events-auto ${currentTextIndex === content.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentTextIndex === content.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}