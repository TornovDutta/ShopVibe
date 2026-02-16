import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-[#16213e] to-[#0f3460] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
              ✨ New Collection 2025
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Elevate Your
              <span className="text-accent"> Style</span> Game
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
              Discover curated products that blend quality, comfort, and modern aesthetics. Free shipping on orders over $99.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                Shop Now
              </Link>
              <Link
                to="/products"
                className="px-8 py-3.5 border border-white/20 hover:bg-white/10 text-white font-semibold rounded-xl transition-all"
              >
                Explore Collection
              </Link>
            </div>

            <div className="flex gap-8 mt-10">
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '200+', label: 'Products' },
                { value: '4.9★', label: 'Average Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop"
                  alt="Fashion collection"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-primary p-4 rounded-2xl shadow-xl">
                <p className="text-sm font-semibold">🔥 Trending Now</p>
                <p className="text-xs text-muted">Up to 40% off</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
