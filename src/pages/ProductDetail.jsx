import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'
import products from '../data/products'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [added, setAdded] = useState(false)

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-primary mb-2">Product Not Found</h2>
          <Link to="/products" className="text-accent hover:underline">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-accent transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-primary font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] md:h-[550px] object-cover"
              />
              {discount && (
                <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1.5 rounded-lg font-bold text-sm">
                  -{discount}%
                </span>
              )}
            </div>

            <div className="p-8 md:p-10 flex flex-col">
              <p className="text-sm text-muted font-medium uppercase tracking-wide">{product.category}</p>
              <h1 className="text-2xl md:text-3xl font-bold text-primary mt-2">{product.name}</h1>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>{i < Math.floor(product.rating) ? '★' : '☆'}</span>
                  ))}
                </div>
                <span className="text-sm text-muted">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-3 mt-5">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted line-through">${product.originalPrice}</span>
                )}
              </div>

              <p className="text-muted mt-4 leading-relaxed">{product.description}</p>

              {product.sizes.length > 1 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-primary mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors.length > 1 && (
                <div className="mt-5">
                  <h3 className="text-sm font-semibold text-primary mb-2">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          selectedColor === color
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-gray-200 text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-primary mb-2">Quantity</h3>
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl w-fit">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-accent transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-accent transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all ${
                    added
                      ? 'bg-green-500'
                      : 'bg-accent hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/25'
                  }`}
                >
                  {added ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-primary mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
