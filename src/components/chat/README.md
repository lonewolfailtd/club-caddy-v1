# Club Caddy Carts Chatbot System

## Overview

The chatbot system provides an intelligent, context-aware virtual assistant named "Caddy" that helps visitors learn about Club Caddy Carts' products and services.

## Features

### 1. **Intelligent Chat Interface**
- Floating chat widget in bottom-right corner
- Smooth animations using Framer Motion
- Minimized and expanded states
- Mobile responsive design
- Refined elegance theme (rose-800 colors)

### 2. **Caddy Personality**
- Name: Caddy (friendly golf cart expert)
- Tone: Professional but warm, knowledgeable, helpful
- New Zealand/Auckland accent in writing style
- Uses casual NZ expressions ("G'day mate", "Cheers", "No worries", "Ripper")
- Enthusiastic about golf carts and 72V technology
- Uses golf terminology appropriately

### 3. **Comprehensive Knowledge Base**

#### Products
- **Standard Golf Cart**: $9,200, 100km+ range
- **Premium Golf Cart**: $12,500, 120km+ range, touchscreen
- **Ultimate Golf Cart**: $16,500, 150km+ range, luxury features

#### Technical Knowledge
- 72V lithium battery technology
- Range and performance details
- Charging information
- Street legal compliance

#### Business Information
- Contact: Warren (+64 021 560 307, admin@clubcaddycarts.com)
- Location: Auckland, New Zealand
- Services: Sales, rentals, customization
- Nationwide delivery and support

### 4. **Smart Nudge System**

The chatbot proactively engages visitors with context-aware messages:

#### Timing
- Appears 4 seconds after page load
- Only shows if user hasn't interacted yet
- Can be dismissed permanently (stored in localStorage)

#### Context-Aware Messages
Different nudges for different pages:

**Home Page:**
- "Need help choosing the perfect golf cart?"
- "Have questions about our 72V technology?"
- "Curious about our range and performance?"

**Products Page:**
- "Need help comparing our golf cart models?"
- "Questions about features and pricing?"

**Events Page:**
- "Planning an event and need golf carts?"

**Quote/Booking Pages:**
- "Need help with your quote request?"
- "Need assistance with your booking?"

### 5. **Pattern Matching Responses**

The chatbot intelligently responds to various query types:

#### Greeting Patterns
- "hello", "hi", "hey", "g'day", "greetings"

#### Product Inquiries
- General product questions
- Specific model inquiries (Standard/Premium/Ultimate)
- Price comparisons
- Feature comparisons

#### Technical Questions
- 72V technology
- Battery range
- Charging information
- Street legal compliance

#### Service Inquiries
- Rentals and hire
- Customization options
- Delivery and location
- Warranty and service

#### Contact Requests
- Direct contact information
- Warren's details
- Business location

### 6. **Bilingual Support**

Full English and Chinese language support:
- Automatically adapts to user's language preference
- Context-aware responses in both languages
- Translates all UI elements
- Maintains personality in both languages

### 7. **Rich Interactions**

- **Quick Links**: Provides relevant page links in responses
- **Structured Information**: Uses emojis and formatting for readability
- **Typing Indicators**: Shows animated "Caddy is typing..." state
- **Auto-Scroll**: Messages automatically scroll into view
- **Message History**: Maintains conversation during session

## Technical Implementation

### File Structure

```
src/
├── components/
│   └── chat/
│       ├── Chatbot.tsx          # Main chatbot component
│       └── README.md            # This file
├── lib/
│   └── chatbot/
│       └── chatbotLogic.ts      # Response logic and pattern matching
└── types/
    └── chatbot.types.ts         # TypeScript type definitions
```

### Key Components

#### `Chatbot.tsx`
Main React component handling:
- UI rendering and animations
- State management
- User interactions
- Message display
- Nudge system

#### `chatbotLogic.ts`
Core logic including:
- Pattern matching algorithms
- Response generation
- Context-aware nudge selection
- Bilingual response handling
- Product information database

#### `chatbot.types.ts`
TypeScript definitions:
- Message interface
- Response structure
- Translation types
- Product information types

### State Management

Uses React hooks:
- `useState` for UI state and messages
- `useEffect` for side effects (nudges, scrolling)
- `useRef` for DOM references (input, scroll target)
- `useContext` for language and routing

### Local Storage

- **Nudge Dismissal**: `club-caddy-nudge-dismissed`
  - Stores whether user permanently dismissed nudges
  - Prevents nudge from showing again

### Animations

Powered by Framer Motion:
- Entry/exit animations for chat widget
- Nudge appearance animations
- Message slide-in animations
- Typing indicator animations
- Button hover effects

## Usage

The chatbot is automatically included on all pages via the root layout:

```tsx
// src/app/layout.tsx
import Chatbot from "@/components/chat/Chatbot"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* ... other components ... */}
        <Chatbot />
      </body>
    </html>
  )
}
```

## Customization

### Adding New Responses

Edit `src/lib/chatbot/chatbotLogic.ts`:

```typescript
// Add new pattern matching
if (matchesPattern(input, ['your', 'keywords'])) {
  return {
    text: "Your response here",
    links: [
      { text: 'Link text', url: '/page-url' }
    ]
  }
}
```

### Adding New Nudges

Edit the `getContextualNudge` function:

```typescript
const nudges = {
  en: {
    '/your-page': [
      "Your nudge message here",
      "Alternative nudge message"
    ]
  }
}
```

### Modifying Personality

Adjust the tone and language style in `chatbotLogic.ts`:
- Use more/less casual language
- Change NZ expressions
- Adjust emoji usage
- Modify greeting/farewell messages

### Styling Changes

The chatbot uses Tailwind CSS classes:
- Primary color: `rose-800`, `rose-900`
- Background gradients: `from-rose-800 to-rose-900`
- Fonts: `refined-title`, `refined-body`

## Best Practices

### Content Updates

When updating product information:
1. Update the `PRODUCTS` array in `chatbotLogic.ts`
2. Update pricing in multiple response patterns
3. Test all product-related queries
4. Update both English and Chinese responses

### Performance

- Nudge delay is configurable (currently 4 seconds)
- Typing delay randomized for natural feel (1-2 seconds)
- Messages load progressively with animations
- LocalStorage used minimally

### Accessibility

- Proper ARIA labels on buttons
- Keyboard navigation supported (Enter to send)
- Focus management when opening chat
- Screen reader friendly

### Mobile Optimization

- Responsive width: `max-w-[calc(100vw-3rem)]`
- Touch-friendly button sizes
- Optimized for small screens
- Auto-scroll ensures messages visible

## Future Enhancements

Potential improvements:
- [ ] AI/GPT integration for more dynamic responses
- [ ] Analytics tracking for common questions
- [ ] FAQ learning system
- [ ] Voice input support
- [ ] Image sharing capability
- [ ] Integration with booking system
- [ ] Live chat handoff to Warren
- [ ] Conversation history persistence
- [ ] Email transcript feature

## Support

For questions or issues:
- Contact: Warren (+64 021 560 307)
- Email: admin@clubcaddycarts.com
