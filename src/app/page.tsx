export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Hexagon Pattern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-luxury-onyx via-primary-900 to-luxury-onyx">
        {/* Hexagon Pattern Overlay */}
        <div className="absolute inset-0 bg-hexagon opacity-20" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
              <span className="block">Club Caddy Carts</span>
              <span className="mt-2 block text-gradient-luxury">
                Premium Electric Golf Carts
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-luxury-platinum sm:text-xl">
              New Zealand's First 72V Lithium Battery Golf Cart.
              Experience luxury, power, and sustainability on the course.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="/products" className="btn-luxury">
                Explore Our Carts
              </a>
              <a href="mailto:admin@clubcaddycarts.com" className="glass rounded-lg px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20">
                Request a Quote
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="glass-dark rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-luxury-gold">100km+</div>
              <div className="mt-2 text-sm text-luxury-platinum">Range Per Charge</div>
            </div>
            <div className="glass-dark rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-luxury-gold">72V</div>
              <div className="mt-2 text-sm text-luxury-platinum">Lithium Battery</div>
            </div>
            <div className="glass-dark rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-luxury-gold">50km/h+</div>
              <div className="mt-2 text-sm text-luxury-platinum">Top Speed</div>
            </div>
          </div>
        </div>

        {/* Gradient Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent" />
      </section>

      {/* Hero Image Section */}
      <section className="relative bg-luxury-pearl">
        <div className="mx-auto max-w-7xl">
          <img
            src="/images/products/caddy-cart01.jpg"
            alt="Interior view of the Club Caddy Cart"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-luxury-onyx sm:text-5xl">
              Built for Your Needs
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From 2-seater to 20-seater configurations, we customise electric carts
              to suit your requirements with premium features and cutting-edge technology.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="luxury-card p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-luxury-gold to-luxury-gold-dark">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-luxury-onyx">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-luxury-onyx">
        <div className="absolute inset-0 bg-hexagon opacity-10" />
        <div className="relative z-10 px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Ready to Elevate Your Experience?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-luxury-platinum">
              Contact Warren today for viewings, quotes, or to discuss your custom golf cart needs.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a href="tel:+64021560307" className="btn-luxury w-full sm:w-auto">
                📞 +64-021-560-307
              </a>
              <a href="mailto:admin@clubcaddycarts.com" className="glass w-full rounded-lg px-8 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-white/20 sm:w-auto">
                ✉️ admin@clubcaddycarts.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    title: "10\" Touchscreen Display",
    description: "Intuitive controls with Bluetooth connectivity for music and calls, plus reverse camera integration.",
  },
  {
    title: "Premium Safety Features",
    description: "4-wheel hydraulic disc brakes with automatic braking system, LED headlights, and seat belts.",
  },
  {
    title: "Luxury Amenities",
    description: "4 cup holders, lockable storage, golf ball washer, sand bottles & built-in chilling bin.",
  },
  {
    title: "Customisable Options",
    description: "Multiple colours, battery options (48V/60V/72V), wheel sizes and optional bag canopy or weather enclosure.",
  },
  {
    title: "Eco-Friendly Power",
    description: "Lithium battery with 100km+ range, eco mode (20km/h) and standard mode (35km/h+), fully customisable.",
  },
  {
    title: "Quick Delivery",
    description: "Starting from $9,200 NZD with $1,000 deposit. Delivery in approximately 6 weeks across New Zealand.",
  },
]
