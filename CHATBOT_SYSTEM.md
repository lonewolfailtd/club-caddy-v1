# Club Caddy Carts - Comprehensive Chatbot System

## Overview

The Club Caddy Carts website now features a sophisticated, AI-powered chatbot named **"Caddy"** - a friendly, knowledgeable virtual assistant that helps visitors learn about products, services, and general information. The chatbot is fully integrated with the refined elegance theme and provides an exceptional user experience.

---

## System Architecture

### File Structure

```
src/
├── components/
│   └── chat/
│       ├── Chatbot.tsx          # Main chatbot UI component
│       └── README.md            # Detailed documentation
├── lib/
│   └── chatbot/
│       └── chatbotLogic.ts      # Response logic and pattern matching
└── types/
    └── chatbot.types.ts         # TypeScript type definitions
```

### Integration Points

- **Root Layout** (`src/app/layout.tsx`): Chatbot is included globally
- **Language Context**: Bilingual support (English/Chinese)
- **Navigation**: Context-aware based on current page
- **Theme**: Matches refined elegance design (rose-800/rose-900)

---

## Features

### 1. Intelligent Chat Interface

#### Visual Design
- **Floating Widget**: Bottom-right corner, non-intrusive
- **Theme Integration**: Rose-800/Rose-900 gradient with refined typography
- **Animations**: Smooth Framer Motion animations throughout
- **States**:
  - Closed (floating button with pulse effect)
  - Open (full chat window)
  - Minimized (header only)

#### Responsive Design
- **Desktop**: 384px width, 600px height
- **Mobile**: Full width with 3rem margins
- **Max Height**: Adapts to viewport (calc(100vh - 8rem))

#### UI Elements
- **Header**: Shows Caddy's name, status (online), minimize/close buttons
- **Messages Area**: Scrollable with custom thin scrollbar
- **Input Field**: Auto-focus, Enter to send, disabled while typing
- **Send Button**: Gradient rose background, disabled when empty
- **Typing Indicator**: Animated dots showing Caddy is thinking

### 2. Caddy - The AI Personality

#### Character Traits
- **Name**: Caddy (golf-themed, friendly)
- **Role**: Golf cart expert and virtual assistant
- **Tone**: Professional yet warm, enthusiastic
- **Accent**: New Zealand/Auckland style
  - Uses "G'day mate" instead of "Hello"
  - "Ripper" for excellent
  - "No worries" for reassurance
  - "Cheers" for goodbye
  - "Easy as" for simple/straightforward

#### Language Style
- **Conversational**: Natural, human-like responses
- **Informative**: Provides detailed, accurate information
- **Helpful**: Always guides users to next steps
- **Emojis**: Strategic use (🏌️ ⭐ 💎 🎯 🚦 ⛳ 📱 📧 📍 🚚 🔧)

### 3. Comprehensive Knowledge Base

#### Product Information

**Standard Golf Cart - $9,200**
- 72V lithium battery technology
- 100km+ range on single charge
- Street legal compliance
- LED lighting package
- Comfortable seating for 2-4
- Premium build quality

**Premium Golf Cart - $12,500**
- Advanced 72V system
- 120km+ extended range
- Premium touchscreen display
- Enhanced suspension system
- Luxury upholstery
- Advanced safety features
- Climate control options

**Ultimate Golf Cart - $16,500**
- Top-tier 72V performance
- 150km+ maximum range
- Premium touchscreen with GPS
- Performance suspension
- Luxury leather interior
- Full entertainment system
- Advanced climate control
- Custom paint options

#### Technical Knowledge

**72V Lithium Technology**
- Superior power and torque
- Faster charging times
- Longer battery lifespan
- More efficient than traditional systems
- Environmentally friendly
- Better hill climbing capability

**Range & Performance**
- Standard: 100km+ per charge
- Premium: 120km+ per charge
- Ultimate: 150km+ per charge
- All models suitable for multiple golf rounds
- Quick charging capability

**Street Legal Compliance**
- Proper lighting systems (headlights, indicators, brake lights)
- Safety features meeting NZ regulations
- Appropriate speed capabilities
- Registration support included

#### Business Information

**Contact Details**
- Name: Warren
- Phone: +64 021 560 307
- Email: admin@clubcaddycarts.com
- Location: Auckland, New Zealand

**Services**
- Sales (all three models)
- Rentals (events, weddings, short-term)
- Customization (paint, seating, lighting, sound)
- Delivery (nationwide across NZ)
- Service & Maintenance (NZ-wide support)

