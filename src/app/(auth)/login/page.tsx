'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-luxury-onyx via-primary-900 to-luxury-onyx px-4 py-12 sm:px-6 lg:px-8">
      {/* Hexagon Pattern Overlay */}
      <div className="absolute inset-0 bg-hexagon opacity-10" />

      <Card className="relative z-10 w-full max-w-md border-luxury-gold/20 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="font-playfair text-3xl text-center text-luxury-onyx">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your Club Caddy account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-200">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-luxury-platinum/30 focus:border-luxury-gold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-luxury-platinum/30 focus:border-luxury-gold"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                href="/reset-password"
                className="text-primary-600 hover:text-primary-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-luxury-gold to-primary-600 hover:from-luxury-gold/90 hover:to-primary-700 text-white font-semibold"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                Create an account
              </Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <Link href="/" className="w-full">
              <Button type="button" variant="outline" className="w-full">
                Continue as Guest
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
