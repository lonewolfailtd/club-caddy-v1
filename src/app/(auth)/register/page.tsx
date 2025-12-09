'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const { language } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error } = await signUp(email, password, fullName)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 hexagon-pattern-minimal opacity-[0.02]" />

        <Card className="relative z-10 w-full max-w-md border-zinc-200 bg-white shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="refined-title text-3xl text-center text-zinc-900">
              {language === 'en' ? 'Check Your Email' : '检查您的邮箱'}
            </CardTitle>
            <CardDescription className="refined-body text-center text-zinc-600">
              {language === 'en' ? "We've sent you a confirmation email" : '我们已向您发送确认电子邮件'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-md bg-green-50 p-4 text-center border border-green-200">
              <p className="refined-body text-sm text-green-800">
                {language === 'en'
                  ? 'Please check your email inbox and click the confirmation link to activate your account.'
                  : '请检查您的电子邮件收件箱并点击确认链接以激活您的帐户。'}
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Link href="/login" className="w-full">
              <Button className="refined-body w-full bg-rose-800 hover:bg-rose-900 text-white font-semibold">
                {language === 'en' ? 'Go to Login' : '前往登录'}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Hexagon Pattern Overlay */}
      <div className="absolute inset-0 hexagon-pattern-minimal opacity-[0.02]" />

      <Card className="relative z-10 w-full max-w-md border-zinc-200 bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="refined-title text-3xl text-center text-zinc-900">
            {language === 'en' ? 'Create Account' : '创建账户'}
          </CardTitle>
          <CardDescription className="refined-body text-center text-zinc-600">
            {language === 'en' ? 'Join Club Caddy and start shopping' : '加入 Club Caddy 开始购物'}
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 refined-body text-sm text-red-800 border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName" className="refined-body text-zinc-700">
                {language === 'en' ? 'Full Name' : '全名'}
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder={language === 'en' ? 'John Smith' : '张三'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="refined-body border-zinc-300 focus:border-rose-800 focus:ring-rose-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="refined-body text-zinc-700">
                {language === 'en' ? 'Email' : '电子邮件'}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={language === 'en' ? 'you@example.com' : 'your@example.com'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="refined-body border-zinc-300 focus:border-rose-800 focus:ring-rose-800"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="refined-body text-zinc-700">
                {language === 'en' ? 'Password' : '密码'}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="refined-body border-zinc-300 focus:border-rose-800 focus:ring-rose-800"
              />
              <p className="refined-body text-xs text-zinc-500">
                {language === 'en' ? 'Must be at least 6 characters' : '至少需要 6 个字符'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="refined-body text-zinc-700">
                {language === 'en' ? 'Confirm Password' : '确认密码'}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="refined-body border-zinc-300 focus:border-rose-800 focus:ring-rose-800"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="refined-body w-full bg-rose-800 hover:bg-rose-900 text-white font-semibold"
              disabled={loading}
            >
              {loading
                ? (language === 'en' ? 'Creating account...' : '正在创建账户...')
                : (language === 'en' ? 'Create Account' : '创建账户')}
            </Button>

            <p className="refined-body text-center text-sm text-zinc-600">
              {language === 'en' ? 'Already have an account?' : '已有账户？'}{' '}
              <Link
                href="/login"
                className="text-rose-800 hover:text-rose-900 font-semibold transition-colors"
              >
                {language === 'en' ? 'Sign in' : '登录'}
              </Link>
            </p>

            <p className="refined-body text-center text-xs text-zinc-500">
              {language === 'en' ? 'By creating an account, you agree to our' : '创建账户即表示您同意我们的'}{' '}
              <Link href="/terms" className="text-rose-800 hover:underline">
                {language === 'en' ? 'Terms of Service' : '服务条款'}
              </Link>{' '}
              {language === 'en' ? 'and' : '和'}{' '}
              <Link href="/privacy" className="text-rose-800 hover:underline">
                {language === 'en' ? 'Privacy Policy' : '隐私政策'}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
