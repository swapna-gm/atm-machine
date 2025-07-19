import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ATMAppProvider } from './context/ATMAppContext';
import App from './app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ATMAppProvider>
      <App />
    </ATMAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);