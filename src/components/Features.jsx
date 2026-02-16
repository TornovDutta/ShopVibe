const features = [
  {
    icon: '🚚',
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $99',
  },
  {
    icon: '↩️',
    title: 'Easy Returns',
    description: '30-day hassle-free return policy',
  },
  {
    icon: '🔒',
    title: 'Secure Payment',
    description: '100% secure payment processing',
  },
  {
    icon: '💬',
    title: '24/7 Support',
    description: 'Round-the-clock customer service',
  },
]

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(feature => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