**Service Areas**
- Based in Auckland
- Delivery available nationwide
- Support across all of New Zealand
- Freight to any location

### 4. Smart Nudge System

#### Timing & Behavior
- **Delay**: 4 seconds after page load
- **Conditions**: Only shows if user hasn't interacted
- **Persistence**: Can be permanently dismissed (localStorage)
- **Storage Key**: `club-caddy-nudge-dismissed`

#### Context-Aware Messages

**Home Page (`/`)**
- "Need help choosing the perfect golf cart?"
- "Have questions about our 72V technology?"
- "Curious about our range and performance?"
- "Want to know more about customization options?"

**Products Page (`/products`)**
- "Need help comparing our golf cart models?"
- "Questions about features and pricing?"
- "Want to know which cart suits you best?"
- "Curious about the differences between models?"

**Events Page (`/events`)**
- "Planning an event and need golf carts?"
- "Questions about event rentals?"
- "Need help with event logistics?"

**Quote Page (`/quote`)**
- "Need help with your quote request?"
- "Questions about pricing or options?"
- "Want personalized recommendations?"

**Booking Page (`/booking`)**
- "Need assistance with your booking?"
- "Questions about rental periods?"
- "Want to know about availability?"

**Default (Other Pages)**
- "G'day! Need any help with golf carts?"
- "Have questions? I'm here to help!"
- "Looking for information? Just ask!"

#### Visual Design
- **Container**: White background with rose-100 border
- **Gradient Overlay**: Rose-50 to transparent
- **Icon**: Sparkles icon in rose-800/rose-900 gradient circle
- **Animation**: Pulsing border effect
- **Dismiss Button**: Top-right X button

### 5. Pattern Matching & Responses

#### Greeting Patterns
**Triggers**: hello, hi, hey, gday, g'day, greetings, howdy

**English Response**:
> "G'day mate! Great to see you here. I'm Caddy, your personal golf cart expert. Whether you're keen on our 72V technology, looking for the perfect cart, or just browsing - I'm here to help! What can I do for you today?"

**Chinese Response**:
> "您好！很高兴见到您。我是Caddy，您的个人高尔夫球车专家。无论您对我们的72V技术感兴趣，寻找完美的球车，还是只是浏览 - 我都在这里帮助您！今天我能为您做些什么？"

#### Farewell Patterns
**Triggers**: bye, goodbye, see you, thanks, thank you, cheers

**Response**:
> "Cheers! It's been a pleasure chatting with you. If you need anything else, just give me a yell or reach out to Warren directly. Have a ripper day!"

#### Product Inquiry Patterns

**General Products**: product, cart, model, what do you have, show me, available
- Shows all three models with prices
- Highlights key features
- Provides link to products page

**Standard Cart**: standard, basic, entry, cheapest, budget, 9200
- Detailed features list
- Price and value proposition
- Links to product page and quote

**Premium Cart**: premium, mid, middle, 12500
- Enhanced features emphasis
- Touchscreen highlight
- Links to product page and quote

**Ultimate Cart**: ultimate, best, top, luxury, 16500
- Luxury features showcase
- Maximum range emphasis
- Links to product page and quote

#### Technical Inquiry Patterns

**72V Technology**: 72v, 72 volt, technology, battery, lithium, power
- Explains benefits of 72V system
- Compares to traditional systems
- Highlights efficiency and power

**Range/Distance**: range, distance, how far, kilometers, km, battery life
- Lists range for each model
- Explains charging capabilities
- Emphasizes practical usage

**Street Legal**: street legal, road, legal, drive, laws, regulations
- Confirms compliance
- Lists safety features
- Offers registration support

#### Service Inquiry Patterns

**Pricing**: price, cost, how much, expensive, cheap, affordable
- Shows all pricing (NZD)
- Mentions rental options
- Links to quote request

**Rentals**: rent, rental, hire, lease, borrow, event
- Explains rental scenarios
- Mentions custom packages
- Links to booking page

**Customization**: custom, customize, personalise, modify, upgrade, options
- Lists customization options
- Highlights Ultimate model features
- Links to quote for custom requests

**Location/Delivery**: location, where, auckland, new zealand, nz, delivery, ship
- Confirms Auckland base
- Explains nationwide coverage
- Details delivery options

**Contact**: contact, phone, email, reach, call, warren, speak to
- Provides Warren's full contact info
- Encourages direct contact
- Personal touch

**Warranty/Service**: warranty, guarantee, service, maintenance, repair, support
- Explains warranty coverage
- Lists support services
- Mentions NZ-wide network

