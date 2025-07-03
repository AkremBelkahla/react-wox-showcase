import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("mJZl4W2ab3S676QGN");
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSlider } from '../hooks/useSlider';
import { useMediaQuery } from '../hooks/useMediaQuery';

const images = [
  "https://picsum.photos/900/1600",
  "https://picsum.photos/900/1600?random=30",
  "https://picsum.photos/900/1600?random=31",
  "https://picsum.photos/900/1600?random=32"
];

const contentSlides = [
  {
    title: "Welcome to Our Community",
    text: "Loremorum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "content"
  },
  {
    title: "Why Join Us?",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate veliborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. U",
    type: "content"
  },
  {
    title: "What We Offer",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q uis dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    type: "content"
  },
  {
    type: "form",
    title: "Join Now"
  }
];

const countries = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", 
  "France", "Japan", "China", "India", "Brazil", "Mexico", "Italy", 
  "Spain", "Netherlands", "South Korea", "Russia", "South Africa"
];

const languages = [
  "English", "French", "German", "Japanese", "Portuguese", "Arabic", "Russian", "Chinese"
];

const Registration1: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
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

  const nextContent = () => {
    if (currentContentIndex < contentSlides.length - 1) {
      setCurrentContentIndex(prev => prev + 1);
    }
  };

  const prevContent = () => {
    if (currentContentIndex > 0) {
      setCurrentContentIndex(prev => prev - 1);
    }
  };

  const imageSlider = useSlider({
    itemsLength: images.length,
    onNext: nextImage,
    onPrev: prevImage,
  });

  const contentSlider = useSlider({
    itemsLength: contentSlides.length,
    onNext: nextContent,
    onPrev: prevContent,
  });

  return (
    <section className="h-screen w-full snap-start relative">
      <div className="section-title-vertical left-side"><span>Registration</span></div>
      
      <div className={`
        flex flex-col
        ${isTabletPortrait ? 'h-screen' : 'md:flex-row'}
        w-full
      `}>
        <div {...imageSlider.dragProps} className={`
          relative
          ${isTabletPortrait ? 'h-[40vh]' : 'h-[25vh] md:h-screen md:w-1/2'}
        `}>
          <div className="relative w-full h-full">
            <div 
              className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between text-black z-10">
              <button onClick={prevImage} className="p-2">
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              <button onClick={nextImage} className="p-2">
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
          </div>
        </div>
        <div {...contentSlider.dragProps} className={`
          ${isTabletPortrait ? 'h-[60vh]' : 'h-[75vh] md:h-screen md:w-1/2'}
          bg-gray-100 p-4 md:p-8 flex items-center justify-center relative overflow-y-auto
        `}>
          {contentSlides.map((content, index) => (
            <div
              key={index}
              className={`absolute inset-0 p-8 md:p-16 flex items-center justify-center transition-opacity duration-500 ${
                index === currentContentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {content.type === 'form' ? (
                <div className="w-full max-h-full overflow-y-auto">
                  <h2 className="text-xl lg:text-2xl mb-4 md:mb-6 no-select">{content.title}</h2>
                  <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    
                    try {
                      // Préparer les données pour EmailJS
                      const photoFile = formData.get('photo') as File;
                      let photoBase64 = '';
                      
                      if (photoFile) {
                        const reader = new FileReader();
                        photoBase64 = await new Promise((resolve) => {
                          reader.onloadend = () => resolve(reader.result as string);
                          reader.readAsDataURL(photoFile);
                        });
                      }

                      const templateParams = {
                        to_email: 'infinitywebtn@gmail.com',
                        from_name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                        from_email: formData.get('email'),
                        subject: `Nouvelle inscription de ${formData.get('firstName')} ${formData.get('lastName')}`,
                        message: `
Nom: ${formData.get('firstName')} ${formData.get('lastName')}
Code Postal: ${formData.get('postalCode')}
Ville: ${formData.get('city')}
Pays: ${formData.get('country')}
Profession: ${formData.get('profession')}
WhatsApp: ${formData.get('whatsapp')}
Email: ${formData.get('email')}
Téléphone: ${formData.get('phone')}
Langues: ${Array.from(formData.getAll('languages')).join(', ')}

Introduction:
${formData.get('introduction')}

Photo:
${photoBase64}
                        `
                      };

                      // Envoyer l'email via EmailJS
                      await emailjs.send(
                        'service_yzy5wvk',
                        'template_u3y5ah9',
                        templateParams
                      );

                      alert('Inscription envoyée avec succès !');
                      form.reset();
                    } catch (error) {
                      alert('Erreur lors de l\'envoi du formulaire. Veuillez réessayer.');
                    }
                  }}>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        required
                        className="py-1.5 px-4 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        required
                        className="py-1.5 px-4 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Zip Code"
                        required
                        className="py-1.5 px-4 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full col-span-1"
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        required
                        className="py-1.5 px-4 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full col-span-1"
                      />
                      <select 
                        name="country"
                        required
                        className="py-1.5 px-4 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full col-span-2"
                      >
                        <option value="">Country</option>
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="profession"
                        placeholder="Profession"
                        required
                        className="py-1.5 px-4 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                      />
                      <input
                        type="tel"
                        name="whatsapp"
                        placeholder="WhatsApp"
                        className="py-1.5 px-4 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="py-1.5 px-4 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        className="py-1.5 px-4 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                      />
                    </div>

                    <div className="p-2 border rounded-lg bg-white">
                      <p className="mb-2 font-semibold">Upload your photo:</p>
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        required
                        className="w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-black file:text-white
                          hover:file:bg-black/90
                          file:cursor-pointer cursor-pointer"
                      />
                    </div>

                    <div className="p-2 border rounded-lg bg-white">
                      <p className="mb-2 font-semibold">Spoken Languages:</p>
                      <div className="grid grid-cols-3 md:grid-cols-4 grid-rows-2 gap-4">
                        {languages.map((language) => (
                          <label key={language} className="flex items-center space-x-2">
                            <input 
                              type="checkbox" 
                              name="languages" 
                              value={language}
                              className="form-checkbox" 
                            />
                            <span className="text-sm md:text-base">{language}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <textarea
                      name="introduction"
                      placeholder="Introduce yourself (max 500 characters)"
                      required
                      maxLength={500}
                      rows={4}
                      className="w-full py-1.5 px-4 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none resize-none"
                    ></textarea>

                    <button type="submit" className="w-full bg-black text-white p-4 rounded-lg hover:bg-black/90 transition-colors">
                      Submit
                    </button>
                  </form>
                </div>
              ) : (
                <div className="w-full px-2 no-select">
                  <h2 className="text-xl lg:text-2xl mb-4 md:mb-6">{content.title}</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">{content.text}</p>
                </div>
              )}
            </div>
          ))}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between text-black">
            <button 
              onClick={prevContent} 
              className={`p-2 z-20 ${currentContentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentContentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button 
              onClick={nextContent} 
              className={`p-2 z-20 ${currentContentIndex === contentSlides.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentContentIndex === contentSlides.length - 1}
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration1;
