'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm border border-zinc-200 rounded-full text-zinc-900 hover:border-rose-800 hover:bg-white transition-all shadow-sm hover:shadow-md"
    >
      <span className="text-xs font-medium uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}>
        {language === 'en' ? '中文' : 'EN'}
      </span>
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    </motion.button>
  )
}
