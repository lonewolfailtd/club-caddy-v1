export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  links?: MessageLink[]
}

export interface MessageLink {
  text: string
  url: string
}

export interface ChatbotResponse {
  text: string
  links?: MessageLink[]
}

export interface ChatbotTranslations {
  en: {
    greeting: string
    placeholder: string
    send: string
    minimize: string
    close: string
    typing: string
  }
  zh: {
    greeting: string
    placeholder: string
    send: string
    minimize: string
    close: string
    typing: string
  }
}

export type Language = 'en' | 'zh'

export interface ProductInfo {
  name: string
  price: number
  features: string[]
  slug: string
}
