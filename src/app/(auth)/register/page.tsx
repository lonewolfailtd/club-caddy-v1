'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-luxury-onyx via-primary-900 to-luxury-onyx px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-hexagon opacity-10" />

        <Card className="relative z-10 w-full max-w-md border-luxury-gold/20 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="font-playfair text-3xl text-center text-luxury-onyx">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-center">
              We've sent you a confirmation email
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-md bg-green-50 p-4 text-center border border-green-200">
              <p className="text-sm text-green-800">
                Please check your email inbox and click the confirmation link to activate your account.
              </p>
            </div>
          </CardContent>

          <CardFooter>
            <Link href="/login" className="w-full">
              <Button className="w-full bg-gradient-to-r from-luxury-gold to-primary-600 hover:from-luxury-gold/90 hover:to-primary-700">
                Go to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-luxury-onyx via-primary-900 to-luxury-onyx px-4 py-12 sm:px-6 lg:px-8">
      {/* Hexagon Pattern Overlay */}
      <div className="absolute inset-0 bg-hexagon opacity-10" />

      <Card className="relative z-10 w-full max-w-md border-luxury-gold/20 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="font-playfair text-3xl text-center text-luxury-onyx">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Join Club Caddy and start shopping
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
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="border-luxury-platinum/30 focus:border-luxury-gold"
              />
            </div>

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
                minLength={6}
                className="border-luxury-platinum/30 focus:border-luxury-gold"
              />
              <p className="text-xs text-gray-500">
                Must be at least 6 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                className="border-luxury-platinum/30 focus:border-luxury-gold"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-luxury-gold to-primary-600 hover:from-luxury-gold/90 hover:to-primary-700 text-white font-semibold"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>

            <p className="text-center text-xs text-gray-500">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-primary-600 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
