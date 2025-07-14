import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TagManager from 'react-gtm-module'
import { GTM_ID } from "./utils/CONSTS.ts";

const tagManagerArgs = {
  gtmId: GTM_ID,
};

TagManager.initialize(tagManagerArgs);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
