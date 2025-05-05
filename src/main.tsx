import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/colors.css'
import './styles/mobile-fixes.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
