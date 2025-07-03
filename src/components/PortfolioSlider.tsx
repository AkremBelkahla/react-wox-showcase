import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSlider } from '../hooks/useSlider';

const countryNames = {
  gb: "UK", us: "US", es: "ES", fr: "FR", ge: "DE",
  it: "IT", ca: "CA", jp: "JP", br: "BR", fi: "FI"
};

const jobs = [
  "UI Designer", "Visual Designer", "Art Director", "Creative Director", "Motion Designer",
  "Frontend Developer", "Backend Developer", "Full Stack Developer", "Mobile Developer", "DevOps Engineer",
  "Marketing Manager", "Digital Strategist", "Content Manager", "Brand Manager", "Growth Manager"
];

const generateNames = () => {
  const firstNames = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason", "Isabella", "William",
    "Mia", "James", "Charlotte", "Benjamin", "Amelia", "Lucas", "Harper", "Henry", "Evelyn", "Alexander"
  ];

  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
    "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"
  ];

  const domains = ["Design", "Development", "Marketing", "UX Research", "Product", "Strategy"];
  const countries = Object.keys(countryNames);
  const profiles = [];

  for (let i = 0; i < 500; i++) {
    profiles.push({
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      country: countries[i % countries.length],
      domain: domains[i % domains.length],
      job: jobs[i % jobs.length],
      reference: `W${String(i + 1).padStart(9, '0')}`
    });
  }

  return profiles;
};

const names = generateNames();

const modalContent = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamcExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

const items = names.map((person, index) => {
  const profileNumber = index + 1;
  return {
    image: `https://picsum.photos/${480 + index % 20}/${680 + index % 30}`,
    title: person.name,
    country: person.country,
    countryName: countryNames[person.country as keyof typeof countryNames],
    domain: person.domain,
    job: person.job,
    reference: person.reference,
    images: Array.from({ length: 9 }, (_, i) => `https://picsum.photos/${480 + i}/${680 + (index + i) % 30}`),
    text: modalContent.text,
    id: profileNumber
  };
});

const PortfolioSlider = () => {
  const [selectedProject, setSelectedProject] = useState<(typeof items)[0] | null>(null);
  const [currentModalImage, setCurrentModalImage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTabletPortrait, setIsTabletPortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width < 768);
      setIsTabletPortrait(width >= 768 && width < 1024 && height > width);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = isMobile ? 6 : isTabletPortrait ? 9 : 10;
  const pagesCount = Math.ceil(items.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pagesCount);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pagesCount) % pagesCount);
  };

  const nextModalImage = () => {
    setCurrentModalImage((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevModalImage = () => {
    setCurrentModalImage((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  const slider = useSlider({
    itemsLength: pagesCount,
    onNext: nextPage,
    onPrev: prevPage,
  });

  const modalSlider = useSlider({
    itemsLength: selectedProject ? selectedProject.images.length : 0,
    onNext: nextModalImage,
    onPrev: prevModalImage,
  });

  return (
    <>
      <section className="h-screen w-full snap-start relative overflow-hidden">
        <div className="section-title-vertical left-side"><span>Portfolio</span></div>
        
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

        <div {...slider.dragProps} className="relative h-full overflow-hidden">
          <div 
            className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {Array.from({ length: pagesCount }).map((_, pageIndex) => (
              <div key={pageIndex} className="w-full h-full flex-shrink-0">
                <div className={`
                  h-full grid gap-0
                  ${isMobile 
                    ? 'grid-cols-2 grid-rows-3' 
                    : isTabletPortrait 
                      ? 'grid-cols-3 grid-rows-3' 
                      : 'md:grid-cols-5 md:grid-rows-2'
                  }
                `}>
                  {items
                    .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                    .map((item) => (
                      <div
                        key={item.id}
                        className={`
                          relative overflow-hidden cursor-pointer group
                          ${isMobile ? 'h-[33.33vh]' : isTabletPortrait ? 'h-[33.33vh]' : 'h-[50vh]'}
                        `}
                      >
                        <img 
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          draggable="false"
                        />
                        <div className="absolute inset-0 bg-black/60 transition-opacity duration-300">
                          <div className="absolute bottom-4 md:bottom-8 inset-x-0 px-2 md:px-8 text-center transform transition-transform duration-300 group-hover:translate-y-[-1rem] md:group-hover:translate-y-[-2rem]">
                            <h3 className="text-l lg:text-2xl text-white no-select">{item.title}</h3>
                            <p className="text-gray-300 no-select">{item.job}</p>
                            <div className="flex flex-col items-center space-y-2">
                              <span className="text-gray-300 text-sm md:text-base no-select">{item.countryName} / {item.domain}</span>
                              <img 
                                src={`/flags/${item.country}.png`}
                                alt={item.countryName}
                                className=""
                                draggable="false"
                              />
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(item);
                              }}
                              className="mt-4 opacity-0 group-hover:opacity-100 px-4 md:px-6 py-2 bg-white text-black hover:bg-gray-200 transition-all duration-300 text-sm md:text-base"
                            >
                              View profile
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
      </section>

      {selectedProject && (
        <div className={`fixed inset-0 bg-white z-50 ${isTabletPortrait || isMobile ? 'flex flex-col' : 'flex flex-row'}`}>
          <div
            {...modalSlider.dragProps}
            className={`relative ${
              isTabletPortrait || isMobile
                ? 'w-full h-[25vh]'
                : 'w-1/2 h-screen'
            }`}
          >
            {selectedProject.images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentModalImage ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img 
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  draggable="false"
                />
              </div>
            ))}
            <button 
              onClick={prevModalImage} 
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-white z-10"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button 
              onClick={nextModalImage} 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white z-10"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
          
          <div 
            className={`${
              isTabletPortrait || isMobile
                ? 'w-full h-[75vh] pb-20'
                : 'w-1/2 h-screen'
            } p-4 md:p-16 flex flex-col relative overflow-y-auto`}
          >
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg md:text-2xl text-gray-900 no-select">{selectedProject.title}</h2>
                    <img 
                      src={`/flags/${selectedProject.country}.png`}
                      alt={selectedProject.countryName}
                      className="w-6 h-4 object-cover"
                      draggable="false"
                    />
                  </div>
                  <p className="text-base md:text-xl text-gray-600 mb-1 no-select">{selectedProject.job}</p>
                  <span className="text-sm md:text-lg text-gray-600 no-select">
                    {selectedProject.countryName} / {selectedProject.domain}
                  </span>
                </div>
                <div className="bg-black/5 px-1.5 py-0.5 rounded text-black text-[10px] font-mono whitespace-nowrap mt-2">
                  {selectedProject.reference}
                </div>
              </div>

              <div className="md:max-h-[500px] max-h-full overflow-y-auto pr-4 custom-scrollbar">
                <p className="text-gray-700 leading-relaxed text-sm md:text-base no-select font-oswald font-light">
                  {selectedProject.text}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedProject(null);
                setCurrentModalImage(0);
              }}
              className={`${
                isTabletPortrait || isMobile
                  ? 'fixed bottom-0 left-0 right-0 z-50'
                  : 'mt-8 self-start'
              } px-6 md:px-8 py-2 md:py-3 bg-black text-white hover:bg-gray-800 transition-colors`}
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioSlider;
