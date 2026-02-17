import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useRecommendations } from '../context/RecommendationContext'
import CartItem from '../components/CartItem'
import SmartRecommendations from '../components/SmartRecommendations'

export default function Cart() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { getForCart } = useRecommendations()
  const cartRecommendations = useMemo(() => getForCart(4), [getForCart])

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-7xl mb-6">🛒</p>
          <h2 className="text-2xl font-bold text-primary mb-2">Your cart is empty</h2>
          <p className="text-muted mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/products"
            className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  const shipping = cartTotal >= 99 ? 0 : 9.99
  const tax = cartTotal * 0.08
  const total = cartTotal + shipping + tax

  return (
    <div className="bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-primary mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-primary">Total</span>
                  <span className="font-bold text-primary text-lg">${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-muted mt-3 bg-gray-50 p-3 rounded-lg">
                  Add ${(99 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}

              <Link
                to="/checkout"
                className="block w-full mt-6 py-3.5 bg-accent hover:bg-accent-hover text-white text-center font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block text-center text-sm text-accent hover:underline mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        {cartRecommendations.length > 0 && (
          <section className="mt-12">
            <SmartRecommendations
              products={cartRecommendations}
              title="Complete Your Look"
              subtitle="Pairs well with items in your cart"
            />
          </section>
        )}
      </div>
    </div>
  )
}
