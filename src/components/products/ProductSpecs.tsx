'use client'

import { Battery, Gauge, Users, Zap, Disc, Monitor } from 'lucide-react'

interface ProductSpecsProps {
  specifications?: {
    battery?: string
    range?: string
    seating?: string
    top_speed?: string
    brakes?: string
    display?: string
    charging_time?: string
    motor?: string
    [key: string]: string | undefined
  }
}

const iconMap: Record<string, any> = {
  battery: Battery,
  range: Zap,
  seating: Users,
  top_speed: Gauge,
  brakes: Disc,
  display: Monitor,
}

export default function ProductSpecs({ specifications }: ProductSpecsProps) {
  if (!specifications) {
    return null
  }

  const entries = Object.entries(specifications)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(([key, value]) => {
        const Icon = iconMap[key] || Zap
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

        return (
          <div
            key={key}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-luxury-pearl p-6 shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-luxury-gold/10 to-primary-500/10 blur-2xl transition-all group-hover:scale-150" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {label}
                  </div>
                  <div className="mt-1 text-lg font-bold text-luxury-onyx">
                    {value}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
