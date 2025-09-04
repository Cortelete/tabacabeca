import React, { useState, useEffect } from 'react';
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

const programacaoData = [
  {
    title: 'Semana 1: 02/09 - 08/09',
    events: [
      { day: 'SEX. 05', name: 'DJ NUNO, SID & IGÃO', price: 'GRÁTIS', priceClass: 'animated-gradient-price-free', icon: '🎉' },
      { day: 'SÁB. 06', name: 'SAMBAZOOKA', price: 'R$10', priceClass: 'animated-gradient-price-paid', icon: '🎟️', ticket: true },
      { day: 'DOM. 07', name: 'P4 SESH #05: POCKET FORMIGA JUCA', price: 'GRÁTIS', priceClass: 'animated-gradient-price-free', icon: '🎉' },
    ]
  },
  {
    title: 'Semana 2: 09/09 - 15/09',
    events: [
      { day: 'SEX. 12', name: 'DON CARLO', price: 'GRÁTIS', priceClass: 'animated-gradient-price-free', icon: '🎉' },
      { day: 'SÁB. 13', name: 'CAIXA PRETA', price: 'GRÁTIS', priceClass: 'animated-gradient-price-free', icon: '🎉' },
    ]
  },
  {
    title: 'Semana 3: 16/09 - 22/09',
    events: [
      { day: 'SEX. 19', name: 'ROCK DE PONTA', price: 'GRÁTIS', priceClass: 'animated-gradient-price-free', icon: '🎉' },
      { day: 'SÁB. 20', name: 'AFROHIGH', price: 'GRÁTIS', priceClass: 'animated-gradient-price-free', icon: '🎉' },
      { day: 'DOM. 21', name: 'MATULA ROOTS + CASTANHEIRA', price: 'GRÁTIS', priceClass: 'animated-gradient-price-free', icon: '🎉' },
    ]
  },
    {
    title: 'Semana 4: 23/09 - 29/09',
    events: [
      { day: 'SEX. 26', name: 'DJ NUNO, SID & IGÃO', price: 'GRÁTIS', priceClass: 'animated-gradient-price-free', icon: '🎉' },
      { day: 'SÁB. 27', name: 'STANLEY', price: 'GRÁTIS', priceClass: 'animated-gradient-price-free', icon: '🎉' },
      { day: 'DOM. 28', name: 'DIA DE FEIRA COM BFACE + RESIDENTES', price: 'GRÁTIS', priceClass: 'animated-gradient-price-free', icon: '🎉' },
    ]
  }
];


