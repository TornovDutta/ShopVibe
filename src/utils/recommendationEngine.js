import products from '../data/products'

const COMPLEMENTARY_CATEGORIES = {
  Clothing: ['Accessories', 'Footwear', 'Bags'],
  Footwear: ['Accessories', 'Bags', 'Clothing'],
  Accessories: ['Clothing', 'Bags', 'Footwear'],
  Bags: ['Accessories', 'Clothing', 'Footwear'],
  Electronics: ['Electronics', 'Accessories'],
}

function buildCategoryAffinity(viewedProducts, cartItems) {
  const affinity = {}

  viewedProducts.forEach((product, index) => {
    const recencyWeight = 1 + (index / viewedProducts.length) * 0.5
    affinity[product.category] = (affinity[product.category] || 0) + recencyWeight
  })

  cartItems.forEach((item) => {
    affinity[item.category] = (affinity[item.category] || 0) + 3 * item.quantity
  })

  return affinity
}

function getAveragePriceRange(viewedProducts, cartItems) {
  const prices = [
    ...viewedProducts.map((p) => p.price),
    ...cartItems.map((item) => item.price),
  ]
  if (prices.length === 0) return { min: 0, max: Infinity, avg: 100 }
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length
  const min = Math.min(...prices) * 0.5
  const max = Math.max(...prices) * 1.5
  return { min, max, avg }
}

function scoreProduct(product, categoryAffinity, priceRange, excludeIds) {
  if (excludeIds.has(product.id)) return -1

  let score = 0

  const directAffinity = categoryAffinity[product.category] || 0
  score += directAffinity * 10

  const complements = COMPLEMENTARY_CATEGORIES[product.category] || []
  complements.forEach((cat) => {
    score += (categoryAffinity[cat] || 0) * 4
  })

  if (priceRange.avg > 0) {
    const priceDiff = Math.abs(product.price - priceRange.avg) / priceRange.avg
    score += Math.max(0, 5 - priceDiff * 5)
  }

  score += product.rating * 2

  score += Math.min(product.reviews / 100, 3)

  if (product.originalPrice) {
    const discount = (1 - product.price / product.originalPrice) * 100
    score += discount * 0.1
  }

  score += Math.random() * 2

  return score
}

export function getPersonalizedRecommendations(viewHistory, cartItems, count = 4, excludeIds = []) {
  const viewedProducts = viewHistory
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  const categoryAffinity = buildCategoryAffinity(viewedProducts, cartItems)
  const priceRange = getAveragePriceRange(viewedProducts, cartItems)
  const excluded = new Set(excludeIds)

  const scored = products
    .map((product) => ({
      product,
      score: scoreProduct(product, categoryAffinity, priceRange, excluded),
    }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, count).map((item) => item.product)
}

export function getSmartRelated(productId, viewHistory, cartItems, count = 4) {
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  const viewedProducts = viewHistory
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  const categoryAffinity = buildCategoryAffinity(viewedProducts, cartItems)
  categoryAffinity[product.category] = (categoryAffinity[product.category] || 0) + 5

  const priceRange = getAveragePriceRange([product, ...viewedProducts], cartItems)
  const excluded = new Set([productId])

  const scored = products
    .map((p) => ({
      product: p,
      score: scoreProduct(p, categoryAffinity, priceRange, excluded),
    }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, count).map((item) => item.product)
}

export function getCartRecommendations(cartItems, viewHistory, count = 4) {
  if (cartItems.length === 0) return []

  const cartIds = cartItems.map((item) => item.id)
  const viewedProducts = viewHistory
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)

  const categoryAffinity = buildCategoryAffinity(viewedProducts, cartItems)

  const cartCategories = new Set(cartItems.map((item) => item.category))
  const complementaryBoost = {}
  cartCategories.forEach((cat) => {
    const complements = COMPLEMENTARY_CATEGORIES[cat] || []
    complements.forEach((c) => {
      if (!cartCategories.has(c)) {
        complementaryBoost[c] = (complementaryBoost[c] || 0) + 8
      }
    })
  })

  Object.entries(complementaryBoost).forEach(([cat, boost]) => {
    categoryAffinity[cat] = (categoryAffinity[cat] || 0) + boost
  })

  const priceRange = getAveragePriceRange(viewedProducts, cartItems)
  const excluded = new Set(cartIds)

  const scored = products
    .map((p) => ({
      product: p,
      score: scoreProduct(p, categoryAffinity, priceRange, excluded),
    }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, count).map((item) => item.product)
}

export function getTrendingProducts(count = 4, excludeIds = []) {
  const excluded = new Set(excludeIds)
  return products
    .filter((p) => !excluded.has(p.id))
    .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
    .slice(0, count)
}
