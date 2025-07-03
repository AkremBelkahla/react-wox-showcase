import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Presentation from './components/Presentation';
import Services from './components/Services';
import Process from './components/Process';
import Registration1 from './components/Registration1';
import Registration2 from './components/Registration2';
import PortfolioSlider from './components/PortfolioSlider';
import Activities from './components/Activities';
import Contact from './components/Contact';

function App() {
  return (
    <div className="fixed inset-0 overflow-y-auto overflow-x-hidden snap-y snap-mandatory">
      <Navigation />
      <section id="home" className="h-screen w-full snap-start snap-always">
        <Hero />
      </section>
      <section id="presentation" className="h-screen w-full snap-start snap-always">
        <Presentation />
      </section>
      <section id="services" className="h-screen w-full snap-start snap-always">
        <Services />
      </section>
      <section id="process" className="h-screen w-full snap-start snap-always">
        <Process />
      </section>
      <section id="registration1" className="h-screen w-full snap-start snap-always">
        <Registration1 />
      </section>
      <section id="registration2" className="h-screen w-full snap-start snap-always">
        <Registration2 />
      </section>
      <section id="portfolio" className="h-screen w-full snap-start snap-always">
        <PortfolioSlider />
      </section>
      <section id="activities" className="h-screen w-full snap-start snap-always">
        <Activities />
      </section>
      <section id="contact" className="h-screen w-full snap-start snap-always">
        <Contact />
      </section>
    </div>
  );
}

export default App;