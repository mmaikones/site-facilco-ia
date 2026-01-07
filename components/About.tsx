import React from 'react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-brand-yellow font-bold uppercase tracking-widest text-sm mb-2 block">Sobre Nós</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-dark">A Facilco Engenharia</h2>
          </div>
          
          <p className="text-gray-600 mb-6 leading-relaxed text-justify text-lg">
            Com mais de 15 anos de experiência no desenvolvimento de projetos e gerenciamento de obras, nossa especialidade é oferecer soluções completas para o setor industrial, embora também atendamos com excelência ao mercado residencial e comercial.
          </p>
          <p className="text-gray-600 mb-10 leading-relaxed text-justify text-lg">
            Nossa equipe é composta por engenheiros civis altamente qualificados, com pós-graduação em gestão de projetos, segurança do trabalho e meio ambiente, sempre atualizados com cursos e eventos especializados. Trabalhamos de forma personalizada, atendendo às necessidades de cada cliente com precisão e eficiência.
          </p>
          
          <div className="bg-brand-light p-8 rounded-lg border-l-4 border-brand-yellow shadow-sm hover:shadow-md transition">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex items-center text-brand-dark font-bold">
                    <i className="fas fa-check-circle text-brand-yellow mr-3 text-xl"></i> 
                    <span>Pós-Graduação em Gestão de Projetos</span>
                </li>
                <li className="flex items-center text-brand-dark font-bold">
                    <i className="fas fa-check-circle text-brand-yellow mr-3 text-xl"></i> 
                    <span>Especialistas em Segurança e Meio Ambiente</span>
                </li>
                <li className="flex items-center text-brand-dark font-bold">
                    <i className="fas fa-check-circle text-brand-yellow mr-3 text-xl"></i> 
                    <span>Soluções Industriais, Comerciais e Residenciais</span>
                </li>
                 <li className="flex items-center text-brand-dark font-bold">
                    <i className="fas fa-check-circle text-brand-yellow mr-3 text-xl"></i> 
                    <span>+15 Anos de Experiência de Mercado</span>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;