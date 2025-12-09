# Chatbot Quick Reference Guide

## Quick Start

The chatbot is **already integrated** and appears on all pages automatically.

### Where to Find It
- **Location**: Bottom-right corner of every page
- **Icon**: Rose-colored circle with chat icon
- **Status**: Ready to use (no additional setup needed)

---

## Files Overview

### Core Files
```
src/components/chat/Chatbot.tsx        → Main UI component
src/lib/chatbot/chatbotLogic.ts        → Response logic
src/types/chatbot.types.ts             → TypeScript types
```

### Documentation
```
CHATBOT_SYSTEM.md                      → Comprehensive documentation
CHATBOT_QUICK_REFERENCE.md            → This file
src/components/chat/README.md         → Technical details
```

---

## Common Tasks

### 1. Update Product Prices
**File**: `src/lib/chatbot/chatbotLogic.ts`

Find the `PRODUCTS` array (lines 4-47) and update:
```typescript
{
  name: 'Standard Golf Cart',
  price: 9200,  // ← Change this
  // ...
}
```

Also update in response text:
- Line 175: General products response
- Line 186: Standard cart response
- Line 198: Premium cart response
- Line 209: Ultimate cart response
- Line 235: Pricing response

### 2. Update Contact Information
**File**: `src/lib/chatbot/chatbotLogic.ts`

Find the `CONTACT` object (lines 49-55):
```typescript
const CONTACT = {
  name: 'Warren',
  phone: '+64 021 560 307',  // ← Change this
  email: 'admin@clubcaddycarts.com',  // ← Change this
  location: 'Auckland, New Zealand'
}
```

### 3. Add New Response Pattern
**File**: `src/lib/chatbot/chatbotLogic.ts`

Add before the default fallback in `getEnglishResponse()` (before line 313):
```typescript
// Your new pattern
if (matchesPattern(input, ['keyword1', 'keyword2', 'keyword3'])) {
  return {
    text: "Your response here",
    links: [
      { text: 'Link text', url: '/your-page' }
    ]
  }
}
```

For Chinese, add to `getChineseResponse()` (before line 372).

### 4. Add New Nudge Message
**File**: `src/lib/chatbot/chatbotLogic.ts`

In `getContextualNudge()` function (lines 58-137):
```typescript
en: {
  '/your-page': [
    "Nudge message 1",
    "Nudge message 2"
  ]
}
```

### 5. Change Chatbot Appearance
**File**: `src/components/chat/Chatbot.tsx`

**Colors**:
- Line 233: Button gradient `from-rose-800 to-rose-900`
- Line 273: Header gradient `from-rose-800 to-rose-900`
- Line 394: Send button `from-rose-800 to-rose-900`

**Sizes**:
- Line 269: Chat window width `w-96` (384px)
- Line 270: Chat window height `600px`

### 6. Modify Nudge Timing
**File**: `src/components/chat/Chatbot.tsx`

Line 11: Change delay
```typescript
const NUDGE_DELAY = 4000 // 4 seconds → Change this
```

---

## Testing Commands

### Test User Inputs

**Greetings**
- "hello" or "hi" or "g'day"

**Products**
- "show me your products"
- "standard cart"
- "premium golf cart"
- "ultimate model"

**Technical**
- "72v technology"
- "what's the range?"
- "battery life"

**Pricing**
- "how much"
- "price"
- "cost"

**Services**
- "rental"
- "customize"
- "delivery"

**Contact**
- "contact"
- "phone number"
- "email"

**Comparison**
- "compare models"
- "difference between carts"

**Fallback**
- "random nonsense" (should give default response)

### Test Nudges

1. Open website
2. Wait 4 seconds
3. Nudge should appear
4. Verify message is contextual to current page

### Test Languages

1. Click language toggle in header
2. Chat greeting should update
3. Send message
4. Response should be in selected language

---

## Response Categories

### 15 Main Categories
1. ✅ Greetings (hello, hi, hey)
2. ✅ Farewells (bye, thanks, cheers)
3. ✅ Products - General
4. ✅ Standard Cart
5. ✅ Premium Cart
6. ✅ Ultimate Cart
7. ✅ 72V Technology
8. ✅ Range/Distance
9. ✅ Pricing
10. ✅ Rentals/Hire
11. ✅ Customization
12. ✅ Location/Delivery
13. ✅ Contact Information
14. ✅ Street Legal
15. ✅ Warranty/Service
16. ✅ Comparison
17. ✅ Golf-specific
18. ✅ Fallback (unknown)

---

## Language Support

### Supported Languages
- 🇺🇸 English (en)
- 🇨🇳 Chinese (zh)

### Translation Coverage
- ✅ UI elements
- ✅ Greeting messages
- ✅ All responses
- ✅ Nudge messages
- ✅ Button labels

---

## Key Features

### User Experience
✨ Floating widget in bottom-right
✨ Smooth animations
✨ Auto-scroll messages
✨ Typing indicators
✨ Context-aware nudges
✨ Mobile responsive

### Intelligence
🧠 Pattern matching
🧠 Context awareness
🧠 Bilingual support
🧠 Page-specific nudges
🧠 Rich link responses

### Design
🎨 Rose-800/900 theme
🎨 Refined typography
🎨 Framer Motion animations
🎨 Custom scrollbars
🎨 Gradient effects

---

## Troubleshooting

### Nudge Not Showing
1. Check localStorage: `club-caddy-nudge-dismissed`
2. Clear localStorage to reset
3. Refresh page
4. Wait full 4 seconds

### Wrong Language
1. Check header language toggle
2. Verify LanguageContext provider in layout
3. Test language switching

### Build Errors
The chatbot files are error-free. If build fails:
1. Check for unrelated errors in other files
2. Run `npm run dev` to test locally
3. Verify framer-motion is installed

### Messages Not Responding
1. Check browser console for errors
2. Verify chatbotLogic.ts is imported correctly
3. Test with simple keywords ("hello", "price")

---

## Performance Tips

### Optimization
- Chatbot lazy loads (no impact on initial load)
- Animations are GPU-accelerated
- LocalStorage usage is minimal
- Messages are lightweight

### Best Practices
- Keep response text concise
- Use links for detailed info
- Don't overload with nudges
- Test on mobile devices

---

## Quick Links

### Documentation
- **Full Documentation**: `CHATBOT_SYSTEM.md`
- **Technical README**: `src/components/chat/README.md`
- **This Guide**: `CHATBOT_QUICK_REFERENCE.md`

### Code Files
- **Main Component**: `src/components/chat/Chatbot.tsx`
- **Logic**: `src/lib/chatbot/chatbotLogic.ts`
- **Types**: `src/types/chatbot.types.ts`

### Package Dependencies
- framer-motion: ^12.23.25
- lucide-react: ^0.556.0
- react: ^19.0.0
- next: ^15.1.8

---

## Contact & Support

**Developer**: Warren
**Phone**: +64 021 560 307
**Email**: admin@clubcaddycarts.com
**Location**: Auckland, New Zealand

---

## Version Info

**Status**: ✅ Production Ready
**Last Updated**: 2025-12-10
**Version**: 1.0.0
**Framework**: Next.js 15.1.8

---

## Checklist: Is It Working?

- [ ] Chat button visible bottom-right
- [ ] Button pulses/animates
- [ ] Nudge appears after 4 seconds
- [ ] Chat opens when clicked
- [ ] Greeting message shows
- [ ] Can send messages
- [ ] Bot responds after typing
- [ ] Links work
- [ ] Language switches
- [ ] Mobile responsive
- [ ] Minimize/close works

If all checked ✅ → **Chatbot is working perfectly!**