#### Comparison Patterns
**Triggers**: compare, difference, between, vs, versus, which

**Response**: Side-by-side comparison of all three models

#### Golf-Specific Patterns
**Triggers**: golf, course, club, fairway, green

**Response**: Highlights golf-specific features and benefits

#### Intelligent Fallback

For unmatched queries:
- Acknowledges the question
- Lists what Caddy can help with
- Suggests contacting Warren for complex queries
- Provides helpful links

### 6. Bilingual Support (English/Chinese)

#### Implementation
- **Context Hook**: Uses `useLanguage()` from LanguageContext
- **Automatic Switching**: Adapts to user's selected language
- **Consistent Personality**: Maintains Caddy's character in both languages

#### Translation Coverage
- UI elements (buttons, placeholders)
- Greeting message
- All response patterns
- Nudge messages
- Links and CTAs

#### Chinese Language Features
- Simplified Chinese characters
- Cultural appropriate tone
- Maintains technical accuracy
- Professional yet friendly

### 7. Rich Interactions

#### Message Types

**Text Messages**
- User messages: Rose-800 background, white text, right-aligned
- Bot messages: White background, gray text, left-aligned
- Rounded corners with asymmetric tails (br-sm for user, bl-sm for bot)

**Messages with Links**
- Displayed below message text
- Rose-800 color with hover state
- Arrow indicator (→)
- Direct navigation to relevant pages

**Typing Indicator**
- Three animated dots
- Rose-400 color
- Staggered animation (0.2s delay between dots)
- Shows "Caddy is typing..." state

#### User Experience Features

**Auto-Scroll**
- Messages automatically scroll into view
- Smooth behavior
- Triggered on new messages

**Focus Management**
- Input field auto-focuses when chat opens
- Keyboard accessible (Enter to send)
- Disabled during typing simulation

**Loading States**
- Input disabled while bot is typing
- Send button disabled when empty or typing
- Visual feedback for all states

**Session Persistence**
- Messages maintained during session
- Greeting shows when language changes
- History cleared on page refresh

---

## Technical Implementation

### Dependencies

```json
{
  "framer-motion": "^12.23.25",    // Animations
  "lucide-react": "^0.556.0",      // Icons
  "react": "^19.0.0",              // Core framework
  "next": "^15.1.8"                // Next.js framework
}
```

### State Management

#### React Hooks Used

**useState**
- `isOpen`: Chat window visibility
- `isMinimized`: Minimized state
- `messages`: Chat message history
- `inputValue`: Current input text
- `isTyping`: Bot typing state
- `showNudge`: Nudge visibility
- `nudgeMessage`: Current nudge text
- `hasInteracted`: User interaction tracking

**useEffect**
- Greeting message initialization
- Nudge system timing
- Auto-scroll on new messages
- Input focus management

**useRef**
- `messagesEndRef`: Scroll target
- `inputRef`: Input field reference

**useContext**
- `useLanguage()`: Language preference
- `usePathname()`: Current page route

### LocalStorage Usage

**Key**: `club-caddy-nudge-dismissed`
**Value**: `"true"` when dismissed
**Purpose**: Prevent nudge from showing again after permanent dismissal

### Animation Specifications

#### Chat Button
```typescript
initial: { scale: 0, opacity: 0 }
animate: { scale: 1, opacity: 1 }
exit: { scale: 0, opacity: 0 }
whileHover: { scale: 1.05 }
whileTap: { scale: 0.95 }
```

#### Nudge
```typescript
initial: { opacity: 0, y: 20, scale: 0.9 }
animate: { opacity: 1, y: 0, scale: 1 }
exit: { opacity: 0, y: 20, scale: 0.9 }
transition: { type: 'spring', stiffness: 300, damping: 25 }
```

#### Chat Window
```typescript
initial: { opacity: 0, y: 20, scale: 0.95 }
animate: { opacity: 1, y: 0, scale: 1 }
exit: { opacity: 0, y: 20, scale: 0.95 }
transition: { type: 'spring', stiffness: 300, damping: 30 }
```

#### Messages
```typescript
initial: { opacity: 0, y: 10 }
animate: { opacity: 1, y: 0 }
transition: { delay: index * 0.1 }
```

#### Typing Dots
```typescript
animate: { scale: [1, 1.2, 1] }
transition: { duration: 0.6, repeat: Infinity, delay: [0, 0.2, 0.4] }
```

### Pattern Matching Algorithm

