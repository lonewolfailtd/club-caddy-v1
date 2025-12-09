'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const translations = {
  en: {
    badge: 'Get in Touch',
    title: 'Contact Us',
    subtitle: 'Have a question or ready to experience premium electric golf carts? Contact Warren and our team today.',
    formTitle: 'Send us a Message',
    formSubtitle: 'Fill out the form below and we\'ll get back to you within 24 hours',
    contactDetails: 'Contact Information',
    contactSubtitle: 'Reach out directly via phone, email, or visit us in Auckland',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    inquiryType: 'Inquiry Type',
    selectInquiry: 'Select inquiry type...',
    generalInquiry: 'General Inquiry',
    salesInquiry: 'Sales & Pricing',
    rentalsInquiry: 'Rentals & Hire',
    serviceSupport: 'Service & Support',
    customOrder: 'Custom Order',
    message: 'Message',
    messagePlaceholder: 'Tell us how we can help you...',
    sendMessage: 'Send Message',
    sending: 'Sending...',
    successTitle: 'Message Sent!',
    successMessage: 'Thank you for contacting us. We\'ll get back to you within 24 hours.',
    sendAnother: 'Send Another Message',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    locationLabel: 'Location',
    contactPerson: 'Contact',
    hoursLabel: 'Business Hours',
    hours: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 10:00 AM - 3:00 PM\nSunday: By Appointment',
    mapTitle: 'Our Location',
    mapSubtitle: 'Proudly serving Auckland and all of New Zealand',
    required: '* Required',
  },
  zh: {
    badge: '联系我们',
    title: '联系我们',
    subtitle: '有疑问或准备体验高级电动高尔夫球车？今天就联系Warren和我们的团队。',
    formTitle: '给我们留言',
    formSubtitle: '填写下面的表格，我们将在24小时内回复您',
    contactDetails: '联系信息',
    contactSubtitle: '通过电话、电子邮件直接联系我们，或访问我们在奥克兰的办公室',
    name: '姓名',
    email: '电子邮件',
    phone: '电话号码',
    inquiryType: '咨询类型',
    selectInquiry: '选择咨询类型...',
    generalInquiry: '一般咨询',
    salesInquiry: '销售和价格',
    rentalsInquiry: '租赁和雇用',
    serviceSupport: '服务和支持',
    customOrder: '定制订单',
    message: '留言',
    messagePlaceholder: '告诉我们如何帮助您...',
    sendMessage: '发送消息',
    sending: '发送中...',
    successTitle: '消息已发送！',
    successMessage: '感谢您与我们联系。我们将在24小时内回复您。',
    sendAnother: '发送另一条消息',
    phoneLabel: '电话',
    emailLabel: '电子邮件',
    locationLabel: '位置',
    contactPerson: '联系人',
    hoursLabel: '营业时间',
    hours: '周一至周五：上午9:00 - 下午5:00\n周六：上午10:00 - 下午3:00\n周日：预约',
    mapTitle: '我们的位置',
    mapSubtitle: '自豪地服务于奥克兰和整个新西兰',
    required: '* 必填',
  },
}

