// Importing necessary libraries and components
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { UIProvider } from './contexts/UIContext.jsx';
import './index.css';

// Rendering the root component of the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Enables routing in the application */}
      <UIProvider> {/* Provides UI context to the application */}
        <App /> {/* Main application component */}
      </UIProvider>
    </BrowserRouter>
  </StrictMode>,
);
