import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const renderCard = (product) =>
  render(
    <MemoryRouter>
      <CartProvider>
        <ProductCard product={product} />
      </CartProvider>
    </MemoryRouter>
  )

const baseProduct = {
  id: 1,
  name: 'Classic White Sneakers',
  price: 89.99,
  originalPrice: 119.99,
  image: 'https://example.com/shoe.jpg',
  category: 'Footwear',
  rating: 4.5,
  reviews: 128,
}

describe('ProductCard', () => {
  it('renders product name and category', () => {
    renderCard(baseProduct)
    expect(screen.getByText('Classic White Sneakers')).toBeInTheDocument()
    expect(screen.getByText('Footwear')).toBeInTheDocument()
  })

  it('renders current price', () => {
    renderCard(baseProduct)
    expect(screen.getByText('$89.99')).toBeInTheDocument()
  })

  it('renders original price when discounted', () => {
    renderCard(baseProduct)
    expect(screen.getByText('$119.99')).toBeInTheDocument()
  })

  it('shows discount badge', () => {
    renderCard(baseProduct)
    expect(screen.getByText('-25%')).toBeInTheDocument()
  })

  it('does not show discount badge when no original price', () => {
    renderCard({ ...baseProduct, originalPrice: null })
    expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument()
  })

  it('renders review count', () => {
    renderCard(baseProduct)
    expect(screen.getByText('(128)')).toBeInTheDocument()
  })

  it('renders star rating', () => {
    renderCard(baseProduct)
    const stars = screen.getAllByText('★')
    expect(stars).toHaveLength(4)
  })

  it('has a link to the product detail page', () => {
    renderCard(baseProduct)
    const links = screen.getAllByRole('link')
    const productLinks = links.filter(l => l.getAttribute('href') === '/products/1')
    expect(productLinks.length).toBeGreaterThan(0)
  })

  it('has an add-to-cart button', async () => {
    renderCard(baseProduct)
    const button = screen.getByTitle('Add to cart')
    expect(button).toBeInTheDocument()
    await userEvent.click(button)
  })
})
