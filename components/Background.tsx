import React from 'react';

const Background: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 h-full w-full">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-700 animate-[gradient_15s_ease_infinite] bg-[200%_200%]"></div>
            <style>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `}</style>
        </div>
    );
};

export default Background;