import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Process = () => {
  const [currentImageIndex1, setCurrentImageIndex1] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [isTransitioning1, setIsTransitioning1] = useState(false);
  const [isTransitioning2, setIsTransitioning2] = useState(false);
  const isTabletPortrait = useMediaQuery('(max-width: 768px)');

  const slides1 = [
    {
      image: 'https://picsum.photos/900/1600',
      title: 'Needs Analysis',
      description: 'We precisely identify your objectives and the needs of your target audience.'
    },
    {
      image: 'https://picsum.photos/900/1600?random=1',
      title: 'Strategic Design',
      description: 'Development of a customized strategy to maximize the impact of your project.'
    },
    {
      image: 'https://picsum.photos/900/1600?random=2',
      title: 'Detailed Planning',
      description: 'Meticulous organization of resources and establishment of a precise timeline.'
    }
  ];

  const slides2 = [
    {
      image: 'https://picsum.photos/900/1600?random=3',
      title: 'Creative Production',
      description: 'Creation of visual and textual content aligned with your brand identity.'
    },
    {
      image: 'https://picsum.photos/900/1600?random=4',
      title: 'Technical Development',
      description: 'Implementation of technical solutions adapted to your specific needs.'
    },
    {
      image: 'https://picsum.photos/900/1600?random=5',
      title: 'Launch and Monitoring',
      description: 'Deployment of your project and continuous performance analysis for optimization.'
    }
  ];
  
  const images1 = slides1.map(slide => slide.image);
  const images2 = slides2.map(slide => slide.image);

  const nextSlide = (setIndex: React.Dispatch<React.SetStateAction<number>>, length: number, setTransitioning: React.Dispatch<React.SetStateAction<boolean>>) => {
    setTransitioning(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % length);
      setTransitioning(false);
    }, 500);
  };

  const prevSlide = (setIndex: React.Dispatch<React.SetStateAction<number>>, length: number, setTransitioning: React.Dispatch<React.SetStateAction<boolean>>) => {
    setTransitioning(true);
    setTimeout(() => {
      setIndex((prevIndex) => (prevIndex - 1 + length) % length);
      setTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    const interval1 = setInterval(() => {
      nextSlide(setCurrentImageIndex1, images1.length, setIsTransitioning1);
    }, 5000);

    const interval2 = setInterval(() => {
      nextSlide(setCurrentImageIndex2, images2.length, setIsTransitioning2);
    }, 5000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <section id="process" className="relative h-screen w-full snap-start bg-black">
      <div className="section-title-vertical"><span>Process</span></div>
      <div className={`
        h-full w-full
        ${isTabletPortrait ? 'flex flex-col' : 'grid grid-cols-2'}
      `}>
        <div className="relative h-full">
          {slides1.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentImageIndex1 ? 'opacity-100' : 'opacity-0'
              } ${isTransitioning1 ? 'opacity-0' : ''}`}
            >
              <img 
                src={slide.image}
                alt={`Process ${index + 1}`}
                className="w-full h-full object-cover"
                draggable="false"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center">
                <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                <p className="text-sm">{slide.description}</p>
              </div>
            </div>
          ))}
          <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between">
            <button onClick={() => prevSlide(setCurrentImageIndex1, images1.length, setIsTransitioning1)} className="p-2 text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => nextSlide(setCurrentImageIndex1, images1.length, setIsTransitioning1)} className="p-2 text-white">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative h-full">
          {slides2.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentImageIndex2 ? 'opacity-100' : 'opacity-0'
              } ${isTransitioning2 ? 'opacity-0' : ''}`}
            >
              <img 
                src={slide.image}
                alt={`Process ${index + 1}`}
                className="w-full h-full object-cover"
                draggable="false"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-center">
                <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                <p className="text-sm">{slide.description}</p>
              </div>
            </div>
          ))}
          <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between">
            <button onClick={() => prevSlide(setCurrentImageIndex2, images2.length, setIsTransitioning2)} className="p-2 text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={() => nextSlide(setCurrentImageIndex2, images2.length, setIsTransitioning2)} className="p-2 text-white">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;