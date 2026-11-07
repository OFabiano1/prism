import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../src/styles.css';
import './catalog.css';
import { App } from './App';

const host = document.getElementById('root');
if (!host) throw new Error('Elemento #root ausente.');

createRoot(host).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
