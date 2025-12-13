'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Check, X, Lock, User, Mail, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface AccountCreationModalProps {
  isOpen: boolean
  onClose: () => void
  customerName: string
  customerEmail: string
  customerPhone?: string
}

export default function AccountCreationModal({
  isOpen,
  onClose,
  customerName,
  customerEmail,
  customerPhone,
}: AccountCreationModalProps) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const { signUp, user } = useAuth()

  // Don't show if user is already logged in
  if (user) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

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

    try {
      const { user: newUser, error: signUpError } = await signUp(customerEmail, password, customerName)

      if (signUpError) {
        // Check if user already exists
        if (signUpError.message.toLowerCase().includes('already registered') ||
            signUpError.message.toLowerCase().includes('already exists') ||
            signUpError.message.toLowerCase().includes('user already registered')) {
          setAlreadyRegistered(true)
          setLoading(false)
        } else {
          setError(signUpError.message)
          setLoading(false)
        }
      } else if (newUser) {
        // Link any existing orders with this email to the new user account
        const supabase = createClient()
        const { data: linkedOrders, error: linkError } = await supabase
          .from('orders')
          .update({ user_id: newUser.id })
          .eq('customer_email', customerEmail)
          .is('user_id', null)
          .select()

        if (!linkError && linkedOrders && linkedOrders.length > 0) {
          console.log(`✅ Linked ${linkedOrders.length} order(s) to new account`)
        }

        setSuccess(true)
        setLoading(false)
        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose()
        }, 3000)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="refined-title text-2xl font-bold text-green-900 mb-2 text-center">
              Account Created Successfully!
            </h3>
            <p className="refined-body text-green-800 mb-4 text-center">
              We've sent a confirmation email to <strong>{customerEmail}</strong>.
              Please check your inbox and click the confirmation link to activate your account.
            </p>
            <div className="bg-white rounded-sm p-4 border border-green-200 w-full">
              <p className="refined-body text-sm text-green-900 font-semibold mb-2">
                What's Next?
              </p>
              <ul className="refined-body text-sm text-green-800 space-y-1">
                <li>• Check your email for the confirmation link</li>
                <li>• Activate your account by clicking the link</li>
                <li>• Sign in to track your orders</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (alreadyRegistered) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="refined-title text-2xl font-bold text-zinc-900 mb-2 text-center">
              Account Already Exists
            </h3>
            <p className="refined-body text-zinc-700 mb-4 text-center">
              Good news! An account with <strong>{customerEmail}</strong> is already registered.
            </p>
            <div className="bg-blue-50 rounded-sm p-4 border border-blue-200 w-full mb-4">
              <p className="refined-body text-sm text-blue-900 mb-3">
                Please sign in to access your account and view your orders.
              </p>
              <ul className="refined-body text-sm text-blue-800 space-y-1">
                <li>• Track all your orders in one place</li>
                <li>• Faster checkout for future purchases</li>
                <li>• View order history and invoices</li>
              </ul>
            </div>
            <div className="flex gap-3 w-full">
              <Button
                onClick={() => window.location.href = '/login'}
                className="flex-1 bg-rose-800 hover:bg-rose-900 text-white refined-body font-semibold py-3"
              >
                Sign In
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="border-zinc-300 hover:bg-zinc-100 text-zinc-700 refined-body font-semibold"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="refined-title text-2xl font-bold text-zinc-900">
              Create Your Account
            </span>
          </DialogTitle>
          <DialogDescription className="refined-body text-zinc-600">
            Save your information for faster checkout next time and track all your orders in one place.
          </DialogDescription>
        </DialogHeader>

        {/* Benefits */}
        <div className="bg-rose-50 rounded-sm p-4 border border-rose-200">
          <p className="refined-body text-sm font-semibold text-zinc-900 mb-3">
            Account Benefits:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <span className="refined-body text-sm text-zinc-700">Track orders</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <span className="refined-body text-sm text-zinc-700">Faster checkout</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <span className="refined-body text-sm text-zinc-700">Order history</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <span className="refined-body text-sm text-zinc-700">Special offers</span>
            </div>
          </div>
        </div>

        {/* Pre-filled Information Display */}
        <div className="bg-white rounded-sm p-4 border border-zinc-200">
          <p className="refined-body text-xs text-zinc-500 uppercase tracking-wider mb-3">
            Your Information
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-rose-600" />
              <span className="refined-body text-zinc-900 font-medium">{customerName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-rose-600" />
              <span className="refined-body text-zinc-900 font-medium">{customerEmail}</span>
            </div>
            {customerPhone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-rose-600" />
                <span className="refined-body text-zinc-900 font-medium">{customerPhone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-sm bg-red-50 p-3 refined-body text-sm text-red-800 border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="refined-body text-zinc-700 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Choose a Password
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
              disabled={loading}
            />
            <p className="refined-body text-xs text-zinc-500">
              Must be at least 6 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="refined-body text-zinc-700 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Confirm Password
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
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-rose-800 hover:bg-rose-900 text-white refined-body font-semibold py-3"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-zinc-300 hover:bg-zinc-100 text-zinc-700 refined-body font-semibold"
            >
              Skip
            </Button>
          </div>

          <p className="refined-body text-center text-xs text-zinc-500">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="text-rose-800 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-rose-800 hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
