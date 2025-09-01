import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Background from './components/Background';
import HomePage from './pages/HomePage';
import Modal from './components/Modal';
import { DEV_WHATSAPP_NUMBER } from './constants';

const App: React.FC = () => {
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [isDevContactModalOpen, setIsDevContactModalOpen] = useState(false);
  const [devContactName, setDevContactName] = useState('');

  useEffect(() => {
      let timer: ReturnType<typeof setTimeout>;
      let countdownInterval: ReturnType<typeof setInterval>;

      if (isRedirectModalOpen && redirectUrl) {
          setCountdown(3);
          
          countdownInterval = setInterval(() => {
              setCountdown(prev => {
                  if (prev <= 1) {
                      clearInterval(countdownInterval);
                      return 0;
                  }
                  return prev - 1;
              });
          }, 1000);

          timer = setTimeout(() => {
              if (redirectUrl) {
                // Instead of window.open(), use window.location.href to navigate.
                // This is more reliable in mobile/in-app browsers (like Instagram's)
                // which often block pop-ups triggered after a delay (setTimeout).
                // This navigates the current tab, fulfilling the request to "change the page".
                window.location.href = redirectUrl;
              }
              // This part might not execute if navigation is successful, which is fine.
              setIsRedirectModalOpen(false);
              setRedirectUrl('');
          }, 3000);
      }

      return () => {
          clearTimeout(timer);
          clearInterval(countdownInterval);
      };
  }, [isRedirectModalOpen, redirectUrl]);

  const handleExternalLinkClick = (url: string) => {
      setRedirectUrl(url);
      setIsRedirectModalOpen(true);
  };
  
  const closeRedirectModal = () => {
      setIsRedirectModalOpen(false);
      setRedirectUrl('');
  };

  const handleDevContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const devMessage = encodeURIComponent(`Olá, meu nome é ${devContactName}. Vi o link da Tabacabeça e quero um site igual!`);
    const devWhatsAppLink = `https://wa.me/${DEV_WHATSAPP_NUMBER}?text=${devMessage}`;
    
    setIsDevContactModalOpen(false);
    setDevContactName(''); // Reset name field
    handleExternalLinkClick(devWhatsAppLink);
  };

  return (
    <HashRouter>
      <div className="min-h-screen font-sans antialiased relative isolate text-[#422B0D]">
        <Background />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-16 sm:pt-20">
            <Routes>
              <Route path="/" element={<HomePage onExternalClick={handleExternalLinkClick} />} />
            </Routes>
          </main>
          <Footer onExternalClick={handleExternalLinkClick} onDevContactClick={() => setIsDevContactModalOpen(true)} />
        </div>
        <Modal isOpen={isRedirectModalOpen} onClose={closeRedirectModal} title="Aviso">
            <div className="text-center">
                <p className="text-lg mb-4">Você está sendo redirecionado para um site externo.</p>
                <p className="text-base text-amber-300 mb-2">Aguarde...</p>
                <div className="text-5xl font-bold text-amber-400 animate-pulse">{countdown}</div>
            </div>
        </Modal>

        <Modal isOpen={isDevContactModalOpen} onClose={() => setIsDevContactModalOpen(false)} title="Fale com o Desenvolvedor">
            <form onSubmit={handleDevContactSubmit} className="space-y-4">
                <div>
                    <label htmlFor="dev-name" className="block text-sm font-medium text-left mb-1">Seu nome:</label>
                    <input 
                        type="text" 
                        name="name"
                        id="dev-name" 
                        value={devContactName}
                        onChange={(e) => setDevContactName(e.target.value)}
                        required
                        placeholder="Como podemos te chamar?"
                        className="w-full bg-[#422B0D]/50 border border-amber-500/50 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500 text-amber-100 placeholder:text-amber-300/60" 
                    />
                </div>
                <button type="submit" className="relative group overflow-hidden w-full bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-amber-700">
                    <span className="relative z-10">Enviar e ir para WhatsApp 🚀</span>
                    <div className="absolute inset-0 bg-amber-500 transform scale-0 group-hover:scale-150 rounded-full transition-transform duration-300 ease-out"></div>
                </button>
            </form>
        </Modal>

      </div>
    </HashRouter>
  );
};

export default App;