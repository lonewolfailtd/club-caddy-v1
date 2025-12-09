'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { language } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Hexagon Pattern Overlay */}
      <div className="absolute inset-0 hexagon-pattern-minimal opacity-[0.02]" />

      <Card className="relative z-10 w-full max-w-md border-zinc-200 bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="refined-title text-3xl text-center text-zinc-900">
            {language === 'en' ? 'Welcome Back' : '欢迎回来'}
          </CardTitle>
          <CardDescription className="refined-body text-center text-zinc-600">
            {language === 'en' ? 'Sign in to your Club Caddy account' : '登录您的 Club Caddy 账户'}
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
                className="refined-body border-zinc-300 focus:border-rose-800 focus:ring-rose-800"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                href="/reset-password"
                className="refined-body text-rose-800 hover:text-rose-900 transition-colors"
              >
                {language === 'en' ? 'Forgot password?' : '忘记密码？'}
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="refined-body w-full bg-rose-800 hover:bg-rose-900 text-white font-semibold"
              disabled={loading}
            >
              {loading
                ? (language === 'en' ? 'Signing in...' : '正在登录...')
                : (language === 'en' ? 'Sign In' : '登录')}
            </Button>

            <p className="refined-body text-center text-sm text-zinc-600">
              {language === 'en' ? "Don't have an account?" : '还没有账户？'}{' '}
              <Link
                href="/register"
                className="text-rose-800 hover:text-rose-900 font-semibold transition-colors"
              >
                {language === 'en' ? 'Create an account' : '创建账户'}
              </Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="refined-body bg-white px-2 text-zinc-500">
                  {language === 'en' ? 'Or' : '或'}
                </span>
              </div>
            </div>

            <Link href="/" className="w-full">
              <Button type="button" variant="outline" className="refined-body w-full border-zinc-300 text-zinc-700 hover:bg-zinc-50">
                {language === 'en' ? 'Continue as Guest' : '以访客身份继续'}
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