const HomePage: React.FC<HomePageProps> = ({ onExternalClick }) => {
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);
    const [isProgramacaoModalOpen, setIsProgramacaoModalOpen] = useState(false);
    const [openWeekIndex, setOpenWeekIndex] = useState<number | null>(0);
    const [isHorarioModalOpen, setIsHorarioModalOpen] = useState(false);
    const [isComoChegarModalOpen, setIsComoChegarModalOpen] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isQuoteVisible, setIsQuoteVisible] = useState(true);

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
    
    const ticketsUrl = "https://pixta.me/u/sambazooka-1a-edicao-do-retorno";

    return (
        <div className="container mx-auto px-4 flex flex-col justify-center items-center text-center h-full py-2 sm:py-4">
            <div className="w-full max-w-sm bg-[#422B0D]/80 text-amber-100 backdrop-blur-lg border border-amber-400/20 rounded-2xl p-3 sm:p-5 shadow-2xl flex flex-col items-center">

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
                    <ActionButton href="https://www.instagram.com/tabacabeca" external onExternalClick={onExternalClick}>Instagram</ActionButton>
                    
                    <ActionButton onClick={() => setIsTicketsModalOpen(true)}>Ingressos</ActionButton>
                    
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
            
            <Modal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} title="Sobre Nós">
                <div className="text-center space-y-4 text-amber-200">
                    <p className="text-lg">
                        Tabacabeça nasceu de um sonho compartilhado entre dois amigos de infância.
                    </p>
                    <blockquote className="border-l-4 border-amber-500 pl-4 py-2 my-2 text-left bg-amber-900/20 rounded-r-md">
                        <p className="italic text-amber-100">Cansados da mesmice, eles decidiram criar um refúgio na cidade natal: um lugar onde a boa música, drinks de primeira e uma vibe relaxante se encontram.</p>
                    </blockquote>
                    <p className="font-semibold text-amber-100 pt-2">
                        Mais que um bar, é a nossa casa. Um ponto de encontro para gente suave que aprecia a cultura e a amizade.
                    </p>
                    
                    <div className="pt-4 flex flex-col items-center gap-2">
                         <p className="text-lg font-bold text-amber-100">
                            Seja bem-vindo à família Tabacabeça! ✨
                        </p>
                        <div className="w-24 h-24" style={{ perspective: '1000px' }}>
                            <img 
                                src="/logo.png" 
                                alt="Tabacabeça Logo Coin" 
                                title="Clique para girar!"
                                className={`w-full h-full cursor-pointer transition-transform duration-1000 drop-shadow-[0_5px_15px_rgba(251,191,36,0.3)] hover:drop-shadow-[0_5px_20px_rgba(251,191,36,0.5)] ${isSpinning ? 'animate-coin-spin' : ''}`}
                                style={{ transformStyle: 'preserve-3d' }}
                                onClick={handleLogoSpin}
                            />
                        </div>
                    </div>
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
                        className="inline-block relative group overflow-hidden w-full bg-amber-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 hover:bg-amber-700 !mt-6"
                    >
                        <span className="relative z-10">Ver Rota no Google Maps 🗺️</span>
                        <div className="absolute inset-0 bg-amber-500 transform scale-0 group-hover:scale-150 rounded-full transition-transform duration-300 ease-out"></div>
                    </button>
                </div>
            </Modal>
            
            <Modal isOpen={isTicketsModalOpen} onClose={() => setIsTicketsModalOpen(false)} title="SAMBAZOOKA!">
                <div className="text-center space-y-4">
                    <div>
                        <p className="font-semibold text-amber-200">Sábado • 16:20</p>
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
                 <div className="text-left space-y-3 text-sm text-amber-100 max-h-[70vh] overflow-y-auto pr-2">
                    <div className="text-center bg-amber-400/80 p-1.5 rounded-md mb-3">
                        <h3 className="font-black text-sm text-[#422B0D] tracking-wider">AGENDA SETEMBRO</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="border-b border-amber-400/20 pb-2">
                          <div className="flex justify-between items-center mb-1">
                              <h4 className="text-base font-bold text-amber-200 tracking-wide">TODA QUARTA</h4>
                              <span className="font-bold animated-gradient-price-free ml-2 text-xs shrink-0">🎉 ENTRADA GRÁTIS</span>
                          </div>
                          <p className="text-amber-200 leading-snug"><strong className="text-amber-100">FUMACA DE QUINTAL</strong></p>
                      </div>

                      <div className="border-b border-amber-400/20 pb-2">
                          <div className="flex justify-between items-center mb-1">
                              <h4 className="text-base font-bold text-amber-200 tracking-wide">TODA QUINTA</h4>
                              <span className="font-bold animated-gradient-price-free ml-2 text-xs shrink-0">🎉 ENTRADA GRÁTIS</span>
                          </div>
                          <p className="text-amber-200 leading-snug"><strong className="text-amber-100">OPEN DECKS</strong></p>
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      {programacaoData.map((week, index) => (
                        <div key={index} className="border-b border-amber-400/20 last:border-b-0">
                          <button 
                            onClick={() => setOpenWeekIndex(index === openWeekIndex ? null : index)}
                            className="w-full flex justify-between items-center text-left py-2 font-bold text-amber-200 hover:text-amber-100 transition-colors"
                          >
                            <span>{week.title}</span>
                             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${openWeekIndex === index ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openWeekIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                            <div className="pt-1 pb-3 pl-2 space-y-3">
                              {week.events.map((event, eventIndex) => (
                                <div key={eventIndex}>
                                  <div className="flex justify-between items-center mb-1 flex-wrap gap-x-2">
                                      <h4 className="text-base font-bold text-amber-200 tracking-wide">{event.day}</h4>
                                      <span className={`font-bold ${event.priceClass} ml-2 text-xs shrink-0`}>{event.icon} {event.price}</span>
                                  </div>
                                  <p className="text-amber-200 leading-snug">
                                      <strong className="text-amber-100">{event.name}</strong>
                                      {event.ticket && (
                                          <button onClick={() => { setIsProgramacaoModalOpen(false); setIsTicketsModalOpen(true); }} className="ml-1 font-bold text-amber-300 underline hover:text-amber-100 transition-colors bg-transparent border-none p-0 cursor-pointer">Compre aqui!</button>
                                      )}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center bg-amber-400/80 p-2 rounded-md !mt-4">
                        <p className="font-black text-sm text-[#422B0D]">COZINHA ABERTA DE QUINTA A SÁBADO.</p>
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
            `}</style>
        </div>
    );
};

export default HomePage;
