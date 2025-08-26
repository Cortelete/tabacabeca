import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#422B0D]/80 text-amber-100 backdrop-blur-lg rounded-xl shadow-lg p-6 m-4 w-full max-w-md relative border border-amber-400/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl sm:text-2xl font-bold animated-gradient-text">{title}</h2>}
          <button onClick={onClose} className="text-amber-300 hover:text-amber-100 transition-colors text-3xl leading-none">&times;</button>
        </div>
        <div>{children}</div>
      </div>
       <style>{`
        .animated-gradient-text {
          background-image: linear-gradient(90deg, #f59e0b, #fed7aa, #f59e0b);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: gradient-text-flow 5s linear infinite;
        }
        @keyframes gradient-text-flow {
          to {
            background-position: -200% center;
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;