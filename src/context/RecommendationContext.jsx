import { createContext, useContext, useState, useCallback } from 'react'
import { useCart } from './CartContext'
import {
  getPersonalizedRecommendations,
  getSmartRelated,
  getCartRecommendations,
  getTrendingProducts,
} from '../utils/recommendationEngine'

const RecommendationContext = createContext()

const HISTORY_KEY = 'shopvibe_view_history'
const MAX_HISTORY = 50

function getStoredHistory() {
  const data = localStorage.getItem(HISTORY_KEY)
  return data ? JSON.parse(data) : []
}

function storeHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)))
}

export function RecommendationProvider({ children }) {
  const [viewHistory, setViewHistory] = useState(() => getStoredHistory())
  const { cartItems } = useCart()

  const trackView = useCallback((productId) => {
    setViewHistory((prev) => {
      const filtered = prev.filter((id) => id !== productId)
      const updated = [...filtered, productId]
      storeHistory(updated)
      return updated
    })
  }, [])

  const getRecommendations = useCallback(
    (count = 4, excludeIds = []) => {
      if (viewHistory.length === 0 && cartItems.length === 0) {
        return getTrendingProducts(count, excludeIds)
      }
      return getPersonalizedRecommendations(viewHistory, cartItems, count, excludeIds)
    },
    [viewHistory, cartItems]
  )

  const getRelated = useCallback(
    (productId, count = 4) => {
      return getSmartRelated(productId, viewHistory, cartItems, count)
    },
    [viewHistory, cartItems]
  )

  const getForCart = useCallback(
    (count = 4) => {
      return getCartRecommendations(cartItems, viewHistory, count)
    },
    [cartItems, viewHistory]
  )

  return (
    <RecommendationContext.Provider
      value={{
        viewHistory,
        trackView,
        getRecommendations,
        getRelated,
        getForCart,
      }}
    >
      {children}
    </RecommendationContext.Provider>
  )
}

export function useRecommendations() {
  const context = useContext(RecommendationContext)
  if (!context) {
    throw new Error('useRecommendations must be used within a RecommendationProvider')
  }
  return context
}
