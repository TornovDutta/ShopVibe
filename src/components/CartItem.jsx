import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100">
      <Link to={`/products/${item.id}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-xl"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <Link to={`/products/${item.id}`}>
          <h3 className="font-semibold text-primary hover:text-accent transition-colors truncate">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm text-muted mt-0.5">{item.category}</p>
        <p className="text-lg font-bold text-primary mt-1">${item.price}</p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-gray-400 hover:text-accent transition-colors p-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-2 bg-gray-50 rounded-lg">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-accent transition-colors"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-accent transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
