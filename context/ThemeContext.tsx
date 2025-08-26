import React from 'react';

// This component is not in use. The app now has a single unified theme.
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
const useTheme = () => { throw new Error('Theme feature is disabled.'); };

export { ThemeProvider, useTheme };
