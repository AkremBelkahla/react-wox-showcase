import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSlider } from '../hooks/useSlider';

const textContent = [
  {
    title: "Our Services",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    title: "Digital Solutions",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusaest laborum."
  },
  {
    title: "Creative Design",
    text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ett mollit anim id est laborum."
  }
];

const textContent2 = [
  {
    title: "Creative Design",
    text: "Excepteur ficia deserunt mollit anim id est laborum."
  },
  {
    title: "Our Services",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore mtur."
  },
  {
    title: "Digital Solutions",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proiatem accusantium doloremque laudantium."
  },
];

const images = [
  "https://picsum.photos/900/1600",
  "https://picsum.photos/900/1600?random=20",
  "https://picsum.photos/900/1600?random=21"
];

const images2 = [
  "https://picsum.photos/900/1600?random=22",
  "https://picsum.photos/900/1600?random=23",
  "https://picsum.photos/900/1600?random=24"
];

export default function Services() {
  const [currentTextIndex1, setCurrentTextIndex1] = useState(0);
  const [currentTextIndex2, setCurrentTextIndex2] = useState(0);
  const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [isTransitioning1, setIsTransitioning1] = useState(false);
  const [isTransitioning2, setIsTransitioning2] = useState(false);

  useEffect(() => {
    const timer1 = setInterval(() => {
      setIsTransitioning1(true);
      setTimeout(() => {
        setCurrentImageIndex1((prev) => (prev + 1) % images.length);
        setIsTransitioning1(false);
      }, 500);
    }, 5000);

    const timer2 = setInterval(() => {
      setIsTransitioning2(true);
      setTimeout(() => {
        setCurrentImageIndex2((prev) => (prev + 1) % images2.length);
        setIsTransitioning2(false);
      }, 500);
    }, 5000);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  const nextSlide = (setter: React.Dispatch<React.SetStateAction<number>>, length: number, setTransitioning: React.Dispatch<React.SetStateAction<boolean>>) => {
    setTransitioning(true);
    setTimeout(() => {
      setter((prev) => (prev + 1) % length);
      setTransitioning(false);
    }, 500);
  };

  const prevSlide = (setter: React.Dispatch<React.SetStateAction<number>>, length: number, setTransitioning: React.Dispatch<React.SetStateAction<boolean>>) => {
    setTransitioning(true);
    setTimeout(() => {
      setter((prev) => (prev - 1 + length) % length);
      setTransitioning(false);
    }, 500);
  };

  const nextText1 = () => {
    if (currentTextIndex1 < textContent.length - 1) {
      setCurrentTextIndex1(prev => prev + 1);
    }
  };

  const prevText1 = () => {
    if (currentTextIndex1 > 0) {
      setCurrentTextIndex1(prev => prev - 1);
    }
  };

  const nextText2 = () => {
    if (currentTextIndex2 < textContent2.length - 1) {
      setCurrentTextIndex2(prev => prev + 1);
    }
  };

  const prevText2 = () => {
    if (currentTextIndex2 > 0) {
      setCurrentTextIndex2(prev => prev - 1);
    }
  };

  const text1Slider = useSlider({
    itemsLength: textContent.length,
    onNext: nextText1,
    onPrev: prevText1,
  });

  const image1Slider = useSlider({
    itemsLength: images.length,
    onNext: () => nextSlide(setCurrentImageIndex1, images.length, setIsTransitioning1),
    onPrev: () => prevSlide(setCurrentImageIndex1, images.length, setIsTransitioning1),
  });

  const text2Slider = useSlider({
    itemsLength: textContent2.length,
    onNext: nextText2,
    onPrev: prevText2,
  });

  const image2Slider = useSlider({
    itemsLength: images2.length,
    onNext: () => nextSlide(setCurrentImageIndex2, images2.length, setIsTransitioning2),
    onPrev: () => prevSlide(setCurrentImageIndex2, images2.length, setIsTransitioning2),
  });

  return (
    <>
      {/* Main Services Section */}
      <section className="h-screen w-full snap-start relative z-10">
        <div className="section-title-vertical left-side"><span>Services</span></div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-rows-2 h-full">
          <div className="grid grid-cols-2">
            <div {...text1Slider.dragProps} className="bg-black relative">
              {textContent.map((content, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 p-8 flex items-center transition-opacity duration-500 ${
                    index === currentTextIndex1 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="text-white px-2">
                    <h3 className="text-3xl mb-6">{content.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">{content.text}</p>
                  </div>
                </div>
              ))}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                <button 
                  onClick={prevText1} 
                  className={`p-2 text-white pointer-events-auto ${currentTextIndex1 === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={currentTextIndex1 === 0}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextText1} 
                  className={`p-2 text-white pointer-events-auto ${currentTextIndex1 === textContent.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={currentTextIndex1 === textContent.length - 1}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div {...image1Slider.dragProps} className="relative overflow-hidden">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentImageIndex1 ? 'opacity-100' : 'opacity-0'
                  } ${isTransitioning1 ? 'opacity-0' : ''}`}
                >
                  <img 
                    src={image}
                    alt={`Service ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
              ))}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between">
                <button onClick={() => prevSlide(setCurrentImageIndex1, images.length, setIsTransitioning1)} className="p-2 text-black">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={() => nextSlide(setCurrentImageIndex1, images.length, setIsTransitioning1)} className="p-2 text-black">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div {...image2Slider.dragProps} className="relative overflow-hidden">
              {images2.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentImageIndex2 ? 'opacity-100' : 'opacity-0'
                  } ${isTransitioning2 ? 'opacity-0' : ''}`}
                >
                  <img 
                    src={image}
                    alt={`Service ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
              ))}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between">
                <button onClick={() => prevSlide(setCurrentImageIndex2, images2.length, setIsTransitioning2)} className="p-2 text-black">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={() => nextSlide(setCurrentImageIndex2, images2.length, setIsTransitioning2)} className="p-2 text-black">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div {...text2Slider.dragProps} className="bg-black relative">
              {textContent2.map((content, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 p-8 flex items-center transition-opacity duration-500 ${
                    index === currentTextIndex2 ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="text-white px-2">
                    <h3 className="text-3xl mb-6">{content.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">{content.text}</p>
                  </div>
                </div>
              ))}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                <button 
                  onClick={prevText2} 
                  className={`p-2 text-white pointer-events-auto ${currentTextIndex2 === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={currentTextIndex2 === 0}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextText2} 
                  className={`p-2 text-white pointer-events-auto ${currentTextIndex2 === textContent2.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={currentTextIndex2 === textContent2.length - 1}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - First Section */}
        <div className="md:hidden h-full flex flex-col">
          <div {...image1Slider.dragProps} className="h-1/2 relative overflow-hidden">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentImageIndex1 ? 'opacity-100' : 'opacity-0'
                } ${isTransitioning1 ? 'opacity-0' : ''}`}
              >
                <img 
                  src={image}
                  alt={`Service ${index + 1}`}
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>
            ))}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between">
              <button onClick={() => prevSlide(setCurrentImageIndex1, images.length, setIsTransitioning1)} className="p-2 text-black">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => nextSlide(setCurrentImageIndex1, images.length, setIsTransitioning1)} className="p-2 text-black">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div {...text1Slider.dragProps} className="h-1/2 bg-black relative">
            {textContent.map((content, index) => (
              <div
                key={index}
                className={`absolute inset-0 p-8 flex items-center transition-opacity duration-500 ${
                  index === currentTextIndex1 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="text-white px-2">
                  <h3 className="text-xl mb-2">{content.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">{content.text}</p>
                </div>
              </div>
            ))}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
              <button 
                onClick={prevText1} 
                className={`p-2 text-white pointer-events-auto ${currentTextIndex1 === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentTextIndex1 === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextText1} 
                className={`p-2 text-white pointer-events-auto ${currentTextIndex1 === textContent.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentTextIndex1 === textContent.length - 1}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Only - Second Services Section */}
      <section className="md:hidden h-screen w-full snap-start relative bg-white z-20">
        <div className="section-title-vertical left-side"><span>Services</span></div>
        
        <div className="h-full flex flex-col">
          <div {...image2Slider.dragProps} className="h-1/2 relative overflow-hidden">
            {images2.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentImageIndex2 ? 'opacity-100' : 'opacity-0'
                } ${isTransitioning2 ? 'opacity-0' : ''}`}
              >
                <img 
                  src={image}
                  alt={`Service ${index + 1}`}
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>
            ))}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between">
              <button onClick={() => prevSlide(setCurrentImageIndex2, images2.length, setIsTransitioning2)} className="p-2 text-black">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => nextSlide(setCurrentImageIndex2, images2.length, setIsTransitioning2)} className="p-2 text-black">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div {...text2Slider.dragProps} className="h-1/2 bg-black relative">
            {textContent2.map((content, index) => (
              <div
                key={index}
                className={`absolute inset-0 p-8 flex items-center transition-opacity duration-500 ${
                  index === currentTextIndex2 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="text-white px-2">
                  <h3 className="text-xl mb-2">{content.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">{content.text}</p>
                </div>
              </div>
            ))}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
              <button 
                onClick={prevText2} 
                className={`p-2 text-white pointer-events-auto ${currentTextIndex2 === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentTextIndex2 === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextText2} 
                className={`p-2 text-white pointer-events-auto ${currentTextIndex2 === textContent2.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentTextIndex2 === textContent2.length - 1}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}