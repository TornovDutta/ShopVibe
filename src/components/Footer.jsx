import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SV</span>
              </div>
              <span className="text-xl font-bold">ShopVibe</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover curated products that blend style, quality, and affordability. Your one-stop shop for modern essentials.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-accent transition-colors">Shop</Link></li>
              <li><Link to="/cart" className="hover:text-accent transition-colors">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/products?category=Clothing" className="hover:text-accent transition-colors">Clothing</Link></li>
              <li><Link to="/products?category=Footwear" className="hover:text-accent transition-colors">Footwear</Link></li>
              <li><Link to="/products?category=Accessories" className="hover:text-accent transition-colors">Accessories</Link></li>
              <li><Link to="/products?category=Electronics" className="hover:text-accent transition-colors">Electronics</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@shopvibe.com</li>
              <li>1-800-SHOPVIBE</li>
              <li>Mon - Fri, 9am - 6pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} ShopVibe. All rights reserved.</p>
          <div className="flex gap-4">
            {['Twitter', 'Instagram', 'Facebook'].map(social => (
              <a key={social} href="#" className="text-gray-500 hover:text-accent text-sm transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
