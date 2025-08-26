import React from 'react';

// This component is not in use. The e-commerce features have been removed.
const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
const useCart = () => { throw new Error('Cart feature is disabled.'); };

export { CartProvider, useCart };
