import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Specialties from './components/Specialties';
import Safety from './components/Safety';
import Weighbridge from './components/Weighbridge';
import IndustrialProjects from './components/IndustrialProjects';
import Services from './components/Services';
import About from './components/About';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen">
      <Header toggleChat={toggleChat} />
      <Hero toggleChat={toggleChat} />
      <Catalog />
      <Services />
      <Specialties />
      <Safety />
      <Weighbridge />
      <IndustrialProjects />
      <About />
      <Footer />
      <ChatWidget isOpen={isChatOpen} toggleChat={toggleChat} />
    </div>
  );
};

export default App;