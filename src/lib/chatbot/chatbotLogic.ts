import { ChatbotResponse, Language, ProductInfo } from '@/types/chatbot.types'

// Product Information
const PRODUCTS: ProductInfo[] = [
  {
    name: 'Standard Golf Cart',
    price: 9200,
    features: [
      '72V lithium battery technology',
      '100km+ range on single charge',
      'Street legal compliance',
      'LED lighting package',
      'Comfortable seating for 2-4',
      'Premium build quality'
    ],
    slug: 'standard-golf-cart'
  },
  {
    name: 'Premium Golf Cart',
    price: 12500,
    features: [
      'Advanced 72V system',
      '120km+ extended range',
      'Premium touchscreen display',
      'Enhanced suspension system',
      'Luxury upholstery',
      'Advanced safety features',
      'Climate control options'
    ],
    slug: 'premium-golf-cart'
  },
  {
    name: 'Ultimate Golf Cart',
    price: 16500,
    features: [
      'Top-tier 72V performance',
      '150km+ maximum range',
      'Premium touchscreen with GPS',
      'Performance suspension',
      'Luxury leather interior',
      'Full entertainment system',
      'Advanced climate control',
      'Custom paint options'
    ],
    slug: 'ultimate-golf-cart'
  }
]

// Contact Information
const CONTACT = {
  name: 'Warren',
  phone: '+64 021 560 307',
  email: 'admin@clubcaddycarts.com',
  location: 'Auckland, New Zealand'
}

// Contextual Nudges by Page
export function getContextualNudge(pathname: string, language: Language): string {
  const nudges = {
    en: {
      '/': [
        "Need help choosing the perfect golf cart?",
        "Have questions about our 72V technology?",
        "Curious about our range and performance?",
        "Want to know more about customization options?"
      ],
      '/products': [
        "Need help comparing our golf cart models?",
        "Questions about features and pricing?",
        "Want to know which cart suits you best?",
        "Curious about the differences between models?"
      ],
      '/hire': [
        "Planning an event and need golf carts?",
        "Questions about event rentals?",
        "Need help with event logistics?"
      ],
      '/quote': [
        "Need help with your quote request?",
        "Questions about pricing or options?",
        "Want personalized recommendations?"
      ],
      '/booking': [
        "Need assistance with your booking?",
        "Questions about rental periods?",
        "Want to know about availability?"
      ],
      default: [
        "G'day! Need any help with golf carts?",
        "Have questions? I'm here to help!",
        "Looking for information? Just ask!"
      ]
    },
    zh: {
      '/': [
        "需要帮助选择完美的高尔夫球车吗？",
        "对我们的72V技术有疑问吗？",
        "想了解我们的续航和性能吗？",
        "想知道更多关于定制选项的信息吗？"
      ],
      '/products': [
        "需要帮助比较我们的高尔夫球车型号吗？",
        "关于功能和价格有疑问吗？",
        "想知道哪款球车最适合您吗？",
        "好奇不同型号之间的差异吗？"
      ],
      '/hire': [
        "计划活动需要高尔夫球车吗？",
        "关于活动租赁有疑问吗？",
        "需要帮助处理活动物流吗？"
      ],
      '/quote': [
        "需要帮助处理您的报价请求吗？",
        "关于定价或选项有疑问吗？",
        "想要个性化推荐吗？"
      ],
      '/booking': [
        "需要帮助预订吗？",
        "关于租赁期限有疑问吗？",
        "想了解可用性吗？"
      ],
      default: [
        "您好！需要关于高尔夫球车的帮助吗？",
        "有问题吗？我在这里帮助您！",
        "寻找信息？尽管问！"
      ]
    }
  }

  const langNudges = nudges[language]
  // Sort keys by length (longest first) to match most specific path first
  const matchingKey = Object.keys(langNudges)
    .filter(key => key !== 'default')
    .sort((a, b) => b.length - a.length)
    .find(key => pathname.startsWith(key))

  const pageNudges = matchingKey
    ? langNudges[matchingKey as keyof typeof langNudges]
    : langNudges.default

  // Ensure pageNudges is defined and is an array
  if (!pageNudges || !Array.isArray(pageNudges) || pageNudges.length === 0) {
    return langNudges.default[0]
  }

  return pageNudges[Math.floor(Math.random() * pageNudges.length)]
}

// Pattern Matching for User Input
function matchesPattern(input: string, patterns: string[]): boolean {
  const lowerInput = input.toLowerCase()
  return patterns.some(pattern => lowerInput.includes(pattern.toLowerCase()))
}