export default function ContactPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate form submission (you can integrate with your backend here)
    await new Promise(resolve => setTimeout(resolve, 1500))

    setSubmitted(true)
    setSubmitting(false)

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: '',
      message: '',
    })

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        .refined-title {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.01em;
        }
        .refined-body {
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.01em;
        }
        .hexagon-pattern-subtle {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23881337' stroke-width='0.8'/%3E%3C/svg%3E");
          background-size: 80px 80px;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-50 via-white to-zinc-50 py-20 overflow-hidden">
        {/* Hexagon pattern overlay */}
        <div className="absolute inset-0 hexagon-pattern-subtle opacity-[0.03] pointer-events-none"></div>

        {/* Elegant top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-800/30 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
            <span className="refined-body inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-[0.15em] text-rose-900 bg-rose-50 border border-rose-100">
              {t.badge}
            </span>
            <h1 className="refined-title text-5xl md:text-7xl font-bold text-zinc-900 mb-6">
              {t.title}
            </h1>
            <p className="refined-body text-lg md:text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 border border-zinc-200 shadow-sm"
            >
              <div className="mb-8">
                <h2 className="refined-title text-3xl font-bold text-zinc-900 mb-3">
                  {t.formTitle}
                </h2>
                <p className="refined-body text-zinc-600">
                  {t.formSubtitle}
                </p>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-sm flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="refined-body font-semibold text-green-900 mb-1">
                      {t.successTitle}
                    </h3>
                    <p className="refined-body text-sm text-green-700">
                      {t.successMessage}
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="refined-body block text-sm font-medium text-zinc-700 mb-2">
                    {t.name} <span className="text-rose-800">*</span>
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-zinc-300 focus:border-rose-800 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="refined-body block text-sm font-medium text-zinc-700 mb-2">
                    {t.email} <span className="text-rose-800">*</span>
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-zinc-300 focus:border-rose-800 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="refined-body block text-sm font-medium text-zinc-700 mb-2">
                    {t.phone}
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-zinc-300 focus:border-rose-800 focus:ring-rose-800"
                  />
                </div>

                <div>
                  <label className="refined-body block text-sm font-medium text-zinc-700 mb-2">
                    {t.inquiryType} <span className="text-rose-800">*</span>
                  </label>
                  <Select
                    required
                    value={formData.inquiryType}
                    onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                  >
                    <SelectTrigger className="w-full border-zinc-300 focus:border-rose-800 focus:ring-rose-800">
                      <SelectValue placeholder={t.selectInquiry} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">{t.generalInquiry}</SelectItem>
                      <SelectItem value="sales">{t.salesInquiry}</SelectItem>
                      <SelectItem value="rentals">{t.rentalsInquiry}</SelectItem>
                      <SelectItem value="service">{t.serviceSupport}</SelectItem>
                      <SelectItem value="custom">{t.customOrder}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="refined-body block text-sm font-medium text-zinc-700 mb-2">
                    {t.message} <span className="text-rose-800">*</span>
                  </label>
                  <Textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.messagePlaceholder}
                    className="w-full border-zinc-300 focus:border-rose-800 focus:ring-rose-800 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02, y: submitting ? 0 : -2 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className="w-full refined-body px-8 py-4 bg-zinc-900 text-white font-medium text-sm uppercase tracking-[0.1em] hover:bg-rose-900 transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t.sendMessage}
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="refined-title text-3xl font-bold text-zinc-900 mb-3">
                  {t.contactDetails}
                </h2>
                <p className="refined-body text-zinc-600 mb-8">
                  {t.contactSubtitle}
                </p>

                <div className="space-y-6">
                  {/* Phone */}
                  <motion.a
                    href="tel:+64021560307"
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-5 bg-white border border-zinc-200 hover:border-rose-800 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-rose-50 flex items-center justify-center group-hover:bg-rose-800 transition-colors duration-300">
                      <Phone className="w-5 h-5 text-rose-800 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="refined-body text-sm font-semibold text-zinc-900 uppercase tracking-wide mb-1">
                        {t.phoneLabel}
                      </h3>
                      <p className="refined-title text-xl text-zinc-900 font-semibold">
                        +64 021 560 307
                      </p>
                    </div>
                  </motion.a>

                  {/* Email */}
                  <motion.a
                    href="mailto:admin@clubcaddycarts.com"
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-5 bg-white border border-zinc-200 hover:border-rose-800 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-rose-50 flex items-center justify-center group-hover:bg-rose-800 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-rose-800 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="refined-body text-sm font-semibold text-zinc-900 uppercase tracking-wide mb-1">
                        {t.emailLabel}
                      </h3>
                      <p className="refined-title text-xl text-zinc-900 font-semibold break-all">
                        admin@clubcaddycarts.com
                      </p>
                    </div>
                  </motion.a>

                  {/* Location */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-5 bg-white border border-zinc-200 hover:border-rose-800 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-rose-50 flex items-center justify-center group-hover:bg-rose-800 transition-colors duration-300">
                      <MapPin className="w-5 h-5 text-rose-800 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="refined-body text-sm font-semibold text-zinc-900 uppercase tracking-wide mb-1">
                        {t.locationLabel}
                      </h3>
                      <p className="refined-title text-xl text-zinc-900 font-semibold">
                        Auckland, New Zealand
                      </p>
                      <p className="refined-body text-sm text-zinc-600 mt-1">
                        {t.contactPerson}: Warren
                      </p>
                    </div>
                  </motion.div>

                  {/* Business Hours */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 p-5 bg-white border border-zinc-200 hover:border-rose-800 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-rose-50 flex items-center justify-center group-hover:bg-rose-800 transition-colors duration-300">
                      <Clock className="w-5 h-5 text-rose-800 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="refined-body text-sm font-semibold text-zinc-900 uppercase tracking-wide mb-1">
                        {t.hoursLabel}
                      </h3>
                      <div className="refined-body text-base text-zinc-900 whitespace-pre-line leading-relaxed">
                        {t.hours}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 hexagon-pattern-subtle opacity-[0.02]"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="w-12 h-px bg-rose-800 mx-auto mb-6"></div>
            <h2 className="refined-title text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
              {t.mapTitle}
            </h2>
            <p className="refined-body text-lg text-zinc-600">
              {t.mapSubtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-[16/9] md:aspect-[21/9] bg-zinc-100 border border-zinc-200 overflow-hidden shadow-lg"
          >
            {/* Embedded Google Map - Replace with actual coordinates */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101912.01305395555!2d174.76349!3d-36.848461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47fb5a9ce6fb%3A0x500ef6143a29917!2sAuckland%2C%20New%20Zealand!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="refined-title text-3xl md:text-4xl font-semibold text-zinc-900 mb-4">
              {language === 'en'
                ? 'Ready to Experience Premium Golf Carts?'
                : '准备体验高级高尔夫球车？'}
            </h3>
            <p className="refined-body text-base text-zinc-600 mb-8 max-w-2xl mx-auto">
              {language === 'en'
                ? 'Contact Warren today to discuss your requirements, schedule a viewing, or request a custom quote.'
                : '今天就联系Warren讨论您的需求、安排查看或申请定制报价。'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="tel:+64021560307"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="refined-body px-10 py-4 bg-zinc-900 text-white font-medium text-sm uppercase tracking-[0.1em] hover:bg-rose-900 transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl"
              >
                {language === 'en' ? 'Call Now' : '立即致电'}
              </motion.a>
              <motion.a
                href="/quote"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="refined-body px-10 py-4 border-2 border-zinc-900 text-zinc-900 font-medium text-sm uppercase tracking-[0.1em] hover:border-rose-800 hover:text-rose-900 hover:bg-rose-50 transition-all duration-300 rounded-sm"
              >
                {language === 'en' ? 'Request Quote' : '申请报价'}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
