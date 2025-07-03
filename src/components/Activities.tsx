import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const generateActivities = () => {
  const activities = [];
  for (let i = 1; i <= 300; i++) {
    activities.push({
      id: i,
      title: `Activity ${i}`,
      image: `https://picsum.photos/900/1600?random=${i}`,
      images: Array.from({ length: 9 }, (_, index) => `https://picsum.photos/900/1600?random=${i * 10 + index}`)
    });
  }
  return activities;
};

const Activities = () => {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTabletPortrait = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const activities = generateActivities();
  const itemsPerPage = 9;
  const pagesCount = Math.ceil(activities.length / itemsPerPage);

  const handleNext = () => {
    if (selectedActivity) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedActivity.images.length);
    }
  };

  const handlePrev = () => {
    if (selectedActivity) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedActivity.images.length) % selectedActivity.images.length);
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pagesCount);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pagesCount) % pagesCount);
  };

  const openModal = (activity: any) => {
    setSelectedActivity(activity);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedActivity(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="h-screen w-full snap-start bg-white relative overflow-hidden">
      <div className="section-title-vertical"><span>Activities</span></div>
      
      <button 
        onClick={prevPage}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        onClick={nextPage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      <div className="relative h-full overflow-hidden">
        <div 
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {Array.from({ length: pagesCount }).map((_, pageIndex) => (
            <div key={pageIndex} className="w-full h-full flex-shrink-0">
              <div className={`h-full grid ${
                isMobile || isTabletPortrait
                  ? 'grid-cols-1 grid-rows-3'
                  : 'grid-cols-3 grid-rows-1'
              }`}>
                {activities
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((activity) => (
                    <div 
                      key={activity.id} 
                      className={`
                        relative group overflow-hidden cursor-pointer font-['Oswald']
                        ${isMobile || isTabletPortrait ? 'h-[33.33vh]' : 'h-screen'}
                      `}
                    >
                      <img 
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-60">
                        <div className="absolute bottom-4 md:bottom-8 inset-x-0 px-4 md:px-8 text-center transform transition-transform duration-300 group-hover:translate-y-[-1rem] md:group-hover:translate-y-[-2rem]">
                          <h3 className="text-xl md:text-2xl text-white mb-2 font-normal">{activity.title}</h3>
                          <button 
                            onClick={() => openModal(activity)}
                            className="opacity-0 group-hover:opacity-100 px-4 md:px-6 py-2 mb-8 md:mb-4 bg-white text-black hover:bg-gray-200 transition-all duration-300 text-sm md:text-base uppercase"
                          >
                            View activity
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className={`h-full ${isMobile || isTabletPortrait ? 'flex flex-col' : 'flex flex-row'}`}>
            {/* Slider Photos */}
            <div className={`relative ${isMobile || isTabletPortrait ? 'h-[25vh]' : 'w-1/2 h-screen'}`}>
              <img
                src={selectedActivity.images[currentImageIndex]}
                alt={`${selectedActivity.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                draggable="false"
              />
              
              <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="p-2 text-white hover:text-gray-300 transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="p-2 text-white hover:text-gray-300 transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>
            </div>

            {/* Contenu texte */}
            <div className={`${isMobile || isTabletPortrait ? 'h-[75vh]' : 'w-1/2 h-screen'} p-8 md:p-16 overflow-y-auto relative`}>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl text-black mb-4">{selectedActivity.title}</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-gray-600">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <p className="text-gray-600">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </div>

              <button
                onClick={closeModal}
                className={`${
                  isMobile || isTabletPortrait
                    ? 'fixed bottom-0 left-0 right-0'
                    : 'mt-8 self-start'
                } px-6 md:px-8 py-2 md:py-3 bg-black text-white hover:bg-gray-800 transition-colors w-full md:w-auto`}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Activities;