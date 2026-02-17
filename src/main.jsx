import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { RecommendationProvider } from './context/RecommendationContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RecommendationProvider>
          <App />
        </RecommendationProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