```typescript
function matchesPattern(input: string, patterns: string[]): boolean {
  const lowerInput = input.toLowerCase()
  return patterns.some(pattern =>
    lowerInput.includes(pattern.toLowerCase())
  )
}
```

**How it works**:
1. Converts user input to lowercase
2. Checks if input contains any of the pattern keywords
3. Returns true on first match
4. Case-insensitive matching

### Response Flow

1. **User Input** → Input field
2. **Message Creation** → User message added to state
3. **Input Clear** → Field cleared immediately
4. **Typing State** → Bot shows typing indicator
5. **Delay** → Random 1-2 second delay for realism
6. **Pattern Match** → `getChatbotResponse()` finds best match
7. **Response Generation** → Creates bot message with text/links
8. **Message Display** → Bot message added to state
9. **Auto-Scroll** → Scrolls to show new message
10. **Typing Clear** → Removes typing indicator

### Context Awareness

The chatbot is aware of:
- **Current Page** (`pathname` from usePathname)
- **User Language** (`language` from useLanguage)
- **User Interaction** (has the user engaged?)
- **Session History** (messages during current session)

---

## Customization Guide

### Adding New Response Patterns

**File**: `src/lib/chatbot/chatbotLogic.ts`

```typescript
// Add in getEnglishResponse() or getChineseResponse()
if (matchesPattern(input, ['your', 'keywords', 'here'])) {
  return {
    text: "Your response text here",
    links: [
      { text: 'Link Text', url: '/page-url' }
    ]
  }
}
```

### Adding New Nudge Messages

**File**: `src/lib/chatbot/chatbotLogic.ts`

```typescript
// In getContextualNudge() function
const nudges = {
  en: {
    '/your-new-page': [
      "First nudge message",
      "Second nudge message",
      "Third nudge message"
    ]
  },
  zh: {
    '/your-new-page': [
      "第一条推送消息",
      "第二条推送消息"
    ]
  }
}
```

### Updating Product Information

**File**: `src/lib/chatbot/chatbotLogic.ts`

```typescript
const PRODUCTS: ProductInfo[] = [
  {
    name: 'Your Product Name',
    price: 10000,
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3'
    ],
    slug: 'product-slug'
  }
]
```

**Important**: Update in multiple places:
- PRODUCTS array
- General product response
- Specific model responses
- Pricing response
- Comparison response

### Changing Appearance

**File**: `src/components/chat/Chatbot.tsx`

**Colors**:
- Primary: `rose-800`, `rose-900`
- Accent: `rose-100`, `rose-200`, `rose-400`
- Background: `white`, `rose-50/30`

**Typography**:
- Headings: `refined-title` (Playfair Display)
- Body: `refined-body` (Inter)

**Sizes**:
- Chat window: `w-96` (384px)
- Height: `600px`
- Button: `w-16 h-16` (64px)
- Avatar: `w-10 h-10` (40px)

### Modifying Personality

**Tone Adjustments**:
- More formal: Remove NZ slang, use standard greetings
- More casual: Add more emojis, use casual language
- Different accent: Change regional expressions

**Example Changes**:
```typescript
// Current (NZ casual)
"G'day mate! That's a ripper question!"

// More formal
"Hello! That's an excellent question!"

// More casual
"Hey there! 😊 Great question!"
```

---

## Testing Checklist

### Functional Testing

- [ ] Chat button appears and pulses
- [ ] Nudge appears after 4 seconds
- [ ] Nudge can be dismissed permanently
- [ ] Chat opens when clicking button or nudge
- [ ] Messages send on button click
- [ ] Messages send on Enter key
- [ ] Input clears after sending
- [ ] Typing indicator shows
- [ ] Bot responds after delay
- [ ] Auto-scroll works
- [ ] Links navigate correctly
- [ ] Minimize button works
- [ ] Close button works
- [ ] Reopening shows message history

### Response Testing

