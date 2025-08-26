import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="w-full px-4 py-3 bg-[#422B0D]/50 bg-clip-padding backdrop-filter backdrop-blur-xl border-b border-amber-600/40">
        <div className="flex justify-center items-center">
          <Link to="/" className="text-2xl font-bold">
             <h1 className="animated-gradient-text">Tabacabeça</h1>
          </Link>
        </div>
      </nav>
      <style>{`
        .animated-gradient-text {
          background-image: linear-gradient(90deg, #92400e, #d97706, #92400e);
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
            opacity: 1;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.95;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;