import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Layout from './layout'
import {HashRouter} from "react-router-dom";
import '@ant-design/v5-patch-for-react-19';
import { Buffer } from "buffer";
(window as any).Buffer = Buffer;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Layout/>
    </HashRouter>
  </StrictMode>,
)
