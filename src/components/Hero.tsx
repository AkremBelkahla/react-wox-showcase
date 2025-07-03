import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const socialLinks = {
  instagram: 'https://www.instagram.comagency',
  facebook: 'https://www.facebook.comagency',
  tiktok: 'https://www.tiktok.com/@woxagency',
  youtube: 'https://www.youtube.com/@woxagency'
};

export default function Hero() {

  return (
    <div className="relative h-screen w-full overflow-x-hidden">
      <img
        src="https://picsum.photos/1920/1080"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-between">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center text-white max-w-full px-4">
            <h1 className="w-full">
              <span className="text-[14px] md:text-[17px] font-light uppercase block">Everyone Needs a</span>
              <span className="text-[60px] md:text-[155px] uppercase leading-none tracking-wider font-bold whitespace-nowrap">Line</span>
            </h1>
          </div>
        </div>
        
        <div className="w-full px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center text-white space-y-4 md:space-y-0 mb-[50px] md:mb-0">
          <div className="flex items-center space-x-4">
            {/* Bouton de son supprimé car nous utilisons maintenant une image */}
            <p className="text-xs md:text-sm whitespace-nowrap">Wox  2025 All Rights Reserved.</p>
          </div>
          <div className="flex items-center space-x-6">
            <a href={socialLinks.instagram} className="text-white hover:text-black transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={socialLinks.facebook} className="text-white hover:text-black transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={socialLinks.tiktok} className="text-white hover:text-black transition-colors">
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
            <a href={socialLinks.youtube} className="text-white hover:text-black transition-colors">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}