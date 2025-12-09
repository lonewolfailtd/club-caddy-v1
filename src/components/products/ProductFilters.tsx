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
  language?: 'en' | 'zh'
}

// Bilingual translations
const translations = {
  en: {
    filters: 'Filters',
    filterByTier: 'Filter by Tier',
    allTiers: 'All Tiers',
    standard: 'Standard',
    premium: 'Premium',
    ultimate: 'Ultimate',
    priceRange: 'Price Range',
    minimum: 'Minimum',
    maximum: 'Maximum',
    sortBy: 'Sort By',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    nameAtoZ: 'Name: A to Z',
    nameZtoA: 'Name: Z to A',
    resetFilters: 'Reset Filters'
  },
  zh: {
    filters: '筛选',
    filterByTier: '按级别筛选',
    allTiers: '所有级别',
    standard: '标准版',
    premium: '高级版',
    ultimate: '旗舰版',
    priceRange: '价格范围',
    minimum: '最低价',
    maximum: '最高价',
    sortBy: '排序方式',
    priceLowToHigh: '价格：从低到高',
    priceHighToLow: '价格：从高到低',
    nameAtoZ: '名称：A到Z',
    nameZtoA: '名称：Z到A',
    resetFilters: '重置筛选'
  }
}

export default function ProductFilters({
  onFilterChange,
  minPrice,
  maxPrice,
  language = 'en',
}: ProductFiltersProps) {
  const t = translations[language]

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

  const tierOptions: { value: TierFilter; label: string; accent: string }[] = [
    { value: 'all', label: t.allTiers, accent: 'zinc-400' },
    { value: 'standard', label: t.standard, accent: 'zinc-600' },
    { value: 'premium', label: t.premium, accent: 'rose-800' },
    { value: 'ultimate', label: t.ultimate, accent: 'zinc-700' },
  ]

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'price-asc', label: t.priceLowToHigh },
    { value: 'price-desc', label: t.priceHighToLow },
    { value: 'name-asc', label: t.nameAtoZ },
    { value: 'name-desc', label: t.nameZtoA },
  ]

  const FilterContent = () => (
    <div className="space-y-8">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap');

        .refined-body {
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.01em;
        }
      `}</style>

      {/* Tier Filter */}
      <div>
        <h3 className="refined-body mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-900">
          {t.filterByTier}
        </h3>
        <div className="space-y-2">
          {tierOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterUpdate({ tier: option.value })}
              className={`group relative w-full rounded-sm border p-4 text-left transition-all duration-300 ${
                filters.tier === option.value
                  ? 'border-rose-800 bg-rose-50 shadow-sm'
                  : 'border-zinc-200 bg-white hover:border-zinc-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="refined-body font-medium text-zinc-900">{option.label}</span>
                {filters.tier === option.value && (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-800">
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="refined-body mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-900">
          {t.priceRange}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="refined-body mb-2 block text-xs text-zinc-600">
              {t.minimum}: ${filters.priceRange.min.toLocaleString()}
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
              className="w-full accent-rose-800"
            />
          </div>
          <div>
            <label className="refined-body mb-2 block text-xs text-zinc-600">
              {t.maximum}: ${filters.priceRange.max.toLocaleString()}
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
              className="w-full accent-rose-800"
            />
          </div>
          <div className="rounded-sm bg-zinc-50 p-4 border border-zinc-200">
            <div className="refined-body text-center text-sm font-semibold text-zinc-900">
              ${filters.priceRange.min.toLocaleString()} - $
              {filters.priceRange.max.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="refined-body mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-900">
          {t.sortBy}
        </h3>
        <div className="relative">
          <select
            value={filters.sort}
            onChange={(e) => handleFilterUpdate({ sort: e.target.value as SortOption })}
            className="refined-body w-full appearance-none rounded-sm border-2 border-zinc-200 bg-white px-4 py-3 pr-10 font-medium text-zinc-900 transition-all duration-300 hover:border-zinc-400 focus:border-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-800/20"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <svg
              className="h-5 w-5 text-rose-800"
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
        className="refined-body w-full rounded-sm border-2 border-zinc-900 bg-white px-6 py-3 font-medium text-zinc-900 transition-all duration-300 hover:bg-zinc-900 hover:text-white text-xs uppercase tracking-wider"
      >
        {t.resetFilters}
      </button>
    </div>
  )

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-sm border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-zinc-200 pb-4">
            <h2 className="refined-body text-lg font-semibold text-zinc-900">{t.filters}</h2>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-800">
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
          className="refined-body fixed bottom-6 right-6 z-40 flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-full shadow-lg hover:bg-rose-900 transition-all text-sm font-medium uppercase tracking-wider"
        >
          <svg
            className="h-4 w-4"
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
          {t.filters}
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
            <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="refined-body text-2xl font-bold text-zinc-900">{t.filters}</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-colors hover:bg-rose-800 hover:text-white"
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
