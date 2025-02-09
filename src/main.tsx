import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SettingsProvider } from './context/SettingsContext.tsx';
import { GlobalStyle } from './components/GlobalStyles.tsx';
import { defaultTheme } from './theme/defaultTheme';

createRoot(document.getElementById('root')!).render(
  <SettingsProvider>
    <StrictMode>
      <GlobalStyle theme={defaultTheme} />
      <App />
    </StrictMode>
  </SettingsProvider>
);
