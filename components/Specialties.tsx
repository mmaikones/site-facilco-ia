import React from 'react';

const specialties = [
  {
    title: "Sinalização e sensores",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Delimitadores",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Escada marinheiro",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const Specialties: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">Alta Performance</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">
            Especialistas em proteção e automação industrial
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Desenvolvemos sistemas e equipamentos especializados para segurança e eficiência operacional em ambientes industriais e logísticos. Desde sinalização inteligente até estruturas de proteção, nossos projetos atendem às normas técnicas e garantem conformidade legal para sua operação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialties.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[3/4] mb-4">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Title overlay for mobile/aesthetic or simple bottom text */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                   <div className="w-10 h-1 bg-brand-yellow mb-2 transform origin-left group-hover:scale-x-150 transition duration-300"></div>
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-dark group-hover:text-brand-yellow transition-colors uppercase tracking-wide">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;