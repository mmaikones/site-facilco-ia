import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-brand-dark text-white pt-20 pb-8 border-t-4 border-brand-yellow">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Info */}
          <div className="lg:w-1/3">
            <h3 className="text-3xl font-display font-bold mb-6 flex items-center gap-2">
              <i className="fas fa-industry text-brand-yellow"></i> FACILCO
            </h3>
            <p className="text-gray-400 mb-8">Centralize suas demandas de engenharia com quem entende de indústria.</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-brand-gray p-3 rounded text-brand-yellow"><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <h5 className="font-bold text-white">Matriz</h5>
                  <p className="text-gray-400 text-sm">R. Dr. Elói Chaves, 3412 - Rio Claro, SP</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-brand-gray p-3 rounded text-brand-yellow"><i className="fas fa-phone-alt"></i></div>
                <div>
                  <h5 className="font-bold text-white">Telefone / WhatsApp</h5>
                  <p className="text-gray-400 text-sm">(19) 99622-3433</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-brand-gray p-3 rounded text-brand-yellow"><i className="fas fa-envelope"></i></div>
                <div>
                  <h5 className="font-bold text-white">Email</h5>
                  <p className="text-gray-400 text-sm">engenharia@facilco.com.br</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3 bg-brand-gray p-8 rounded-lg shadow-2xl">
            <h4 className="text-2xl font-display font-bold mb-6 text-brand-yellow">Solicite um Orçamento</h4>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Nome Completo" className="bg-brand-dark border border-gray-700 text-white px-4 py-3 focus:border-brand-yellow outline-none rounded-sm" />
              <input type="text" placeholder="Empresa" className="bg-brand-dark border border-gray-700 text-white px-4 py-3 focus:border-brand-yellow outline-none rounded-sm" />
              <input type="email" placeholder="Email Corporativo" className="bg-brand-dark border border-gray-700 text-white px-4 py-3 focus:border-brand-yellow outline-none rounded-sm" />
              <input type="text" placeholder="Telefone" className="bg-brand-dark border border-gray-700 text-white px-4 py-3 focus:border-brand-yellow outline-none rounded-sm" />
              <textarea placeholder="Descreva sua necessidade (Projeto, Obra, Produto...)" rows={4} className="md:col-span-2 bg-brand-dark border border-gray-700 text-white px-4 py-3 focus:border-brand-yellow outline-none rounded-sm"></textarea>
              
              <div className="md:col-span-2 text-right">
                <button className="bg-brand-yellow text-brand-dark font-bold font-display uppercase tracking-wider py-4 px-8 hover:bg-white transition rounded-sm shadow-lg w-full md:w-auto">
                  Enviar Solicitação
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-xs text-gray-500">
          <p>&copy; 2026 Facilco Engenharia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
