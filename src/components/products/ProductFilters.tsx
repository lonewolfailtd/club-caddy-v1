'use client'

import { useState } from 'react'

export type TierFilter = 'all' | 'standard' | 'premium' | 'ultimate'
export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc'

export interface PriceRange {
  min: number
  max: number
}

export interface FilterState {
  tier: TierFilter
  priceRange: PriceRange
  sort: SortOption
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
  minPrice: number
  maxPrice: number
}

export default function ProductFilters({
  onFilterChange,
  minPrice,
  maxPrice,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    tier: 'all',
    priceRange: { min: minPrice, max: maxPrice },
    sort: 'price-asc',
  })

  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const handleFilterUpdate = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const tierOptions: { value: TierFilter; label: string; gradient: string }[] = [
    { value: 'all', label: 'All Tiers', gradient: 'from-gray-600 to-gray-400' },
    { value: 'standard', label: 'Standard', gradient: 'from-blue-600 to-cyan-500' },
    { value: 'premium', label: 'Premium', gradient: 'from-purple-600 to-pink-500' },
    { value: 'ultimate', label: 'Ultimate', gradient: 'from-amber-500 to-yellow-500' },
  ]

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ]

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Tier Filter */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-luxury-onyx">
          Filter by Tier
        </h3>
        <div className="space-y-2">
          {tierOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterUpdate({ tier: option.value })}
              className={`group relative w-full overflow-hidden rounded-lg border-2 p-4 text-left transition-all duration-300 ${
                filters.tier === option.value
                  ? 'border-luxury-gold shadow-lg'
                  : 'border-luxury-platinum hover:border-luxury-gold/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-luxury-onyx">{option.label}</span>
                {filters.tier === option.value && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-luxury-gold to-yellow-500">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div
                className={`mt-2 h-1 rounded-full bg-gradient-to-r ${option.gradient} transition-opacity duration-300 ${
                  filters.tier === option.value ? 'opacity-100' : 'opacity-40'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-luxury-onyx">
          Price Range
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-600">
              Minimum: ${filters.priceRange.min.toLocaleString()}
            </label>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              step={1000}
              value={filters.priceRange.min}
              onChange={(e) =>
                handleFilterUpdate({
                  priceRange: {
                    ...filters.priceRange,
                    min: Number(e.target.value),
                  },
                })
              }
              className="w-full accent-luxury-gold"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-600">
              Maximum: ${filters.priceRange.max.toLocaleString()}
            </label>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              step={1000}
              value={filters.priceRange.max}
              onChange={(e) =>
                handleFilterUpdate({
                  priceRange: {
                    ...filters.priceRange,
                    max: Number(e.target.value),
                  },
                })
              }
              className="w-full accent-luxury-gold"
            />
          </div>
          <div className="rounded-lg bg-gradient-to-r from-luxury-gold/10 to-yellow-500/10 p-4">
            <div className="text-center text-sm font-semibold text-luxury-onyx">
              ${filters.priceRange.min.toLocaleString()} - $
              {filters.priceRange.max.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-luxury-onyx">
          Sort By
        </h3>
        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) => handleFilterUpdate({ sort: e.target.value as SortOption })}
            className="w-full appearance-none rounded-lg border-2 border-luxury-platinum bg-white px-4 py-3 pr-10 font-semibold text-luxury-onyx transition-all duration-300 hover:border-luxury-gold focus:border-luxury-gold focus:outline-none focus:ring-2 focus:ring-luxury-gold/20"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <svg
              className="h-5 w-5 text-luxury-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={() =>
          handleFilterUpdate({
            tier: 'all',
            priceRange: { min: minPrice, max: maxPrice },
            sort: 'price-asc',
          })
        }
        className="w-full rounded-lg border-2 border-luxury-gold bg-white px-6 py-3 font-semibold text-luxury-onyx transition-all duration-300 hover:bg-luxury-gold hover:text-white"
      >
        Reset Filters
      </button>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border-2 border-luxury-platinum bg-white p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between border-b border-luxury-platinum pb-4">
            <h2 className="text-xl font-bold text-luxury-onyx">Filters</h2>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-luxury-gold to-yellow-500">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="btn-luxury fixed bottom-6 right-6 z-40 flex items-center gap-2 shadow-2xl"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </button>

        {/* Mobile Filter Drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMobileFilters(false)}
            />

            {/* Drawer */}
            <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-luxury-onyx">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-luxury-pearl text-luxury-onyx transition-colors hover:bg-luxury-gold hover:text-white"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <FilterContent />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
