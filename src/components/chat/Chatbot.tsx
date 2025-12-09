'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, MinusCircle, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { usePathname } from 'next/navigation'
import { getChatbotResponse, getContextualNudge } from '@/lib/chatbot/chatbotLogic'
import { Message, ChatbotTranslations } from '@/types/chatbot.types'

const NUDGE_DELAY = 4000 // 4 seconds
const NUDGE_STORAGE_KEY = 'club-caddy-nudge-dismissed'

const translations: ChatbotTranslations = {
  en: {
    greeting: "G'day! I'm Caddy, your golf cart expert. How can I help you today?",
    placeholder: 'Ask me anything about our carts...',
    send: 'Send',
    minimize: 'Minimize',
    close: 'Close chat',
    typing: 'Caddy is typing...'
  },
  zh: {
    greeting: '您好！我是Caddy，您的高尔夫球车专家。我今天能为您做些什么？',
    placeholder: '问我关于我们的球车的任何问题...',
    send: '发送',
    minimize: '最小化',
    close: '关闭聊天',
    typing: 'Caddy正在输入...'
  }
}

export default function Chatbot() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const t = translations[language]

  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showNudge, setShowNudge] = useState(false)
  const [nudgeMessage, setNudgeMessage] = useState('')
  const [hasInteracted, setHasInteracted] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize with greeting message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          text: t.greeting,
          sender: 'bot',
          timestamp: new Date()
        }
      ])
    }
  }, [language]) // Reset greeting when language changes

  // Nudge system
  useEffect(() => {
    const nudgeDismissed = localStorage.getItem(NUDGE_STORAGE_KEY)

    if (!nudgeDismissed && !hasInteracted && !isOpen) {
      const timer = setTimeout(() => {
        const contextualNudge = getContextualNudge(pathname, language)
        setNudgeMessage(contextualNudge)
        setShowNudge(true)
      }, NUDGE_DELAY)

      return () => clearTimeout(timer)
    }
  }, [pathname, language, hasInteracted, isOpen])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleNudgeClick = () => {
    setShowNudge(false)
    setIsOpen(true)
    setHasInteracted(true)
  }

  const handleDismissNudge = () => {
    setShowNudge(false)
    localStorage.setItem(NUDGE_STORAGE_KEY, 'true')
  }

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    setShowNudge(false)
    setHasInteracted(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = getChatbotResponse(inputValue, pathname, language)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        links: response.links
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Nudge Message */}
      <AnimatePresence>
        {showNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-[9998] max-w-sm"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-transparent pointer-events-none" />

              <div className="relative p-4 pr-10">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-rose-800 to-rose-900 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-rose-900 refined-title mb-1">
                      Caddy here!
                    </p>
                    <p className="text-sm text-gray-700 refined-body leading-relaxed">
                      {nudgeMessage}
                    </p>
                    <button
                      onClick={handleNudgeClick}
                      className="mt-3 text-sm font-semibold text-rose-800 hover:text-rose-900 transition-colors refined-body"
                    >
                      {language === 'en' ? 'Chat with me' : '与我聊天'} →
                    </button>
                  </div>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={handleDismissNudge}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Animated border */}
              <motion.div
                className="absolute inset-0 border-2 border-rose-800/20 rounded-2xl pointer-events-none"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // Floating Chat Button
            <motion.button
              key="chat-button"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="group relative w-16 h-16 bg-gradient-to-br from-rose-800 to-rose-900 rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
              aria-label="Open chat"
            >
              {/* Animated background pulse */}
              <motion.div
                className="absolute inset-0 bg-rose-700"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <MessageCircle className="w-7 h-7 text-white relative z-10 group-hover:scale-110 transition-transform" />

              {/* Notification dot */}
              {!hasInteracted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                />
              )}
            </motion.button>
          ) : (
            // Chat Window
            <motion.div
              key="chat-window"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-96 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-rose-100 flex flex-col"
              style={{ height: isMinimized ? 'auto' : '600px', maxHeight: 'calc(100vh - 8rem)' }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-rose-800 to-rose-900 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-rose-800" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold refined-title text-lg">
                      Caddy
                    </h3>
                    <p className="text-rose-100 text-xs refined-body">
                      {language === 'en' ? 'Golf Cart Expert' : '高尔夫球车专家'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMinimize}
                    className="text-white/80 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                    aria-label={t.minimize}
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleClose}
                    className="text-white/80 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-lg"
                    aria-label={t.close}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              {!isMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-rose-50/30 to-white scrollbar-thin scrollbar-thumb-rose-200 scrollbar-track-transparent">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            message.sender === 'user'
                              ? 'bg-rose-800 text-white rounded-br-sm'
                              : 'bg-white border border-rose-100 text-gray-800 rounded-bl-sm shadow-sm'
                          }`}
                        >
                          <p className="text-sm refined-body leading-relaxed whitespace-pre-wrap">
                            {message.text}
                          </p>
                          {message.links && message.links.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {message.links.map((link, i) => (
                                <a
                                  key={i}
                                  href={link.url}
                                  className="block text-sm font-medium text-rose-800 hover:text-rose-900 transition-colors refined-body hover:underline"
                                >
                                  {link.text} →
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-white border border-rose-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                          <div className="flex gap-1.5">
                            <motion.div
                              className="w-2 h-2 bg-rose-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-rose-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-rose-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-rose-100 bg-white p-4">
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t.placeholder}
                        className="flex-1 px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-800/20 focus:border-rose-800 transition-all refined-body text-sm"
                        disabled={isTyping}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="px-4 py-3 bg-gradient-to-r from-rose-800 to-rose-900 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        aria-label={t.send}
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