Test each category:
- [ ] Greetings (hello, hi, g'day)
- [ ] Farewells (bye, thanks, cheers)
- [ ] Products (standard, premium, ultimate)
- [ ] Pricing (price, cost, how much)
- [ ] Technology (72v, battery, lithium)
- [ ] Range (distance, kilometers, range)
- [ ] Rentals (hire, rental, event)
- [ ] Customization (custom, modify, upgrade)
- [ ] Location (where, auckland, delivery)
- [ ] Contact (phone, email, warren)
- [ ] Street legal (legal, road, drive)
- [ ] Warranty (service, maintenance, support)
- [ ] Comparison (compare, difference, which)
- [ ] Golf (golf, course, club)
- [ ] Fallback (unknown queries)

### Language Testing

- [ ] English UI translates correctly
- [ ] Chinese UI translates correctly
- [ ] Responses in correct language
- [ ] Nudges in correct language
- [ ] Language switching updates greeting

### Page Context Testing

Navigate to each page and verify nudges:
- [ ] Home page nudge is contextual
- [ ] Products page nudge is contextual
- [ ] Events page nudge is contextual
- [ ] Quote page nudge is contextual
- [ ] Booking page nudge is contextual
- [ ] Other pages show default nudge

### Mobile Testing

- [ ] Chat button visible on mobile
- [ ] Chat window fits mobile screen
- [ ] Input keyboard doesn't overlap
- [ ] Touch targets are adequate size
- [ ] Scrolling works smoothly
- [ ] Nudge doesn't overflow screen

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] ARIA labels present
- [ ] Focus management correct
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Text is readable

---

## Performance Considerations

### Optimization Features

**Lazy Loading**
- Component only loads when needed
- No impact on initial page load

**Efficient State**
- Minimal re-renders
- Optimized useEffect dependencies

**LocalStorage**
- Single key for nudge dismissal
- No large data storage

**Animation Performance**
- GPU-accelerated transforms
- Framer Motion optimization
- No heavy computations

### Monitoring

**Metrics to Track**:
- Chat open rate
- Message send rate
- Response satisfaction
- Most common queries
- Fallback frequency

**Recommended Tools**:
- Google Analytics events
- Custom logging
- User feedback surveys

---

## Future Enhancements

### Planned Improvements

1. **AI Integration**
   - Connect to GPT-4 for dynamic responses
   - Learn from common questions
   - Personalized recommendations

2. **Advanced Features**
   - Voice input support
   - Image sharing capability
   - Video demonstrations
   - Live chat handoff to Warren

3. **Analytics**
   - Track common questions
   - Identify knowledge gaps
   - Optimize responses

4. **Persistence**
   - Save conversation history
   - Email transcript feature
   - Cross-session memory

5. **Integration**
   - Direct booking from chat
   - Real-time inventory check
   - Price calculator

6. **Multilingual**
   - Additional languages (Māori, Pacific languages)
   - Auto-detect user language
   - Better translations

---

## Troubleshooting

### Common Issues

**Nudge doesn't appear**
- Check localStorage for dismissal flag
- Verify 4-second delay
- Ensure page pathname is correct
- Clear localStorage to reset

**Responses not matching**
- Check pattern matching keywords
- Verify lowercase conversion
- Test with exact trigger words
- Review fallback logic

**Animations stuttering**
- Check for other heavy animations
- Verify Framer Motion version
- Test on different browsers
- Reduce animation complexity

**Language not switching**
- Verify LanguageContext provider
- Check localStorage for language preference
- Ensure translations exist
- Test toggle functionality

### Debug Mode

To enable debug logging:

```typescript
// Add to Chatbot.tsx
useEffect(() => {
  console.log('Chatbot State:', {
    isOpen,
    isMinimized,
    messages: messages.length,
    showNudge,
    hasInteracted
  })
}, [isOpen, isMinimized, messages, showNudge, hasInteracted])
```

---

## Support & Contact

For technical support or questions:

**Developer Support**
- Review code documentation
- Check README.md files
- Test in development mode

**Business Support**
- Contact: Warren
- Phone: +64 021 560 307
- Email: admin@clubcaddycarts.com

---

## Credits

**Technologies Used**
- Next.js 15.1.8
- React 19.0.0
- Framer Motion 12.23.25
- TypeScript 5.7.2
- Tailwind CSS 3.4.18
- Lucide React 0.556.0

**Design System**
- Refined Elegance Theme
- Rose-800/Rose-900 palette
- Playfair Display & Inter fonts
- Custom animations

---

## Conclusion

The Club Caddy Carts chatbot system is a comprehensive, production-ready solution that provides:

✅ **Intelligent Responses** - Pattern matching with 15+ categories
✅ **Bilingual Support** - Full English and Chinese translations
✅ **Context Awareness** - Page-specific nudges and responses
✅ **Premium Design** - Matches refined elegance theme
✅ **Smooth Animations** - Polished Framer Motion effects
✅ **Mobile Optimized** - Responsive and touch-friendly
✅ **Accessible** - ARIA labels and keyboard navigation
✅ **Extensible** - Easy to add new responses and features

The chatbot enhances user experience by providing immediate assistance, reducing support requests, and guiding users through their journey on the Club Caddy Carts website.
