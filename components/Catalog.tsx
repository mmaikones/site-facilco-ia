import React, { useState, useEffect, useRef } from 'react';
import { CatalogItem } from '../types';

const allProducts: CatalogItem[] = [
  // --- PROTEÇÃO ---
  {
    id: 1,
    title: "Bollards de Alta Absorção",
    description: "Postes de proteção robustos para proteção de portas, hidrantes e estruturas contra impactos de empilhadeiras. Fabricados em polímero de memória que absorve o choque e retorna à forma original, evitando danos ao piso.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Proteção"
  },
  {
    id: 2,
    title: "Barreiras de Tráfego Flexíveis",
    description: "Delimitadores físicos com polímero de memória. Ideais para segregar pedestres de veículos industriais. Sistema modular de fácil instalação e manutenção zero (não oxida).",
    image: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Proteção"
  },
  {
    id: 3,
    title: "Guarda-Corpo Industrial",
    description: "Proteção coletiva para passarelas, mezaninos e áreas de desnível. Totalmente em conformidade com a NR-12. Disponível em aço galvanizado ou polímero técnico.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Proteção"
  },
  {
    id: 4,
    title: "Protetores de Coluna",
    description: "Revestimento envolvente para colunas de concreto ou metálicas (I/H). Evita danos estruturais severos em caso de colisão de empilhadeiras.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Proteção"
  },
  {
    id: 5,
    title: "Protetores de Racking",
    description: "Proteção específica para os pés (montantes) de estruturas de porta-paletes em armazéns logísticos. Evita o colapso da estrutura por impactos leves e médios.",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Proteção"
  },

  // --- TRABALHO EM ALTURA ---
  {
    id: 6,
    title: "Linha de Vida Horizontal",
    description: "Sistema para espaços elevados horizontais, como telhados de galpões e pontes rolantes. Permite a movimentação segura e contínua do operador ao longo de todo o trajeto.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Trabalho em Altura"
  },
  {
    id: 7,
    title: "Linha de Vida Vertical",
    description: "Aplicada em estruturas verticais, como escadas marinheiro, torres de telecom e silos. Trava-quedas deslizante garante segurança total na subida e descida.",
    image: "https://images.unsplash.com/photo-1552845648-5c4a4f89d532?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Trabalho em Altura"
  },
  {
    id: 8,
    title: "Linhas de Vida Flexíveis e Rígidas",
    description: "Opções em cabos de aço/cordas (flexível) para grandes vãos ou trilhos rígidos (alumínio/aço) para menor flecha e resgate facilitado. Projetos conforme NR-35.",
    image: "https://images.unsplash.com/photo-1517581177697-a06a18f6f32e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Trabalho em Altura"
  },
  {
    id: 9,
    title: "Linha de Vida Móvel",
    description: "Sistema temporário e portátil. Projetada para mover-se com o trabalhador ou ser instalada rapidamente em canteiros de obra, proporcionando mobilidade imediata.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Trabalho em Altura"
  },
  {
    id: 10,
    title: "Pontos de Ancoragem",
    description: "Dispositivos certificados (olhais, chapeletas) para fixação em concreto, aço ou madeira. Testados individualmente para suportar cargas de impacto.",
    image: "https://images.unsplash.com/photo-1605218457297-c6b75f564dc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Trabalho em Altura"
  },

  // --- LOGÍSTICA ---
  {
    id: 11,
    title: "Sinalização de Docas (Semáforos)",
    description: "Sistemas visuais LED (Verde/Vermelho) integrados aos portões das docas. Organiza o fluxo de caminhões e previne acidentes por saída prematura.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Logística"
  },
  {
    id: 12,
    title: "Calços de Roda (Chocks)",
    description: "Bloqueio físico obrigatório para caminhões durante operação de carga e descarga. Fabricados em borracha de alta densidade ou poliuretano.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Logística"
  },
  {
    id: 13,
    title: "Niveladoras de Doca",
    description: "Equipamentos hidráulicos ou manuais para compensar o desnível entre a doca e a carroceria do caminhão, permitindo o trânsito seguro de paleteiras e empilhadeiras.",
    image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Logística"
  },
  {
    id: 14,
    title: "Pintura de Piso Industrial",
    description: "Demarcação técnica de faixas de pedestres, rotas de empilhadeiras e áreas de extintores com tinta Epóxi de alta resistência à abrasão.",
    image: "https://images.unsplash.com/photo-1632759139824-3868670d9980?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    category: "Logística"
  }
];

const categories = ["Todos", "Proteção", "Trabalho em Altura", "Logística"];

const Catalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [selectedProduct, setSelectedProduct] = useState<CatalogItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filteredProducts = activeCategory === "Todos"
    ? allProducts
    : allProducts.filter(product => product.category === activeCategory);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Auto-play Logic
  useEffect(() => {
    if (isPaused || selectedProduct) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, selectedProduct, filteredProducts.length, itemsPerPage]);

  const nextSlide = () => {
    if (filteredProducts.length <= itemsPerPage) return;

    setCurrentIndex((prevIndex) => {
      // Logic: Move one item at a time
      const maxIndex = filteredProducts.length - itemsPerPage;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    if (filteredProducts.length <= itemsPerPage) return;

    setCurrentIndex((prevIndex) => {
      const maxIndex = filteredProducts.length - itemsPerPage;
      return prevIndex === 0 ? maxIndex : prevIndex - 1;
    });
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  const getWhatsAppLink = (product: CatalogItem) => {
    const message = `Olá Facilco! Gostaria de um orçamento para: ${product.title}`;
    return `https://wa.me/5519996223433?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="catalogo" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">Catálogo Completo</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-4">Soluções em Proteção & Infraestrutura</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Tecnologia e robustez para garantir a segurança operacional da sua indústria.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm font-bold uppercase tracking-wide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition ${activeCategory === category
                  ? 'bg-brand-dark text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-brand-yellow hover:text-brand-dark'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Arrows */}
          {filteredProducts.length > itemsPerPage && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-brand-dark text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition shadow-lg opacity-0 group-hover:opacity-100 -ml-4 md:-ml-8"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-brand-dark text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition shadow-lg opacity-0 group-hover:opacity-100 -mr-4 md:-mr-8"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </>
          )}

          {/* Track */}
          <div
            className="overflow-hidden p-4 -m-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: filteredProducts.length > itemsPerPage
                  ? `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
                  : 'none'
              }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  style={{ flex: `0 0 calc(${100 / itemsPerPage}% - ${itemsPerPage > 1 ? (24 * (itemsPerPage - 1) / itemsPerPage) : 0}px)` }}
                  className="group/card relative bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden relative">
                    {/* Badge */}
                    <span className="absolute top-3 right-3 bg-brand-yellow text-brand-dark text-[10px] font-bold px-2 py-1 rounded uppercase z-10 shadow-sm">
                      {product.category}
                    </span>
                    {/* View Icon Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                      <span className="bg-white text-brand-dark px-4 py-2 rounded-full font-bold text-xs uppercase flex items-center gap-2">
                        <i className="fas fa-search-plus"></i> Ver Detalhes
                      </span>
                    </div>
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover transition duration-500 group-hover/card:scale-110" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-display font-bold text-brand-dark mb-2 leading-tight">{product.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-3">{product.description}</p>
                    <span className="text-brand-yellow font-bold text-sm uppercase flex items-center gap-2 mt-auto">
                      Solicitar Cotação <i className="fas fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="w-full text-center py-10 text-gray-400">
                  Nenhum produto encontrado nesta categoria.
                </div>
              )}
            </div>
          </div>

          {/* Pagination Dots */}
          {filteredProducts.length > itemsPerPage && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(filteredProducts.length - itemsPerPage + 1) }).map((_, idx) => (
                // Only show a limited number of dots to prevent overcrowding
                idx % itemsPerPage === 0 && (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentIndex >= idx && currentIndex < idx + itemsPerPage
                        ? 'w-8 bg-brand-yellow'
                        : 'w-2 bg-gray-300'
                      }`}
                    aria-label={`Go to slide group ${idx + 1}`}
                  />
                )
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedProduct(null)}
          ></div>

          {/* Modal Content */}
          <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden relative z-10 flex flex-col md:flex-row animate-[fadeIn_0.3s_ease-out]">

            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition"
            >
              <i className="fas fa-times text-xl"></i>
            </button>

            {/* Left: Image Area */}
            <div className="md:w-1/2 bg-gray-100 relative min-h-[300px] md:min-h-[500px]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute bottom-0 left-0 bg-brand-yellow px-4 py-2 text-brand-dark font-bold text-xs uppercase tracking-widest">
                {selectedProduct.category}
              </div>
            </div>

            {/* Right: Info Area */}
            <div className="md:w-1/2 p-8 flex flex-col">
              <h3 className="text-3xl font-display font-bold text-brand-dark mb-4">{selectedProduct.title}</h3>

              <div className="prose prose-sm text-gray-600 mb-8 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                <p className="text-lg leading-relaxed">{selectedProduct.description}</p>

                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                  <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2">
                    <i className="fas fa-check-circle"></i> Disponibilidade
                  </h4>
                  <p className="text-sm text-blue-800">
                    Produto sob medida. Fabricação e instalação própria pela Facilco Engenharia.
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
                <a
                  href={getWhatsAppLink(selectedProduct)}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 text-white py-4 px-6 rounded-lg font-bold text-center hover:bg-green-700 transition flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
                >
                  <i className="fab fa-whatsapp text-2xl"></i>
                  <div className="text-left">
                    <span className="block text-xs font-normal opacity-90">Falar com Consultor</span>
                    <span className="uppercase tracking-wide">Pedir Orçamento Agora</span>
                  </div>
                </a>
                <p className="text-center text-xs text-gray-400">
                  *Atendimento técnico imediato.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Catalog;