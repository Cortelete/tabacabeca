
import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL, FORM_SUBMIT_EMAIL } from '../constants';

const ActionButton: React.FC<{ href?: string; to?: string; onClick?: () => void; children: React.ReactNode; external?: boolean; disabled?: boolean; onExternalClick?: (url:string) => void; special?: boolean }> = ({ href, to, onClick, children, external = false, disabled = false, onExternalClick, special = false }) => {
    const classes = `
        relative w-full text-center font-semibold py-2 px-4 sm:py-2.5 sm:px-6 rounded-lg transition-all duration-500
        bg-amber-200/10 bg-clip-padding backdrop-filter backdrop-blur-md border
        text-sm sm:text-base
        hover:border-amber-400/70
        overflow-hidden group
        ${special 
            ? 'animate-pulse-glow border-amber-300 text-amber-50' 
            : 'border-amber-400/30 text-amber-100'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `;

    const content = (
        <>
            <span className="relative z-10 transition-colors duration-500 group-hover:text-[#422B0D]">{children}</span>
            <div className="absolute inset-0 bg-amber-400 transform scale-0 group-hover:scale-150 rounded-full transition-transform duration-500 ease-in-out"></div>
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
        // Link component from react-router-dom is not used in this scenario, so it's removed for cleanup.
        // A standard anchor tag would navigate within the HashRouter.
        return <a href={`#${to}`} className={classes}>{content}</a>;
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

const quotes = [
    'A erva é a cura da nação 🌿🔥 – Bob Marley',
    'Onde não há amor, não há verdade. – Mahatma Gandhi',
    'Amai-vos uns aos outros, como eu vos amei. – João 13:34',
    'A paz vem de dentro. Não a procure à sua volta. – Buda',
    'A vida é o que acontece enquanto você está ocupado fazendo outros planos. – John Lennon',
    'Tudo o que você precisa é amor. – The Beatles',
    'Seja a mudança que você quer ver no mundo. – Mahatma Gandhi',
    'O sol é para todos, mas a sombra é para poucos.',
    'Não se preocupe com nada, porque tudo vai ficar bem. – Bob Marley',
    'O amor é a força mais sutil do mundo. – Mahatma Gandhi',
    'A felicidade não é algo pronto. Ela vem de suas próprias ações. – Dalai Lama',
    'O fraco nunca pode perdoar. O perdão é um atributo dos fortes. – Mahatma Gandhi',
    'Tudo posso naquele que me fortalece. – Filipenses 4:13',
    'A imaginação é mais importante que o conhecimento. – Albert Einstein',
    'A única maneira de fazer um excelente trabalho é amar o que você faz. – Steve Jobs',
    'A persistência é o caminho do êxito. – Charles Chaplin',
    'Acredite em si mesmo e tudo será possível.',
    'A música pode mudar o mundo. – Ludwig van Beethoven',
    'A liberdade de ser você mesmo é a maior das conquistas.',
    'Viva, ame, queime, floresça.',
    'A vida é uma viagem, aproveite a paisagem.',
    'Paz, amor e um baseado pra relaxar.',
    'Plante o bem, que o resto vem.',
];

const programacaoData: any[] = [];


const HomePage: React.FC<HomePageProps> = ({ onExternalClick }) => {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isProgramacaoModalOpen, setIsProgramacaoModalOpen] = useState(false);
    const [openWeekIndex, setOpenWeekIndex] = useState<number | null>(0);
    const [isHorarioModalOpen, setIsHorarioModalOpen] = useState(false);
    const [isComoChegarModalOpen, setIsComoChegarModalOpen] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isQuoteVisible, setIsQuoteVisible] = useState(true);
    const [isNextEventModalOpen, setIsNextEventModalOpen] = useState(false);

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of the day for accurate comparison
    const eventYear = 2025; // Use 2025 to align with other hardcoded dates
    const OCTOBER = 9; // Month is 0-indexed, so 9 is October.

     useEffect(() => {
        const quoteInterval = setInterval(() => {
            setIsQuoteVisible(false); // Start fade out
            setTimeout(() => {
                setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
                setIsQuoteVisible(true); // Start fade in
            }, 700); // Should match the fade out duration
        }, 7000); // Change quote every 7 seconds

        return () => clearInterval(quoteInterval);
    }, []);

    const handleLogoSpin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 1000);
    };

    const handleRating = (rate: number) => {
      if (rate === 5) {
        onExternalClick(GOOGLE_REVIEW_URL);
      } else if (rate > 0) {
        setIsFeedbackModalOpen(true);
      }
    };
    
    return (
        <div className="container mx-auto px-4 flex flex-col justify-center items-center text-center h-full py-2 sm:py-4">
            <div className="relative w-full max-w-sm bg-[#422B0D]/80 text-amber-100 backdrop-blur-lg border border-amber-400/20 rounded-2xl p-3 sm:p-5 shadow-2xl flex flex-col items-center">
                <img
                    src="/outubrorosa.png"
                    alt="Outubro Rosa"
                    title="Outubro Rosa - Mês de conscientização sobre o câncer de mama"
                    className="absolute top-2 left-2 w-8 h-8 sm:w-10 sm:h-10"
                />
                <div className="w-24 h-24 sm:w-32 sm:h-32 mb-2" style={{ perspective: '1000px' }}>
                    <img 
                        src="/logo.png" 
                        alt="Tabacabeça Logo" 
                        title="Clique para girar!"
                        className={`w-full h-full cursor-pointer transition-transform duration-1000 drop-shadow-[0_5px_15px_rgba(251,191,36,0.3)] hover:drop-shadow-[0_5px_20px_rgba(251,191,36,0.5)] ${isSpinning ? 'animate-coin-spin' : ''}`}
                        style={{ transformStyle: 'preserve-3d' }}
                        onClick={handleLogoSpin}
                    />
                </div>
                <h1 className="text-xl sm:text-3xl font-bold mb-1 animated-gradient-title">Tabacabeça</h1>
                <p className={`text-amber-200 italic mb-3 sm:mb-4 text-xs sm:text-sm transition-opacity duration-700 min-h-[28px] sm:min-h-[32px] flex items-center justify-center ${isQuoteVisible ? 'opacity-100' : 'opacity-0'}`}>
                    “{quotes[currentQuoteIndex]}”
                </p>

                <div className="w-full flex flex-col items-center gap-2 sm:gap-3">
                    <ActionButton onClick={() => setIsNextEventModalOpen(true)}>
                        PRÓXIMO EVENTO EM BREVE
                    </ActionButton>
                    <ActionButton href="https://www.instagram.com/tabacabeca" external onExternalClick={onExternalClick}>Instagram</ActionButton>
                                        
                    <ActionButton onClick={() => setIsProgramacaoModalOpen(true)}>Programação</ActionButton>

                    <ActionButton onClick={() => setIsComoChegarModalOpen(true)}>Como Chegar</ActionButton>
                    
                    <ActionButton onClick={() => setIsHorarioModalOpen(true)}>Horário de Funcionamento</ActionButton>
                    
                    <ActionButton onClick={() => setIsAboutModalOpen(true)}>Sobre Nós</ActionButton>

                    <div className="w-full p-2 rounded-lg bg-amber-200/10 bg-clip-padding backdrop-filter backdrop-blur-md border border-amber-400/30 mt-1">
                      <p className="font-semibold mb-1 text-amber-100 text-sm">Avalie sua experiência</p>
                      <StarRating onRate={handleRating} />
                    </div>
                </div>
            </div>
            
            <Modal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} title="Nossa História">
                <div className="text-left space-y-4 text-white max-h-[70vh] overflow-y-auto pr-2 about-us-scrollbar">
                    <p className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        A Tabacabeça nasceu em <strong>2021</strong>, a partir da ideia de criar uma tabacaria com um conceito novo, moderno e conectado com as pautas da <strong>redução de danos</strong>.
                    </p>
                    <p className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                        O que começou como um comércio online de sedas e dichavadores, logo se transformou em um <strong>ponto de encontro</strong> para artistas, músicos e pensadores da cidade.
                    </p>
                    <div className="animate-fade-in-up border-l-4 border-amber-500 pl-4 py-2 my-2 bg-amber-900/20 rounded-r-md" style={{ animationDelay: '0.5s' }}>
                        <p className="italic text-white">A música nos guiou para outra direção e, ao promover eventos na nossa pequena mas aconchegante lojinha, conseguimos conectar o público com a <strong>arte</strong>, a <strong>criatividade</strong> e o <strong>debate consciente</strong>.</p>
                    </div>
                    <p className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
                        Hoje, praticamente quatro anos depois, já compartilhamos nossa trajetória com <strong>artistas renomados</strong>, produtores locais e <strong>novos talentos</strong> que encontraram aqui, oportunidade.
                    </p>
                     <div className="animate-fade-in-up text-center bg-amber-400/80 p-3 rounded-md !mt-6" style={{ animationDelay: '0.9s' }}>
                        <p className="font-bold text-base text-[#422B0D]">Deixamos nosso muito obrigado a todos que estiveram conosco nesse período, e a todos que ainda estão por nos conhecer. ❤️</p>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isNextEventModalOpen} onClose={() => setIsNextEventModalOpen(false)} title="Próximo Evento">
                <div className="text-center space-y-4 text-amber-100">
                    <p>Aguarde! Em breve atualizaremos a página com nosso próximo evento.</p>
                    <p className="text-2xl">🎉</p>
                </div>
            </Modal>


             <Modal isOpen={isComoChegarModalOpen} onClose={() => setIsComoChegarModalOpen(false)} title="Como Chegar">
                <div className="text-center space-y-4">
                    <div>
                        <h3 className="text-xl font-bold text-amber-100 mb-1">Nosso Endereço</h3>
                        <p className="text-lg text-amber-200">Rua Julio de Castilho, 755 – Centro.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-amber-100 mb-1">Dica de Localização</h3>
                        <p className="text-amber-300">
                           Ficamos bem no coração do centro. Procure pelo lugar mais legal e pela melhor música. Não tem erro!
                        </p>
                    </div>
                    <button 
                        onClick={() => {
                            setIsComoChegarModalOpen(false);
                            onExternalClick(GOOGLE_MAPS_URL);
                        }}
                        className="inline-block relative group overflow-hidden w-full bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-500 hover:bg-amber-700 !mt-6"
                    >
                        <span className="relative z-10">Ver Rota no Google Maps 🗺️</span>
                        <div className="absolute inset-0 bg-amber-500 transform scale-0 group-hover:scale-150 rounded-full transition-transform duration-500 ease-in-out"></div>
                    </button>
                </div>
            </Modal>
            
            <Modal isOpen={isProgramacaoModalOpen} onClose={() => setIsProgramacaoModalOpen(false)} title="Programação">
                 <div className="text-left space-y-4 text-sm text-amber-100 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="text-center py-4 border-b border-amber-400/20">
                        <h3 className="font-black text-sm text-[#422B0D] tracking-wider bg-amber-400/80 p-1.5 rounded-md mb-3 inline-block">AGENDA DE EVENTOS</h3>
                        <p className="text-lg text-amber-200">Atualização em breve...</p>
                        <p className="mt-1 text-amber-300 text-xs">Fique de olho em nosso Instagram para não perder nada!</p>
                    </div>

                    <div className="text-center bg-amber-900/30 p-3 rounded-md border border-amber-500/30">
                        <h4 className="font-black text-base text-amber-200 tracking-wider mb-2 uppercase">Eventos Fixos</h4>
                        <div className="space-y-1 text-amber-300">
                            <p> <span className="font-semibold text-amber-200">Toda Quarta:</span> Fumaça de Quintal 🔥</p>
                            <p> <span className="font-semibold text-amber-200">Toda Quinta:</span> Open Decks 🎛️</p>
                        </div>
                    </div>
                    
                    <div className="text-center bg-amber-400/80 p-2 rounded-md">
                        <p className="font-black text-sm text-[#422B0D]">COZINHA ABERTA DE QUINTA A DOMINGO.</p>
                        <p className="font-bold text-xs text-[#422B0D]">DAS 19:00 ÀS 23:00</p>
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isHorarioModalOpen} onClose={() => setIsHorarioModalOpen(false)} title="Horário de Funcionamento">
                <div className="text-center space-y-6 text-amber-100">
                    <div className="bg-amber-900/30 p-4 rounded-lg border border-amber-500/30">
                        <h3 className="font-black text-base text-amber-200 tracking-wider mb-2 uppercase">TABACARIA/HEADSHOP E TABAS BAR</h3>
                        <p className="text-amber-300 font-semibold mb-3">QUARTA À DOMINGO</p>
                        <div className="flex items-baseline justify-center gap-2 text-3xl sm:text-4xl font-bold">
                            <span className="text-white">4:20PM</span>
                            <span className="text-amber-400 text-lg mx-2">→</span>
                            <span className="text-white">11PM</span>
                        </div>
                    </div>

                    <div className="bg-amber-900/30 p-4 rounded-lg border border-amber-500/30">
                        <h3 className="font-black text-base text-amber-200 tracking-wider mb-2 uppercase">LARICA</h3>
                        <p className="text-amber-300 font-semibold mb-3">QUINTA À DOMINGO</p>
                        <div className="flex items-baseline justify-center gap-2 text-3xl sm:text-4xl font-bold">
                            <span className="text-white">7PM</span>
                            <span className="text-amber-400 text-lg mx-2">→</span>
                            <span className="text-white">11PM</span>
                        </div>
                    </div>
                    <p className="text-xs italic text-amber-300 pt-2">*as vezes fechamos mais tarde, as vezes mais cedo. usem piteira.</p>
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
                     <button type="submit" className="relative group overflow-hidden w-full bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-500 hover:bg-amber-700">
                        <span className="relative z-10">Enviar Feedback</span>
                        <div className="absolute inset-0 bg-amber-500 transform scale-0 group-hover:scale-150 rounded-full transition-transform duration-500 ease-in-out"></div>
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
            @keyframes coin-spin {
              from {
                transform: rotateY(0deg);
              }
              to {
                transform: rotateY(360deg);
              }
            }
            .animate-coin-spin {
              animation: coin-spin 1s ease-out;
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
            .animate-fade-in-up {
                animation: fadeInUp 0.6s ease-out forwards;
                opacity: 0;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .about-us-scrollbar::-webkit-scrollbar {
                width: 6px;
            }
            .about-us-scrollbar::-webkit-scrollbar-track {
                background: transparent;
            }
            .about-us-scrollbar::-webkit-scrollbar-thumb {
                background: #f59e0b; /* amber-500 */
                border-radius: 3px;
            }
            .about-us-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #fbbf24; /* amber-400 */
            }
            .about-us-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #f59e0b transparent; /* thumb and track */
            }
            @keyframes pulse-glow {
              0%, 100% {
                box-shadow: 0 0 3px #fcd34d, 0 0 6px #fcd34d;
                transform: scale(1);
              }
              50% {
                box-shadow: 0 0 8px #fcd34d, 0 0 15px #fcd34d;
                transform: scale(1.02);
              }
            }
            .animate-pulse-glow {
              animation: pulse-glow 2.5s infinite ease-in-out;
            }
            `}</style>
        </div>
    );
};

export default HomePage;