// Main Response Logic
export function getChatbotResponse(userInput: string, pathname: string, language: Language): ChatbotResponse {
  const input = userInput.toLowerCase().trim()

  // Language-specific responses
  if (language === 'zh') {
    return getChineseResponse(input, pathname)
  }

  return getEnglishResponse(input, pathname)
}

function getEnglishResponse(input: string, pathname: string): ChatbotResponse {
  // Greetings
  if (matchesPattern(input, ['hello', 'hi', 'hey', 'gday', "g'day", 'greetings', 'howdy'])) {
    return {
      text: "G'day mate! Great to see you here. I'm Caddy, your personal golf cart expert. Whether you're keen on our 72V technology, looking for the perfect cart, or just browsing - I'm here to help! What can I do for you today?",
    }
  }

  // Farewell
  if (matchesPattern(input, ['bye', 'goodbye', 'see you', 'thanks', 'thank you', 'cheers'])) {
    return {
      text: "Cheers! It's been a pleasure chatting with you. If you need anything else, just give me a yell or reach out to Warren directly. Have a ripper day!",
    }
  }

  // Products - General
  if (matchesPattern(input, ['product', 'cart', 'model', 'what do you have', 'show me', 'available'])) {
    return {
      text: "Excellent choice! We've got three cracking models:\n\n🏌️ Standard ($9,200) - Perfect entry into 72V technology with 100km+ range\n⭐ Premium ($12,500) - Enhanced features with touchscreen and 120km+ range\n💎 Ultimate ($16,500) - Top-of-the-line with 150km+ range and all the bells and whistles\n\nAll powered by advanced 72V lithium technology - the best in the business! Which one catches your eye?",
      links: [
        { text: 'View all products', url: '/products' }
      ]
    }
  }

  // Standard Cart
  if (matchesPattern(input, ['standard', 'basic', 'entry', 'cheapest', 'budget', '9200'])) {
    const standard = PRODUCTS[0]
    return {
      text: `The Standard Golf Cart is a ripper at $${standard.price.toLocaleString()}! Don't let the name fool you - it's packed with quality:\n\n${standard.features.map(f => `• ${f}`).join('\n')}\n\nIt's perfect for those who want premium 72V performance without breaking the bank. Street legal and ready to roll!`,
      links: [
        { text: 'View Standard Cart', url: `/products/${standard.slug}` },
        { text: 'Get a quote', url: '/quote' }
      ]
    }
  }

  // Premium Cart
  if (matchesPattern(input, ['premium', 'mid', 'middle', '12500'])) {
    const premium = PRODUCTS[1]
    return {
      text: `The Premium Golf Cart is our most popular choice at $${premium.price.toLocaleString()}! Here's what makes it special:\n\n${premium.features.map(f => `• ${f}`).join('\n')}\n\nThe sweet spot between value and luxury. That touchscreen is a game-changer!`,
      links: [
        { text: 'View Premium Cart', url: `/products/${premium.slug}` },
        { text: 'Get a quote', url: '/quote' }
      ]
    }
  }

  // Ultimate Cart
  if (matchesPattern(input, ['ultimate', 'best', 'top', 'luxury', 'premium', '16500'])) {
    const ultimate = PRODUCTS[2]
    return {
      text: `The Ultimate Golf Cart is the cream of the crop at $${ultimate.price.toLocaleString()}! This beauty has it all:\n\n${ultimate.features.map(f => `• ${f}`).join('\n')}\n\nIf you want the absolute best, this is it. 150km+ range means you'll be driving for days!`,
      links: [
        { text: 'View Ultimate Cart', url: `/products/${ultimate.slug}` },
        { text: 'Get a quote', url: '/quote' }
      ]
    }
  }

  // 72V Technology
  if (matchesPattern(input, ['72v', '72 volt', 'technology', 'battery', 'lithium', 'power'])) {
    return {
      text: "Ah, the 72V technology - that's where the magic happens! 🎯\n\nOur 72V lithium systems are absolutely brilliant:\n• Superior power and torque - hills are no worries!\n• 100-150km+ range depending on model\n• Faster charging times\n• Longer battery lifespan\n• More efficient than traditional systems\n• Environmentally friendly\n\nIt's like comparing a modern EV to an old petrol cart - there's simply no contest!",
    }
  }

  // Range/Distance
  if (matchesPattern(input, ['range', 'distance', 'how far', 'kilometers', 'km', 'battery life'])) {
    return {
      text: "Great question about range! Our 72V lithium technology gives you:\n\n🏌️ Standard: 100km+ per charge\n⭐ Premium: 120km+ per charge\n💎 Ultimate: 150km+ per charge\n\nThat's enough for multiple rounds of golf or several days of regular use! Plus, they charge relatively quickly. You'll spend more time driving than charging, guaranteed.",
    }
  }

  // Pricing
  if (matchesPattern(input, ['price', 'cost', 'how much', 'expensive', 'cheap', 'affordable'])) {
    return {
      text: "Here's our pricing - all in NZD:\n\n🏌️ Standard: $9,200\n⭐ Premium: $12,500\n💎 Ultimate: $16,500\n\nWe also offer rental options for events and short-term needs. These prices include our premium 72V technology and quality build - excellent value for what you're getting!\n\nInterested in a personalised quote or payment options?",
      links: [
        { text: 'Request a quote', url: '/quote' },
        { text: 'View products', url: '/products' }
      ]
    }
  }

  // Rentals/Hire
  if (matchesPattern(input, ['rent', 'rental', 'hire', 'lease', 'borrow', 'event'])) {
    return {
      text: "Yes mate, we do rentals! Perfect for:\n• Weddings and events\n• Corporate functions\n• Festivals\n• Short-term needs\n• Try before you buy\n\nRental rates vary based on duration and model. Warren can sort you out with a custom package that fits your needs perfectly. Want me to put you in touch?",
      links: [
        { text: 'Book a rental', url: '/booking' },
        { text: 'View hire options', url: '/hire' }
      ]
    }
  }

  // Customization
  if (matchesPattern(input, ['custom', 'customize', 'personalise', 'modify', 'upgrade', 'options'])) {
    return {
      text: "We love customization! 🎨 You can personalize your cart with:\n• Custom paint colors\n• Upgraded seating options\n• Enhanced lighting packages\n• Sound systems\n• Storage solutions\n• Weather protection\n• And more!\n\nThe Ultimate model comes with the most custom options, but we can work with any model. Let's chat about what you're after!",
      links: [
        { text: 'Get a custom quote', url: '/quote' }
      ]
    }
  }

  // Location/Delivery
  if (matchesPattern(input, ['location', 'where', 'auckland', 'new zealand', 'nz', 'delivery', 'ship'])) {
    return {
      text: "We're based in Auckland, New Zealand! 🇳🇿 But we service all of NZ:\n\n📍 Showroom in Auckland\n🚚 Delivery available nationwide\n🔧 Service and support across NZ\n✈️ Can arrange freight to any location\n\nWhether you're in Auckland, Wellington, Christchurch, or anywhere in between - we've got you covered!",
    }
  }

  // Contact Information
  if (matchesPattern(input, ['contact', 'phone', 'email', 'reach', 'call', 'warren', 'speak to'])) {
    return {
      text: `Want to chat directly? No worries! Here's how to reach Warren:\n\n📱 Phone: ${CONTACT.phone}\n📧 Email: ${CONTACT.email}\n📍 Location: ${CONTACT.location}\n\nWarren's a top bloke and knows these carts inside out. He'd be happy to answer any detailed questions or arrange a viewing!`,
    }
  }

  // Street Legal
  if (matchesPattern(input, ['street legal', 'road', 'legal', 'drive', 'laws', 'regulations'])) {
    return {
      text: "All our carts are designed to be street legal in New Zealand! 🚦\n\nThey come with:\n• Proper lighting (headlights, indicators, brake lights)\n• Safety features required by NZ law\n• Appropriate speed capabilities\n• Registration support\n\nWarren can walk you through the specifics for your area and help with any paperwork needed. Easy as!",
    }
  }

  // Warranty/Service
  if (matchesPattern(input, ['warranty', 'guarantee', 'service', 'maintenance', 'repair', 'support'])) {
    return {
      text: "We stand behind our carts with solid warranties and ongoing support! 🔧\n\n• Comprehensive warranty coverage\n• Regular maintenance packages available\n• Expert service and repairs\n• Parts readily available\n• NZ-wide support network\n\nOur 72V lithium systems are reliable as, but we're always here if you need us. Want more details? Warren's your man!",
      links: [
        { text: 'Contact us', url: '/quote' }
      ]
    }
  }

  // Comparison
  if (matchesPattern(input, ['compare', 'difference', 'between', 'vs', 'versus', 'which'])) {
    return {
      text: "Let me break down the key differences:\n\n🏌️ STANDARD ($9,200)\n• 100km+ range\n• Essential features\n• Perfect for regular use\n\n⭐ PREMIUM ($12,500)\n• 120km+ range\n• Touchscreen display\n• Enhanced comfort & safety\n\n💎 ULTIMATE ($16,500)\n• 150km+ range\n• GPS navigation\n• Luxury everything!\n\nAll feature our legendary 72V technology. The choice really comes down to your budget and desired features!",
      links: [
        { text: 'Compare all models', url: '/products' }
      ]
    }
  }

  // Golf-specific
  if (matchesPattern(input, ['golf', 'course', 'club', 'fairway', 'green'])) {
    return {
      text: "Perfect for the course! ⛳ Our carts are brilliant for golf:\n\n• Quiet operation - won't disturb other players\n• Excellent range for multiple rounds\n• Smooth ride over varied terrain\n• Storage for clubs and gear\n• Weather protection options\n\nMany golf clubs in NZ use our carts. Whether for personal use or your club fleet, we've got the perfect solution!",
    }
  }

  // Default - intelligent fallback
  return {
    text: "That's a great question! While I'm pretty knowledgeable about our golf carts, I want to make sure you get the most accurate information. \n\nI can definitely help with:\n• Product features and pricing\n• 72V technology details\n• Range and performance\n• Rentals and customization\n• General inquiries\n\nFor more specific or technical questions, Warren would be the best person to chat with - he knows these carts inside and out!",
    links: [
      { text: 'Contact Warren', url: '/quote' },
      { text: 'Browse products', url: '/products' }
    ]
  }
}

