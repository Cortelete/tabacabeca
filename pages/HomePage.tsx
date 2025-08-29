import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL, FORM_SUBMIT_EMAIL } from '../constants';

const ActionButton: React.FC<{ href?: string; to?: string; onClick?: () => void; children: React.ReactNode; external?: boolean; disabled?: boolean; onExternalClick?: (url: string) => void; }> = ({ href, to, onClick, children, external = false, disabled = false, onExternalClick }) => {
    const classes = `
        relative w-full text-center font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition-all duration-300
        bg-amber-200/10 bg-clip-padding backdrop-filter backdrop-blur-md border
        text-amber-100 text-sm sm:text-base
        border-amber-400/30
        hover:border-amber-400/70
        overflow-hidden group
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `;

    const content = (
        <>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#422B0D]">{children}</span>
            <div className="absolute inset-0 bg-amber-400 transform scale-0 group-hover:scale-150 rounded-full transition-transform duration-300 ease-out"></div>
        </>
    );


    if (disabled) {
        return <div className={classes}>{content}</div>;
    }

    if (href) {
        if (external && onExternalClick) {
            return <button onClick={() => onExternalClick(href)} className={classes}>{content}</button>;
        }
        return <a href={href} target={external ? "_blank" : "_self"} rel={external ? "noopener noreferrer" : ""} className={classes}>{content}</a>;
    }
    if (to) {
        return <Link to={to} className={classes}>{content}</Link>;
    }
    return <button onClick={onClick} className={classes}>{content}</button>;
};

const Star: React.FC<{ filled: boolean; onClick: () => void; onMouseEnter: () => void; onMouseLeave: () => void; }> = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
    <svg 
        onClick={onClick} 
        onMouseEnter={onMouseEnter} 
        onMouseLeave={onMouseLeave}
        className={`w-7 h-7 sm:w-8 sm:h-8 cursor-pointer transition-all duration-200 transform hover:scale-110 ${filled ? 'text-amber-400' : 'text-amber-200/50'}`}
        fill="currentColor" 
        viewBox="0 0 20 20"
    >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const StarRating: React.FC<{ onRate: (rating: number) => void }> = ({ onRate }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(0);

    const handleRate = (rate: number) => {
        setCurrentRating(rate);
        onRate(rate);
        // Reset after a short delay to allow for re-rating
        setTimeout(() => setCurrentRating(0), 1000);
    };

    return (
        <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map(starIndex => (
                <Star
                    key={starIndex}
                    filled={hoverRating >= starIndex || currentRating >= starIndex}
                    onClick={() => handleRate(starIndex)}
                    onMouseEnter={() => setHoverRating(starIndex)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            ))}
        </div>
    );
}

