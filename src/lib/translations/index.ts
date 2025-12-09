export { commonTranslations } from './common'
export { homeTranslations } from './home'
export { productsTranslations } from './products'

// Type definitions for translations
export type Language = 'en' | 'zh'

// Helper function to get translations for a specific language
export function getTranslations<T extends Record<Language, any>>(
  translations: T,
  language: Language
): T[Language] {
  return translations[language]
}
