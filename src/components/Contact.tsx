import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init("mJZl4W2ab3S676QGN"); // À remplacer avec votre clé publique EmailJS
import { Facebook, Instagram, Youtube, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const images = [
  "https://picsum.photos/900/1600",
  "https://picsum.photos/900/1600?random=50",
  "https://picsum.photos/900/1600?random=51",
  "https://picsum.photos/900/1600?random=52",
];

const countries = [
  'France',
  'Belgium',
  'Switzerland',
  'Canada',
  'Luxembourg',
  'United States',
  'United Kingdom',
  'Germany',
  'Spain',
  'Italy',
  'Austria',
  'Sweden',
  'Norway',
  'Denmark',
  'Japan',
  'China',
  'Australia',
  'New Zealand',
  'Singapore'
];

const socialLinks = {
  instagram: 'https://www.instagram.comagency',
  facebook: 'https://www.facebook.comagency',
  tiktok: 'https://www.tiktok.com/@woxagency',
  youtube: 'https://www.youtube.com/@woxagency'
};

const legalText = `
TERMS AND CONDITIONS OF SALE AND USE

1. INTRODUCTION
These terms and conditions govern the use of our services and establish the contractual relationship between us...

2. SERVICES
We offer web creation and development, graphic design, and digital marketing services...

3. PRICING AND PAYMENT
Our rates are established based on each project and communicated through quotes...

4. INTELLECTUAL PROPERTY
All intellectual property rights related to our creations remain our property until full payment...

5. CONFIDENTIALITY
We are committed to protecting your personal data in accordance with GDPR...
`;

export default function Contact() {
  const isTabletPortrait = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [showLegal, setShowLegal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    postalCode: '',
    city: '',
    country: '',
    profession: '',
    whatsapp: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Préparer les données pour EmailJS
      const templateParams = {
        to_email: 'infinitywebtn@gmail.com',
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: `Nouveau message de ${formData.firstName} ${formData.lastName}`,
        message: `
Nom: ${formData.firstName} ${formData.lastName}
Code Postal: ${formData.postalCode}
Ville: ${formData.city}
Pays: ${formData.country}
Profession: ${formData.profession}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}
Téléphone: ${formData.phone}

Message:
${formData.message}
        `
      };

      // Envoyer l'email via EmailJS
      await emailjs.send(
        'service_yzy5wvk',
        'template_u3y5ah9',
        templateParams
      );

      // Réinitialiser le formulaire après l'envoi réussi
      setFormData({
        firstName: '',
        lastName: '',
        postalCode: '',
        city: '',
        country: '',
        profession: '',
        whatsapp: '',
        email: '',
        phone: '',
        message: ''
      });

      alert('Message envoyé avec succès !');
    } catch (error) {
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Half of the transition duration
    }, 5000); // Change image every 5 seconds

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

  return (
    <>
      <section className={`
        h-screen w-full snap-start
        ${isTabletPortrait ? 'flex flex-col' : 'md:grid md:grid-cols-2'}
      `}>

        {/* Image Section */}
        <div className={`
          relative overflow-hidden
          ${isMobile ? 'h-[25vh]' : isTabletPortrait ? 'h-[40vh]' : 'h-screen'} 
          ${isTabletPortrait ? 'order-1' : 'order-2'}
        `}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              } ${isTransitioning ? 'opacity-0' : ''}`}
            >
              <img 
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          ))}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 text-white hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-6 md:w-8 h-6 md:h-8" />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 text-white hover:scale-110 transition-transform"
          >
            <ChevronRight className="w-6 md:w-8 h-6 md:h-8" />
          </button>
        </div>

        {/* Content Section */}
        <div className={`
          bg-white relative
          ${isMobile ? 'h-[75vh]' : isTabletPortrait ? 'h-[60vh]' : 'h-screen'}
          ${isTabletPortrait ? 'order-2' : 'order-1'}
        `}>
          <div className="absolute inset-0 md:flex md:flex-col">
            <div className="flex-grow py-4 overflow-y-auto">
              <div className="p-4 lg:p-16">
                <div className="max-w-lg mx-auto">
                  <h2 className="text-xl lg:text-2xl mb-2">Get in Touch</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Zip Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full col-span-1"
                        required
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full col-span-1"
                        required
                      />
                      <select 
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full col-span-2"
                        required
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
                        value={formData.profession}
                        onChange={handleInputChange}
                        className="p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                        required
                      />
                      <input
                        type="tel"
                        name="whatsapp"
                        placeholder="WhatsApp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none w-full"
                        required
                      />
                    </div>

                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-black/20 outline-none resize-none"
                      required
                    ></textarea>

                    <button 
                      type="submit" 
                      className="w-full bg-black text-white p-2 md:p-4 rounded-lg hover:bg-black/90 transition-colors disabled:bg-gray-400"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Social Links and Legal - Desktop */}
            <div className=" md:block border-t">
              <div className="max-w-lg mx-auto px-8 py-6 flex justify-between items-center">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="flex justify-center space-x-6">
                    <a href={socialLinks.instagram} className="text-gray-600 hover:text-black transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href={socialLinks.facebook} className="text-gray-600 hover:text-black transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href={socialLinks.tiktok} className="text-gray-600 hover:text-black transition-colors">
                      <svg 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="w-5 h-5"
                      >
                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                      </svg>
                    </a>
                    <a href={socialLinks.youtube} className="text-gray-600 hover:text-black transition-colors">
                      <Youtube className="w-5 h-5" />
                    </a>
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-4">
                    <div className="flex justify-center space-x-4">
                      <button 
                        onClick={() => setShowLegal(true)}
                        className="underline hover:text-black transition-colors"
                      >
                        CGV-CGU
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {showLegal && (
        <div className="fixed inset-0 z-50 grid grid-cols-1 md:grid-cols-2">
          <div className="relative hidden md:block">
            <img 
              src="https://www.11-76.com/themes/img/works/works-page-img-carousel-item-1.jpg" 
              alt="Legal" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="bg-white p-4 md:p-16 relative overflow-y-auto">
            <div className="prose max-w-none">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Terms and Conditions</h2>
              <div className="whitespace-pre-line text-gray-600 text-sm md:text-base">
                {legalText}
              </div>
              <button
                onClick={() => setShowLegal(false)}
                className="mt-8 px-6 md:px-8 py-2 md:py-3 bg-black text-white hover:bg-gray-800 transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
