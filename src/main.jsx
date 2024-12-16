import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import('./mocks/server').then(({ worker }) => {
  worker.start({
    onUnhandledRequest: 'bypass',
    quiet: true
  }).then(() => {
    console.log('[MSW] Mock Service Worker started');
    const root = createRoot(document.getElementById('root'));
    root.render(
        <App />
    );
  });
});