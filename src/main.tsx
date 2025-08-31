import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Layout from './layout'
import {HashRouter} from "react-router-dom";
import { Buffer } from "buffer";
import { ThemeProvider } from './contexts/ThemeContext';
(window as Window & { Buffer?: typeof Buffer }).Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Layout/>
      </HashRouter>
    </ThemeProvider>
  </StrictMode>,
)
