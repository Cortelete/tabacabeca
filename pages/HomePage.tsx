import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/Modal';
import { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL, FORM_SUBMIT_EMAIL } from '../constants';

const ActionButton: React.FC<{ href?: string; to?: string; onClick?: () => void; children: React.ReactNode; external?: boolean; disabled?: boolean; }> = ({ href, to, onClick, children, external = false, disabled = false }) => {
    const classes = `
        relative w-full text-center font-semibold py-3 px-6 rounded-lg transition-all duration-300
        bg-amber-200/10 bg-clip-padding backdrop-filter backdrop-blur-md border
        text-amber-100
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
        className={`w-8 h-8 cursor-pointer transition-all duration-200 transform hover:scale-110 ${filled ? 'text-amber-400' : 'text-amber-200/50'}`}
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

const HomePage: React.FC = () => {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);
    const [isProgramacaoModalOpen, setIsProgramacaoModalOpen] = useState(false);

    const handleRating = (rate: number) => {
      if (rate === 5) {
        window.open(GOOGLE_REVIEW_URL, '_blank');
      } else if (rate > 0) {
        setIsFeedbackModalOpen(true);
      }
    };

    return (
        <div className="container mx-auto px-4 flex flex-col justify-center items-center text-center h-full">
            <div className="w-full max-w-sm bg-[#422B0D]/80 text-amber-100 backdrop-blur-lg border border-amber-400/20 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col items-center">

                <img src="/logo.png" alt="Tabacabeça Logo" className="w-32 sm:w-44 h-auto mb-4 shadow-lg rounded-2xl border-2 border-amber-400/50 p-1 transition-transform duration-300 hover:scale-105" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 animated-gradient-title">Tabacabeça</h1>
                <p className="text-amber-200 italic mb-6 sm:mb-8 text-sm sm:text-base">“A erva é a cura da nação 🌿🔥 – Bob Marley”</p>

                <div className="w-full flex flex-col items-center gap-4">
                    <ActionButton href="https://www.instagram.com/tabacabeca" external>Instagram</ActionButton>
                    
                    <ActionButton onClick={() => setIsTicketsModalOpen(true)}>Ingressos</ActionButton>
                    
                    <ActionButton onClick={() => setIsProgramacaoModalOpen(true)}>Programação da Semana</ActionButton>

                    <ActionButton href={GOOGLE_MAPS_URL} external>Como Chegar (Google Maps)</ActionButton>
                    <ActionButton onClick={() => setIsAboutModalOpen(true)}>Sobre Mim</ActionButton>

                    <div className="w-full p-4 rounded-lg bg-amber-200/10 bg-clip-padding backdrop-filter backdrop-blur-md border border-amber-400/30">
                      <p className="font-semibold mb-2 text-amber-100">Avalie sua experiência</p>
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
            
            <Modal isOpen={isTicketsModalOpen} onClose={() => setIsTicketsModalOpen(false)} title="Levi Ras em Ponta Grossa">
                <div className="text-center space-y-4">
                    <div>
                        <p className="font-semibold text-amber-200">Quinta, 28 de Agosto • 19:00</p>
                        <p className="text-sm text-amber-300">@ Tabacabeça Tabacaria e Headshop</p>
                    </div>
                    <p className="text-amber-300 text-sm">
                        Levi Ras, banda de Reggae paulistana com 12 anos de estrada, apresenta um show inesquecível com clássicos do Rei do Reggae e canções autorais. Tendo dividido o palco com gigantes como Jorge Ben Jor e Marcelo D2, a banda agora chega para uma noite de pura vibe positiva com a turnê:
                    </p>
                    <div className="py-4">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-black animated-gradient-text tracking-wider">MarleyLove / Vamos Viajar</h3>
                    </div>
                    <a 
                        href="https://uticket.com.br/event/01LA2F9IOIMI1E?fbclid=PARlRTSAMYbf5leHRuA2FlbQIxMQABpzOQdKhAWyjcloTwTq0BzOMF7BSUsHP2eozkLLGFj0o81PiEETQ9EtkIrlrz_aem_yHIxF0iGOelUeiQ86AepSQ" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block relative group overflow-hidden w-full bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-amber-700 !mt-6"
                    >
                        <span className="relative z-10">Garantir meu Ingresso</span>
                        <div className="absolute inset-0 bg-amber-500 transform scale-0 group-hover:scale-150 rounded-full transition-transform duration-300 ease-out"></div>
                    </a>
                </div>
            </Modal>

            <Modal isOpen={isProgramacaoModalOpen} onClose={() => setIsProgramacaoModalOpen(false)} title="Programação da Semana">
                <div className="text-center">
                    <p className="text-lg">Em construção! 🚧</p>
                    <p className="text-amber-300 mt-2">Em breve a programação completa da semana estará disponível aqui.</p>
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
            `}</style>
        </div>
    );
};

export default HomePage;