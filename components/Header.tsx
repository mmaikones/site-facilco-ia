import React, { useState } from 'react';

interface HeaderProps {
  toggleChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleChat }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <div className="bg-brand-dark text-white py-2 text-xs border-b border-gray-800">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-6 text-center md:text-left">
            <span><i className="fas fa-map-marker-alt text-brand-yellow mr-2"></i>Rio Claro, SP - Atendimento Nacional</span>
            <span className="hidden sm:inline"><i className="fas fa-envelope text-brand-yellow mr-2"></i>engenharia@facilco.com.br</span>
            <span className="font-bold text-brand-yellow"><i className="fas fa-phone mr-2"></i>(19) 99622-3433</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-brand-yellow transition"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="hover:text-brand-yellow transition"><i className="fab fa-instagram"></i></a>
            <a href="https://wa.me/5519996223433" target="_blank" rel="noreferrer" className="hover:text-brand-yellow transition"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>

      <header className="bg-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Facilco Engenharia"
              className="h-16 w-auto object-contain"
            />
            {/* Fallback Text Logo */}
            <div className="hidden flex items-center gap-2 text-2xl font-display font-bold text-brand-dark tracking-tighter uppercase">
              <i className="fas fa-industry text-brand-yellow text-3xl"></i>
              <div>
                FACILCO <br />
                <span className="text-xs font-sans font-normal tracking-widest text-gray-500 block -mt-1">ENGENHARIA</span>
              </div>
            </div>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-8 font-bold text-sm uppercase tracking-wide text-brand-dark items-center">
            <a href="#home" className="nav-link text-brand-yellow">Início</a>
            <a href="#catalogo" className="nav-link hover:text-brand-yellow transition">Catálogo</a>
            <a href="#servicos" className="nav-link hover:text-brand-yellow transition">Serviços</a>
            <a href="#sobre" className="nav-link hover:text-brand-yellow transition">A Empresa</a>
            <button onClick={toggleChat} className="nav-link hover:text-brand-yellow transition flex items-center gap-1">
              <i className="fas fa-robot text-brand-yellow"></i> Consultor IA
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="https://wa.me/5519996223433" target="_blank" rel="noreferrer" className="text-green-600 text-2xl hover:scale-110 transition">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#contato" className="bg-brand-yellow hover:bg-yellow-500 text-brand-dark font-display font-bold py-3 px-6 uppercase text-sm tracking-wider transition duration-300 rounded-sm">
              Orçamento
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-2xl text-brand-dark" onClick={toggleMobileMenu}>
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden bg-brand-dark text-white p-4 absolute w-full top-full left-0 border-t border-gray-700 shadow-xl">
            <a href="#home" className="block py-3 border-b border-gray-700 hover:text-brand-yellow font-bold" onClick={toggleMobileMenu}>Início</a>
            <a href="#catalogo" className="block py-3 border-b border-gray-700 hover:text-brand-yellow font-bold" onClick={toggleMobileMenu}>Catálogo de Produtos</a>
            <a href="#servicos" className="block py-3 border-b border-gray-700 hover:text-brand-yellow font-bold" onClick={toggleMobileMenu}>Serviços de Engenharia</a>
            <button
              onClick={() => { toggleChat(); toggleMobileMenu(); }}
              className="block w-full text-left py-3 border-b border-gray-700 hover:text-brand-yellow font-bold"
            >
              <i className="fas fa-robot text-brand-yellow mr-2"></i> Consultor Técnico IA
            </button>
            <a href="#contato" className="block py-3 hover:text-brand-yellow font-bold text-brand-yellow" onClick={toggleMobileMenu}>Fale Conosco</a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
