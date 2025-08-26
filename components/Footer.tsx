import React from 'react';

interface FooterProps {
  onExternalClick: (url: string) => void;
  onDevContactClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onExternalClick, onDevContactClick }) => {
  const instagramLink = "https://www.instagram.com/inteligenciarte.ia";

  return (
    <footer className="w-full py-4 sm:py-6 px-4 mt-8 sm:mt-12 text-center text-[#422B0D]">
      <div className="container mx-auto">
        <button
          onClick={onDevContactClick}
          className="inline-block bg-amber-600 text-white font-bold py-3 px-6 rounded-lg mb-4 transition-transform duration-300 hover:scale-105 hover-glow"
        >
          Quer um site incrível como esse? Fale comigo 🚀
        </button>
        <p className="text-sm">
          Desenvolvido por{' '}
          <a
            href={instagramLink}
            onClick={(e) => { e.preventDefault(); onExternalClick(instagramLink); }}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold animated-gradient-text-footer"
          >
            InteligenciArte.IA ✨
          </a>
        </p>
      </div>
      <style>{`
        .hover-glow {
            box-shadow: 0 0 5px #d97706, 0 0 10px #d97706, 0 0 15px #d97706;
            transition: box-shadow 0.3s ease-in-out;
        }
        .hover-glow:hover {
            box-shadow: 0 0 10px #d97706, 0 0 20px #d97706, 0 0 30px #d97706;
        }
        .animated-gradient-text-footer {
          background-image: linear-gradient(90deg, #92400e, #d97706, #92400e);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: gradient-text-flow-footer 5s linear infinite;
        }
        @keyframes gradient-text-flow-footer {
          to {
            background-position: -200% center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;