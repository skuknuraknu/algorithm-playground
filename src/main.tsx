import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './i18n';
import { ThemeProvider } from './theme';
import { ProgressProvider } from './progress';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ProgressProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ProgressProvider>
    </ThemeProvider>
  </StrictMode>
);

