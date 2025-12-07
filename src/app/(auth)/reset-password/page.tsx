'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    const { error } = await resetPassword(email)

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
              Password reset link sent
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-md bg-green-50 p-4 text-center border border-green-200">
              <p className="text-sm text-green-800">
                We've sent a password reset link to <strong>{email}</strong>.
                Please check your email and follow the instructions.
              </p>
            </div>

            <p className="text-sm text-gray-600 text-center">
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <Link href="/login" className="w-full">
              <Button className="w-full bg-gradient-to-r from-luxury-gold to-primary-600 hover:from-luxury-gold/90 hover:to-primary-700">
                Back to Login
              </Button>
            </Link>

            <Button
              variant="outline"
              onClick={() => setSuccess(false)}
              className="w-full"
            >
              Try Different Email
            </Button>
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
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email to receive a password reset link
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
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-luxury-platinum/30 focus:border-luxury-gold"
              />
              <p className="text-xs text-gray-500">
                We'll send a password reset link to this email
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-luxury-gold to-primary-600 hover:from-luxury-gold/90 hover:to-primary-700 text-white font-semibold"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                href="/login"
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