interface HomePageProps {
  onExternalClick: (url: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onExternalClick }) => {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);
    const [isProgramacaoModalOpen, setIsProgramacaoModalOpen] = useState(false);
    const [isHorarioModalOpen, setIsHorarioModalOpen] = useState(false);

    const handleRating = (rate: number) => {
      if (rate === 5) {
        onExternalClick(GOOGLE_REVIEW_URL);
      } else if (rate > 0) {
        setIsFeedbackModalOpen(true);
      }
    };
    
    const ticketsUrl = "https://pixta.me/u/sambazooka-1a-edicao-do-retorno?fbclid=PAZXh0bgNhZW0CMTEAAaewnBQV_GRH90FK-BELIiBrd9pSFSGXRwjWswUyOp5PgeIlklzaOmOC-7X_IQ_aem_HLjiQ6-SUh4od1hcslYpNw";

    return (
        <div className="container mx-auto px-4 flex flex-col justify-center items-center text-center h-full py-2 sm:py-4">
            <div className="w-full max-w-sm bg-[#422B0D]/80 text-amber-100 backdrop-blur-lg border border-amber-400/20 rounded-2xl p-3 sm:p-5 shadow-2xl flex flex-col items-center">

                <img src="/logo.png" alt="Tabacabeça Logo" className="w-24 sm:w-32 h-auto mb-2 transition-transform duration-300 hover:scale-105" />
                <h1 className="text-xl sm:text-3xl font-bold mb-1 animated-gradient-title">Tabacabeça</h1>
                <p className="text-amber-200 italic mb-3 sm:mb-4 text-xs sm:text-sm">“A erva é a cura da nação 🌿🔥 – Bob Marley”</p>

                <div className="w-full flex flex-col items-center gap-2 sm:gap-3">
                    <ActionButton href="https://www.instagram.com/tabacabeca" external onExternalClick={onExternalClick}>Instagram</ActionButton>
                    
                    <ActionButton onClick={() => setIsTicketsModalOpen(true)}>Ingressos</ActionButton>
                    
                    <ActionButton onClick={() => setIsProgramacaoModalOpen(true)}>Programação</ActionButton>

                    <ActionButton href={GOOGLE_MAPS_URL} external onExternalClick={onExternalClick}>Como Chegar</ActionButton>
                    
                    <ActionButton onClick={() => setIsHorarioModalOpen(true)}>Horário de Funcionamento</ActionButton>
                    
                    <ActionButton onClick={() => setIsAboutModalOpen(true)}>Sobre Mim</ActionButton>

                    <div className="w-full p-2 rounded-lg bg-amber-200/10 bg-clip-padding backdrop-filter backdrop-blur-md border border-amber-400/30 mt-1">
                      <p className="font-semibold mb-1 text-amber-100 text-sm">Avalie sua experiência</p>
                      <StarRating onRate={handleRating} />
                    </div>
                </div>
            </div>
            
            <Modal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} title="Sobre Mim">
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">Tabacabeça Headshop e Tabacaria</h3>
                    <p className="mb-2">HEADSHOP • DRINKS • MÚSICA 🎶</p>
                    <p className="mb-4">Rolê suave pra gente suave ✨</p>
                    <p>📍 Rua Julio de Castilho, 755 – Centro.</p>
                </div>
            </Modal>
            
            <Modal isOpen={isTicketsModalOpen} onClose={() => setIsTicketsModalOpen(false)} title="SAMBAZOOKA!">
                <div className="text-center space-y-4">
                    <div>
                        <p className="font-semibold text-amber-200">Sexta, 06 de Setembro • 16:20</p>
                        <p className="text-sm text-amber-300">@ Tabacabeça Tabacaria e Headshop</p>
                    </div>
                    <p className="text-amber-300 text-sm">
                        DJ Cisco & Johnny Freitas comandam uma viagem sonora única com o melhor da Música Brasileira, Hip-Hop, Boogie & Grooves Universais.
                    </p>
                    <div className="py-2">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black animated-gradient-text tracking-wider">SAMBAZOOKA!</h3>
                    </div>
                    <p className="text-amber-200 font-bold">Ingressos antecipados: R$10</p>
                    <button 
                        onClick={() => onExternalClick(ticketsUrl)}
                        className="inline-block relative group overflow-hidden w-full bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-amber-700 !mt-6"
                    >
                        <span className="relative z-10">Garantir meu Ingresso</span>
                        <div className="absolute inset-0 bg-amber-500 transform scale-0 group-hover:scale-150 rounded-full transition-transform duration-300 ease-out"></div>
                    </button>
                </div>
            </Modal>

            <Modal isOpen={isProgramacaoModalOpen} onClose={() => setIsProgramacaoModalOpen(false)} title="Programação">
                 <div className="text-left space-y-3 text-sm text-amber-100">
                    <div className="text-center bg-amber-400/80 p-1.5 rounded-md mb-3">
                        <h3 className="font-black text-sm text-[#422B0D] tracking-wider">PROGRAMAÇÃO DA SEMANA</h3>
                        <p className="font-bold text-xs text-[#422B0D]">27/08 À 30/08</p>
                    </div>

                    <div className="border-b border-amber-400/20 pb-2">
                         <div className="flex justify-between items-center mb-1 flex-wrap gap-x-2">
                            <h4 className="text-base font-bold text-amber-200 tracking-wide">QUARTA-FEIRA</h4>
                            <div className="text-xs shrink-0">
                                <span className="font-semibold animated-gradient-time">🕒 20:00</span>
                                <span className="font-bold animated-gradient-price-free ml-2">🎉 ENTRADA GRÁTIS</span>
                            </div>
                        </div>
                        <p className="text-amber-200 leading-snug"><strong className="text-amber-100">RÁDIO EXODUS:</strong> Rap e reggae pra alegrar a rapa + promoções no bar.</p>
                    </div>

                    <div className="border-b border-amber-400/20 pb-2">
                        <div className="flex justify-between items-center mb-1 flex-wrap gap-x-2">
                            <h4 className="text-base font-bold text-amber-200 tracking-wide">QUINTA-FEIRA</h4>
                            <div className="text-xs shrink-0">
                                <span className="font-semibold animated-gradient-time">🕒 20:00</span>
                                <span className="font-bold animated-gradient-price-paid ml-2">💸 R$10 ANTECIPADO</span>
                            </div>
                        </div>
                        <p className="text-amber-200 leading-snug"><strong className="text-amber-100">BANDA LEVI RAS / AO VIVO:</strong> Diretamente de SP apresentando a TOUR MARLEY LOVE + artistas locais convidados.</p>
                    </div>

                    <div className="border-b border-amber-400/20 pb-2">
                        <div className="flex justify-between items-center mb-1 flex-wrap gap-x-2">
                            <h4 className="text-base font-bold text-amber-200 tracking-wide">SEXTA-FEIRA</h4>
                            <div className="text-xs shrink-0">
                                <span className="font-semibold animated-gradient-time">🕒 20:00</span>
                                <span className="font-bold animated-gradient-price-free ml-2">🎉 ENTRADA GRÁTIS</span>
                            </div>
                        </div>
                        <p className="text-amber-200 leading-snug"><strong className="text-amber-100">OPEN DECKS / DISCOTECAGEM:</strong> Traga suas tracks e cola pirar num som.</p>
                    </div>
                    
                    <div>
                         <div className="flex justify-between items-center mb-1 flex-wrap gap-x-2">
                            <h4 className="text-base font-bold text-amber-200 tracking-wide">SÁBADO</h4>
                            <div className="text-xs shrink-0">
                                <span className="font-semibold animated-gradient-time">🕒 19:00</span>
                                <span className="font-bold animated-gradient-price-paid ml-2">💸 R$10 / LISTA ANIVERS.</span>
                            </div>
                        </div>
                        <p className="text-amber-200 leading-snug"><strong className="text-amber-100">NUNO + SIDE + FUMAÇA DE QUINTAL:</strong> residentes da casa em celebração ao aniversário do Dejay Nuno!</p>
                    </div>
                    
                    <div className="text-center bg-amber-400/80 p-2 rounded-md !mt-4">
                        <p className="font-black text-sm text-[#422B0D]">COZINHA ABERTA DE QUINTA À SÁBADO.</p>
                        <p className="font-bold text-xs text-[#422B0D]">DAS 18:30 ÀS 22:00</p>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isHorarioModalOpen} onClose={() => setIsHorarioModalOpen(false)} title="Horário de Funcionamento">
                <div className="text-center space-y-4 text-amber-100">
                    <div>
                        <div className="inline-block bg-amber-400/80 px-3 py-1 rounded-md mb-2">
                            <h3 className="font-black text-sm text-[#422B0D] tracking-wider">TABACARIA/HEADSHOP</h3>
                        </div>
                        <div className="space-y-1 text-amber-200 text-sm">
                            <p><strong className="text-amber-100">TERÇA:</strong> 12H - 20H</p>
                            <p><strong className="text-amber-100">QUARTA - SEXTA:</strong> 12H - 22H</p>
                            <p><strong className="text-amber-100">SÁBADO:</strong> 16H20 - 22H</p>
                        </div>
                    </div>
                    <div>
                        <div className="inline-block bg-amber-400/80 px-3 py-1 rounded-md mb-2">
                            <h3 className="font-black text-sm text-[#422B0D] tracking-wider">TABAS BAR</h3>
                        </div>
                        <div className="space-y-1 text-amber-200 text-sm">
                            <p><strong className="text-amber-100">QUARTA - SEXTA:</strong> 19H</p>
                            <p><strong className="text-amber-100">SÁBADO:</strong> 16H20</p>
                        </div>
                    </div>
                    <p className="text-xs italic text-amber-300 pt-2">*DOMINGO - SÓ SE DER VONTADE</p>
                </div>
            </Modal>


            <Modal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} title="Conte-nos como podemos melhorar">
                <form action={`https://formsubmit.co/${FORM_SUBMIT_EMAIL}`} method="POST" className="space-y-4">
                    <input type="hidden" name="_subject" value="Novo Feedback - Site Tabacabeça" />
                    <input type="hidden" name="_captcha" value="false" />
                     <div>
                        <label htmlFor="feedback" className="block text-sm font-medium text-left mb-1">Sua mensagem:</label>
                        <textarea 
                            name="feedback" 
                            id="feedback" 
                            rows={4} 
                            required 
                            placeholder="Deixe seu feedback aqui..."
                            className="w-full bg-[#422B0D]/50 border border-amber-500/50 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500 text-amber-100 placeholder:text-amber-300/60"
                        />
                     </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-left mb-1">Seu email (opcional):</label>
                        <input 
                            type="email" 
                            name="email"
                            id="email" 
                            placeholder="Para podermos te responder"
                            className="w-full bg-[#422B0D]/50 border border-amber-500/50 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500 text-amber-100 placeholder:text-amber-300/60" 
                        />
                     </div>
                     <button type="submit" className="relative group overflow-hidden w-full bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-amber-700">
                        <span className="relative z-10">Enviar Feedback</span>
                        <div className="absolute inset-0 bg-amber-500 transform scale-0 group-hover:scale-150 rounded-full transition-transform duration-300 ease-out"></div>
                    </button>
                </form>
            </Modal>

            <style>{`
            .animated-gradient-title {
              background-image: linear-gradient(90deg, #f59e0b, #fed7aa, #f59e0b);
              background-size: 200% auto;
              color: transparent;
              -webkit-background-clip: text;
              background-clip: text;
              animation: gradient-text-flow 5s linear infinite, subtle-pulse 3s infinite ease-in-out;
            }
            @keyframes gradient-text-flow {
              to {
                background-position: -200% center;
              }
            }
            @keyframes subtle-pulse {
              0%, 100% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.03);
              }
            }
            .animated-gradient-text {
              background-image: linear-gradient(90deg, #f59e0b, #fed7aa, #f59e0b);
              background-size: 200% auto;
              color: transparent;
              -webkit-background-clip: text;
              background-clip: text;
              animation: gradient-text-flow 5s linear infinite;
            }
            .animated-gradient-price-free {
              background-image: linear-gradient(90deg, #16a34a, #bef264, #16a34a);
              background-size: 200% auto;
              color: transparent;
              -webkit-background-clip: text;
              background-clip: text;
              animation: gradient-text-flow 4s linear infinite;
            }
            .animated-gradient-price-paid {
              background-image: linear-gradient(90deg, #f59e0b, #fcd34d, #f59e0b);
              background-size: 200% auto;
              color: transparent;
              -webkit-background-clip: text;
              background-clip: text;
              animation: gradient-text-flow 4s linear infinite;
            }
            .animated-gradient-time {
              background-image: linear-gradient(90deg, #fef3c7, #fed7aa, #fef3c7);
              background-size: 200% auto;
              color: transparent;
              -webkit-background-clip: text;
              background-clip: text;
              animation: gradient-text-flow 5s linear infinite;
            }
            `}</style>
        </div>
    );
};

export default HomePage;
