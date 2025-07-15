import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'
import { CartProvider } from './context/CartContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
    </CartProvider>
  </StrictMode>,
)
