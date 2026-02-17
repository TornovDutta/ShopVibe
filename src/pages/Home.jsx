import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import HeroSection from '../components/HeroSection'
import ProductCard from '../components/ProductCard'
import SmartRecommendations from '../components/SmartRecommendations'
import Features from '../components/Features'
import Newsletter from '../components/Newsletter'
import { useRecommendations } from '../context/RecommendationContext'
import products, { categories } from '../data/products'

export default function Home() {
  const featured = products.filter(p => p.featured).slice(0, 4)
  const { getRecommendations } = useRecommendations()
  const featuredIds = featured.map(p => p.id)
  const recommended = useMemo(
    () => getRecommendations(4, featuredIds),
    [getRecommendations, featuredIds]
  )

  return (
    <div>
      <HeroSection />

      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">Shop by Category</h2>
            <p className="text-muted max-w-md mx-auto">Browse our curated collections across popular categories</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className="bg-white p-6 rounded-2xl text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="font-semibold text-primary text-sm">{cat.name}</h3>
                <p className="text-xs text-muted mt-1">{cat.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary">Featured Products</h2>
              <p className="text-muted mt-2">Handpicked just for you</p>
            </div>
            <Link
              to="/products"
              className="hidden sm:inline-flex items-center gap-1 text-accent font-medium hover:underline"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-accent font-medium hover:underline"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {recommended.length > 0 && (
        <section className="py-16 bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SmartRecommendations
              products={recommended}
              title="Recommended For You"
              subtitle="Personalized picks based on your activity"
            />
          </div>
        </section>
      )}

      <Features />

      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <span className="text-accent font-semibold text-sm">Limited Time Offer</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
                Up to 40% Off on New Arrivals
              </h2>
              <p className="text-muted mb-6">
                Don't miss out on our biggest sale of the season. Premium quality at unbeatable prices.
              </p>
              <Link
                to="/products"
                className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                Shop the Sale
              </Link>
            </div>
            <div className="w-full md:w-80 h-64 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=400&fit=crop"
                alt="Sale banner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