function getChineseResponse(input: string, pathname: string): ChatbotResponse {
  // Greetings
  if (matchesPattern(input, ['你好', '您好', 'hello', 'hi', '嗨'])) {
    return {
      text: "您好！很高兴见到您。我是Caddy，您的个人高尔夫球车专家。无论您对我们的72V技术感兴趣，寻找完美的球车，还是只是浏览 - 我都在这里帮助您！今天我能为您做些什么？",
    }
  }

  // Farewell
  if (matchesPattern(input, ['再见', '谢谢', '感谢', 'bye', 'thanks'])) {
    return {
      text: "谢谢！很高兴与您聊天。如果您需要任何其他帮助，请随时联系我或直接联系Warren。祝您有美好的一天！",
    }
  }

  // Products - General
  if (matchesPattern(input, ['产品', '球车', '型号', '有什么', '展示', 'product', 'cart'])) {
    return {
      text: "很好的选择！我们有三款出色的型号：\n\n🏌️ 标准款（$9,200）- 配备72V技术，续航100公里+\n⭐ 高级款（$12,500）- 增强功能，触摸屏，续航120公里+\n💎 旗舰款（$16,500）- 顶级配置，续航150公里+，所有功能\n\n全部采用先进的72V锂电池技术 - 业内最好的！您对哪一款感兴趣？",
      links: [
        { text: '查看所有产品', url: '/products' }
      ]
    }
  }

  // Pricing
  if (matchesPattern(input, ['价格', '多少钱', '费用', '成本', 'price', 'cost'])) {
    return {
      text: "这是我们的定价 - 新西兰元：\n\n🏌️ 标准款：$9,200\n⭐ 高级款：$12,500\n💎 旗舰款：$16,500\n\n我们还为活动和短期需求提供租赁选项。这些价格包括我们的优质72V技术和高品质制造 - 物超所值！\n\n想要个性化报价吗？",
      links: [
        { text: '请求报价', url: '/quote' },
        { text: '查看产品', url: '/products' }
      ]
    }
  }

  // 72V Technology
  if (matchesPattern(input, ['72v', '技术', '电池', '锂电池', '动力'])) {
    return {
      text: "啊，72V技术 - 这就是魔法发生的地方！🎯\n\n我们的72V锂电池系统非常出色：\n• 卓越的动力和扭矩 - 爬坡无压力！\n• 根据型号不同，续航100-150公里+\n• 更快的充电时间\n• 更长的电池寿命\n• 比传统系统更高效\n• 环保\n\n这就像将现代电动车与旧汽油车相比 - 完全没有可比性！",
    }
  }

  // Contact
  if (matchesPattern(input, ['联系', '电话', '邮箱', 'contact', 'phone', 'email', 'warren'])) {
    return {
      text: `想直接聊天？没问题！以下是联系Warren的方式：\n\n📱 电话：${CONTACT.phone}\n📧 邮箱：${CONTACT.email}\n📍 位置：${CONTACT.location}\n\nWarren非常友好，对这些球车了如指掌。他很乐意回答任何详细问题或安排看车！`,
    }
  }

  // Default Chinese
  return {
    text: "这是一个很好的问题！虽然我对我们的高尔夫球车很了解，但我想确保您获得最准确的信息。\n\n我可以帮助您了解：\n• 产品功能和价格\n• 72V技术详情\n• 续航和性能\n• 租赁和定制\n• 一般咨询\n\n对于更具体或技术性的问题，Warren将是最好的交谈对象 - 他对这些球车了如指掌！",
    links: [
      { text: '联系Warren', url: '/quote' },
      { text: '浏览产品', url: '/products' }
    ]
  }
}
