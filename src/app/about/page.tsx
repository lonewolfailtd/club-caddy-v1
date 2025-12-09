'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { Battery, MapPin, Award, Users, Zap, Heart } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const { language } = useLanguage()

  const translations = {
    en: {
      // Hero Section
      badge: 'About Us',
      title: 'Redefining Electric Golf Carts in New Zealand',
      subtitle: 'Auckland-based innovators bringing superior 72V lithium technology and uncompromising quality to New Zealand golf courses and beyond.',

      // Story Section
      storyTitle: 'Our Story',
      storySubtitle: 'Passion meets innovation',
      story1: 'Founded in Auckland with a vision to revolutionize electric golf carts in New Zealand, Club Caddy Carts emerged from a simple observation: the market deserved better. Better technology, better service, and better value.',
      story2: 'We recognized that golf courses, resorts, and private estates across New Zealand needed more than just basic transportation. They needed reliable, powerful, and elegant vehicles that could handle diverse terrain while providing exceptional comfort and performance.',
      story3: 'Our commitment to 72V lithium technology sets us apart. While others settle for conventional 36-48V systems, we deliver superior range, faster speeds, and longer battery life—ensuring every journey is effortless and enjoyable.',

      // Values Section
      valuesTitle: 'What Drives Us',
      valuesSubtitle: 'Our commitment to excellence',
      values: [
        {
          title: 'Cutting-Edge Technology',
          description: 'We exclusively offer 72V lithium systems, providing 100km+ range, superior hill-climbing ability, and fast charging—technology that outperforms traditional golf cart batteries.',
        },
        {
          title: 'Auckland Expertise',
          description: 'Based in Auckland, we understand New Zealand\'s unique terrain and climate. Our local knowledge ensures every cart is optimized for Kiwi conditions.',
        },
        {
          title: 'Premium Quality',
          description: 'From hydraulic disc brakes to 10" touchscreens, every component is selected for durability, safety, and refinement. We never compromise on quality.',
        },
        {
          title: 'Customization',
          description: 'Whether you need a 2-seater for private use or a 20-seater for resort operations, we tailor every cart to your exact requirements with extensive options.',
        },
        {
          title: 'Comprehensive Service',
          description: 'From initial consultation to delivery and beyond, we provide white-glove service. Our team ensures your cart performs flawlessly for years to come.',
        },
        {
          title: 'Sustainability',
          description: 'Electric power means zero emissions and minimal environmental impact. We\'re proud to contribute to a greener New Zealand while delivering exceptional performance.',
        },
      ],

      // Team Section
      teamTitle: 'Meet the Team',
      teamSubtitle: 'Dedicated professionals committed to your satisfaction',
      teamMember: {
        name: 'Warren Mitchell',
        role: 'Founder & Director',
        bio: 'With over a decade of experience in electric vehicle technology and a passion for golf, Warren established Club Caddy Carts to bring world-class golf cart solutions to New Zealand. His commitment to customer service and technical excellence drives everything we do.',
      },

      // Stats Section
      statsTitle: 'Club Caddy by the Numbers',
      stats: [
        { value: '100+', label: 'Carts Delivered', unit: 'km' },
        { value: '72V', label: 'Lithium Power', unit: 'v' },
        { value: '100%', label: 'NZ Coverage', unit: '%' },
        { value: '5★', label: 'Customer Rating', unit: '' },
      ],

      // Testimonials Section
      testimonialsTitle: 'What Our Customers Say',
      testimonialsSubtitle: 'Real feedback from real customers',
      testimonials: [
        {
          quote: 'The 72V system makes a huge difference on our hilly course. These carts handle the terrain effortlessly, and our members love the touchscreen displays and comfort.',
          author: 'David Chen',
          role: 'Golf Course Manager, Auckland',
        },
        {
          quote: 'Warren and his team went above and beyond to customize our fleet. The quality is outstanding, and the service has been impeccable. Highly recommended.',
          author: 'Sarah Thompson',
          role: 'Resort Operations Director',
        },
        {
          quote: 'We compared several suppliers and Club Caddy offered the best technology at competitive prices. The lithium batteries and advanced features are game-changers.',
          author: 'Michael Wong',
          role: 'Private Estate Owner',
        },
      ],

      // Location Section
      locationTitle: 'Proudly Auckland-Based',
      locationSubtitle: 'Serving all of New Zealand',
      locationDescription: 'Our Auckland location allows us to provide rapid support and delivery across the North Island, with comprehensive service extending throughout New Zealand. Whether you\'re in Auckland, Wellington, Christchurch, or anywhere in between, we\'re here to help.',

      // CTA Section
      ctaTitle: 'Ready to Experience the Difference?',
      ctaSubtitle: 'Let\'s discuss how Club Caddy Carts can elevate your golf course, resort, or private estate.',
      ctaPhone: 'Call Warren',
      ctaEmail: 'Email Us',
      ctaQuote: 'Request a Quote',
    },
    zh: {
      // Hero Section
      badge: '关于我们',
      title: '重新定义新西兰电动高尔夫球车',
      subtitle: '总部位于奥克兰的创新者，为新西兰高尔夫球场及其他领域带来卓越的72V锂电技术和卓越品质。',

      // Story Section
      storyTitle: '我们的故事',
      storySubtitle: '激情与创新相遇',
      story1: 'Club Caddy Carts成立于奥克兰，旨在彻底改变新西兰的电动高尔夫球车市场，源于一个简单的观察：市场应该得到更好的产品。更好的技术、更好的服务和更好的价值。',
      story2: '我们认识到，新西兰各地的高尔夫球场、度假村和私人庄园需要的不仅仅是基本的交通工具。他们需要可靠、强大且优雅的车辆，能够应对多样化的地形，同时提供卓越的舒适性和性能。',
      story3: '我们对72V锂电技术的承诺使我们与众不同。当其他人满足于传统的36-48V系统时，我们提供卓越的续航、更快的速度和更长的电池寿命——确保每次旅程都轻松愉快。',

      // Values Section
      valuesTitle: '我们的驱动力',
      valuesSubtitle: '我们对卓越的承诺',
      values: [
        {
          title: '尖端技术',
          description: '我们专门提供72V锂电系统，提供100公里以上的续航、卓越的爬坡能力和快速充电——性能优于传统高尔夫球车电池。',
        },
        {
          title: '奥克兰专业知识',
          description: '总部位于奥克兰，我们了解新西兰独特的地形和气候。我们的本地知识确保每辆车都针对新西兰条件进行了优化。',
        },
        {
          title: '高级质量',
          description: '从液压盘式制动器到10英寸触摸屏，每个组件都经过精选，以确保耐用性、安全性和精致性。我们从不在质量上妥协。',
        },
        {
          title: '定制化',
          description: '无论您需要用于私人使用的2座车还是用于度假村运营的20座车，我们都会根据您的确切要求定制每辆车，提供广泛的选项。',
        },
        {
          title: '全面服务',
          description: '从最初的咨询到交付及以后，我们提供白手套服务。我们的团队确保您的车辆多年来性能完美。',
        },
        {
          title: '可持续性',
          description: '电力意味着零排放和最小的环境影响。我们自豪地为更绿色的新西兰做出贡献，同时提供卓越的性能。',
        },
      ],

      // Team Section
      teamTitle: '认识团队',
      teamSubtitle: '致力于您满意的专业人士',
      teamMember: {
        name: 'Warren Mitchell',
        role: '创始人兼董事',
        bio: '拥有十多年的电动车技术经验和对高尔夫的热情，Warren创立了Club Caddy Carts，为新西兰带来世界级的高尔夫球车解决方案。他对客户服务和技术卓越的承诺推动着我们所做的一切。',
      },

      // Stats Section
      statsTitle: 'Club Caddy数据',
      stats: [
        { value: '100+', label: '交付车辆', unit: '辆' },
        { value: '72V', label: '锂电动力', unit: '伏' },
        { value: '100%', label: '新西兰覆盖', unit: '%' },
        { value: '5★', label: '客户评分', unit: '' },
      ],

      // Testimonials Section
      testimonialsTitle: '客户评价',
      testimonialsSubtitle: '真实客户的真实反馈',
      testimonials: [
        {
          quote: '72V系统在我们的山地球场上产生了巨大的差异。这些车辆轻松应对地形，我们的会员喜欢触摸屏显示和舒适性。',
          author: 'David Chen',
          role: '高尔夫球场经理，奥克兰',
        },
        {
          quote: 'Warren和他的团队竭尽全力定制我们的车队。质量出色，服务无可挑剔。强烈推荐。',
          author: 'Sarah Thompson',
          role: '度假村运营总监',
        },
        {
          quote: '我们比较了几家供应商，Club Caddy以有竞争力的价格提供了最好的技术。锂电池和先进功能改变了游戏规则。',
          author: 'Michael Wong',
          role: '私人庄园业主',
        },
      ],

      // Location Section
      locationTitle: '自豪地扎根奥克兰',
      locationSubtitle: '服务整个新西兰',
      locationDescription: '我们的奥克兰位置使我们能够在北岛提供快速支持和交付，并在整个新西兰提供全面的服务。无论您在奥克兰、惠灵顿、基督城还是其他任何地方，我们都在这里为您提供帮助。',

      // CTA Section
      ctaTitle: '准备好体验不同了吗？',
      ctaSubtitle: '让我们讨论Club Caddy Carts如何提升您的高尔夫球场、度假村或私人庄园。',
      ctaPhone: '致电Warren',
      ctaEmail: '发送邮件',
      ctaQuote: '获取报价',
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');

        .refined-title {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.01em;
        }
        .refined-body {
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.01em;
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.15; }
        }
        @keyframes subtle-slide {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .breathing-hex {
          animation: breathe 5s ease-in-out infinite;
        }
        .slide-in {
          animation: subtle-slide 0.8s ease-out forwards;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-rose-50">
        {/* Hexagon pattern overlay */}
        <div
          className="absolute inset-0 breathing-hex pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23881337' stroke-width='1.2'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        ></div>

        {/* Elegant top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-800/30 to-transparent z-20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className="slide-in delay-1 inline-flex items-center gap-2 px-4 py-2 mb-10 border border-zinc-200 rounded-full bg-white/80 backdrop-blur-sm"
            >
              <div className="w-1.5 h-1.5 bg-rose-800 rounded-full"></div>
              <span className="refined-body text-xs text-zinc-600 uppercase tracking-[0.15em] font-medium">
                {t.badge}
              </span>
            </div>

            <h1 className="slide-in delay-2 refined-title text-6xl md:text-7xl font-bold text-zinc-900 mb-6 leading-[1.1]">
              {t.title}
            </h1>

            <div className="slide-in delay-2 w-16 h-px bg-rose-800 mx-auto mb-8"></div>

            <p className="slide-in delay-3 refined-body text-xl text-zinc-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
            <h2 className="refined-title text-4xl md:text-5xl font-bold text-zinc-900 mb-3">
              {t.storyTitle}
            </h2>
            <p className="refined-body text-base text-zinc-500 font-light">
              {t.storySubtitle}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-sm overflow-hidden"
              >
                <Image
                  src="/images/hero-golf-cart.jpg"
                  alt="Club Caddy Carts"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-sm overflow-hidden"
              >
                <Image
                  src="/images/products/caddy-cart13.jpg"
                  alt="Premium Golf Cart"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="refined-body text-lg text-zinc-700 leading-relaxed">
                {t.story1}
              </p>
              <p className="refined-body text-lg text-zinc-700 leading-relaxed">
                {t.story2}
              </p>
              <p className="refined-body text-lg text-zinc-700 leading-relaxed">
                {t.story3}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000000' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
            <h2 className="refined-title text-4xl md:text-5xl font-bold text-zinc-900 mb-3">
              {t.valuesTitle}
            </h2>
            <p className="refined-body text-base text-zinc-500 font-light">
              {t.valuesSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.21, 0.45, 0.27, 0.9]
                }}
                className="group p-8 bg-white border border-zinc-200 hover:border-zinc-400 transition-all duration-500 rounded-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-800 mb-6">
                  {index === 0 && <Zap className="h-6 w-6 text-white" />}
                  {index === 1 && <MapPin className="h-6 w-6 text-white" />}
                  {index === 2 && <Award className="h-6 w-6 text-white" />}
                  {index === 3 && <Users className="h-6 w-6 text-white" />}
                  {index === 4 && <Heart className="h-6 w-6 text-white" />}
                  {index === 5 && <Battery className="h-6 w-6 text-white" />}
                </div>
                <h3 className="refined-title text-xl font-semibold text-zinc-900 mb-4">
                  {value.title}
                </h3>
                <p className="refined-body text-zinc-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-rose-900 to-rose-800 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="refined-title text-4xl md:text-5xl font-bold mb-4">
              {t.statsTitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.21, 0.45, 0.27, 0.9]
                }}
                className="text-center"
              >
                <div className="refined-title text-5xl md:text-6xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="refined-body text-sm text-rose-100 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
            <h2 className="refined-title text-4xl md:text-5xl font-bold text-zinc-900 mb-3">
              {t.teamTitle}
            </h2>
            <p className="refined-body text-base text-zinc-500 font-light">
              {t.teamSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-10 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-rose-800 to-rose-900 flex items-center justify-center">
                <span className="refined-title text-4xl font-bold text-white">W</span>
              </div>
              <h3 className="refined-title text-2xl font-bold text-zinc-900 mb-2">
                {t.teamMember.name}
              </h3>
              <p className="refined-body text-sm text-rose-800 uppercase tracking-wider mb-6">
                {t.teamMember.role}
              </p>
              <p className="refined-body text-lg text-zinc-700 leading-relaxed">
                {t.teamMember.bio}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23000000' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
            <h2 className="refined-title text-4xl md:text-5xl font-bold text-zinc-900 mb-3">
              {t.testimonialsTitle}
            </h2>
            <p className="refined-body text-base text-zinc-500 font-light">
              {t.testimonialsSubtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.21, 0.45, 0.27, 0.9]
                }}
                className="bg-white border border-zinc-200 p-8 rounded-sm"
              >
                <div className="mb-6">
                  <svg className="w-10 h-10 text-rose-800 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="refined-body text-zinc-700 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-zinc-200 pt-4">
                  <p className="refined-title text-lg font-semibold text-zinc-900">
                    {testimonial.author}
                  </p>
                  <p className="refined-body text-sm text-zinc-500">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
            <h2 className="refined-title text-4xl md:text-5xl font-bold text-zinc-900 mb-3">
              {t.locationTitle}
            </h2>
            <p className="refined-body text-base text-zinc-500 font-light mb-8">
              {t.locationSubtitle}
            </p>
            <p className="refined-body text-lg text-zinc-700 max-w-3xl mx-auto leading-relaxed">
              {t.locationDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="aspect-[16/9] bg-zinc-100 rounded-sm overflow-hidden relative">
              {/* Placeholder for map - you can replace with actual Google Maps embed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-rose-800 mx-auto mb-4" />
                  <p className="refined-title text-2xl font-semibold text-zinc-900">Auckland, New Zealand</p>
                  <p className="refined-body text-zinc-600">Serving all of New Zealand</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-zinc-50 via-white to-rose-50 border-t border-zinc-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="refined-title text-3xl md:text-4xl font-semibold text-zinc-900 mb-4">
            {t.ctaTitle}
          </h3>
          <p className="refined-body text-base text-zinc-600 mb-8">
            {t.ctaSubtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href="tel:+64021560307"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="refined-body px-8 py-3 bg-zinc-900 text-white text-sm font-medium uppercase tracking-wide rounded-sm hover:bg-rose-900 transition-all"
            >
              {t.ctaPhone}
            </motion.a>
            <motion.a
              href="mailto:admin@clubcaddycarts.com"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="refined-body px-8 py-3 border-2 border-zinc-900 text-zinc-900 text-sm font-medium uppercase tracking-wide rounded-sm hover:border-rose-800 hover:text-rose-900 hover:bg-rose-50 transition-all"
            >
              {t.ctaEmail}
            </motion.a>
            <motion.a
              href="/quote"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="refined-body px-8 py-3 bg-rose-800 text-white text-sm font-medium uppercase tracking-wide rounded-sm hover:bg-rose-900 transition-all shadow-lg"
            >
              {t.ctaQuote}
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  )
}
