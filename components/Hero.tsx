import React from 'react';

interface HeroProps {
  toggleChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ toggleChat }) => {
  return (
    <section id="home" className="hero-bg h-[600px] md:h-[750px] flex items-center relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl text-white md:mx-auto md:text-center">
          <div className="flex items-center gap-4 mb-4 animate-bounce md:justify-center">
            <span className="h-[2px] w-12 bg-brand-yellow"></span>
            <span className="uppercase tracking-widest text-sm font-bold text-brand-yellow">Soluções para Indústria</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight mb-8 drop-shadow-lg">
            ENGENHARIA E <br />
            <span className="text-brand-yellow">PROTEÇÃO INDUSTRIAL</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md md:mx-auto">
            Especialistas em construção civil, adequação normativa (NRs) e infraestrutura de segurança para grandes operações logísticas e fabris.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-center">
            <button
              onClick={toggleChat}
              className="bg-white hover:bg-gray-100 text-brand-dark font-bold py-4 px-8 uppercase tracking-wider transition duration-300 text-center font-display rounded-sm shadow-lg border-2 border-white flex items-center justify-center gap-2"
            >
              <i className="fas fa-sparkles text-brand-yellow"></i> Tirar Dúvidas Técnicas
            </button>
            <a href="#catalogo" className="bg-brand-yellow hover:bg-white hover:text-brand-dark text-brand-dark font-bold py-4 px-8 uppercase tracking-wider transition duration-300 text-center font-display rounded-sm shadow-lg">
              Ver Catálogo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
