'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard } from './types'
import {
  CreditCard as CreditCardIcon,
  Star,
  Gift,
  Plane,
  Fuel,
  Globe,
  Percent,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  IndianRupee,
  Shield,
  Sparkles,
  ShoppingBag,
  Wallet,
  GitCompareArrows,
} from 'lucide-react'

interface CardCardProps {
  card: CreditCard
  index?: number
  onApply?: (cardId: string) => void
  onCompareToggle?: (cardId: string) => void
  onFavoriteToggle?: (cardId: string) => void
  isCompared?: boolean
  isFavorite?: boolean
}

function rj(card: CreditCard): Record<string, any> {
  return (card.raw_json && typeof card.raw_json === 'object' ? card.raw_json : {}) as Record<string, any>
}

function fmt(v: number | null | undefined): string {
  if (v == null) return '—'
  if (v === 0) return 'Free'
  return `₹${Number(v).toLocaleString('en-IN')}`
}

function featureTags(card: CreditCard) {
  const d = rj(card)
  const tags: { label: string; icon: typeof Star }[] = []

  if (d.fuel_surcharge_waiver)
    tags.push({ label: 'Fuel Waiver', icon: Fuel })
  if (d.has_lounge_access || d.lounge_access)
    tags.push({ label: 'Lounge Access', icon: Plane })
  if ((d.reward_rate_max_pct ?? 0) >= 3)
    tags.push({ label: 'High Rewards', icon: Sparkles })
  if ((d.forex_markup_pct ?? 99) < 2)
    tags.push({ label: 'Low Forex', icon: Globe })
  if (d.key_benefits?.some((b: string) => /welcome|bonus/i.test(b)))
    tags.push({ label: 'Welcome Bonus', icon: Gift })
  if (d.card_type === 'Co-branded' || d.best_for?.toLowerCase().includes('shopping') || d.best_for?.toLowerCase().includes('amazon'))
    tags.push({ label: 'Shopping', icon: ShoppingBag })
  if (d.is_metal_card)
    tags.push({ label: 'Metal Card', icon: Shield })

  return tags.slice(0, 4)
}

export function CardCard({
  card,
  index = 0,
  onApply,
  onCompareToggle,
  onFavoriteToggle,
  isCompared = false,
  isFavorite = false,
}: CardCardProps) {
  const [selected, setSelected] = useState(isCompared)
  const [fav, setFav] = useState(isFavorite)
  const d = rj(card)
  const joiningFee = d.joining_fee_inr ?? card.annual_fee
  const annualFee = d.annual_fee_inr ?? card.annual_fee
  const rateMin = d.reward_rate_min_pct
  const rateMax = d.reward_rate_max_pct
  const aprMax = d.apr_max_pct
  const bestFor = d.best_for
  const tags = featureTags(card)
  const imgUrl = card.card_image_url || d.card_image_url
  const keyBenefits: string[] = (d.key_benefits || []).slice(0, 3)

  const rewardLabel =
    rateMin != null && rateMax != null
      ? rateMin === rateMax
        ? `${rateMax}%`
        : `${rateMin}–${rateMax}%`
      : rateMax != null
      ? `Up to ${rateMax}%`
      : rateMin != null
      ? `${rateMin}%+`
      : null

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelected(!selected)
    onCompareToggle?.(card.id)
  }

  const handleFavClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFav(!fav)
    onFavoriteToggle?.(card.id)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
    >
      <div className="block group cursor-pointer">
        <article className={`rounded-2xl border-2 bg-white shadow-sm transition-all duration-200 hover:shadow-lg overflow-hidden ${selected ? 'border-indigo-400 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-indigo-200'}`}>
          <div className="flex flex-col sm:flex-row">

            {/* Left: full card art */}
            <div className="flex w-full flex-shrink-0 overflow-hidden border-b border-slate-100 bg-slate-50 sm:w-[248px] sm:border-b-0 sm:border-r sm:border-slate-100">
              <div className="flex w-full flex-col items-center justify-center px-3 py-4 sm:px-4 sm:py-6">
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={card.name}
                    className="h-auto max-h-[168px] w-full max-w-[300px] rounded-lg object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-[1.02] sm:max-h-[200px]"
                  />
                ) : (
                  <div className="flex h-[140px] w-[220px] flex-col items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-md">
                    <CreditCardIcon className="h-10 w-10 text-white/30" />
                    <span className="text-[10px] font-medium text-white/25">{card.bank}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Card details */}
            <div className="flex flex-1 flex-col p-5">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700">
                      {card.name}
                    </h3>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-500">{card.bank}</p>
                    <span className="text-slate-200">|</span>
                    <button
                      type="button"
                      onClick={handleFavClick}
                      className={`text-sm transition ${fav ? 'text-red-500' : 'text-slate-300 hover:text-red-400'}`}
                    >
                      {fav ? '♥' : '♡'}
                    </button>
                  </div>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden flex-shrink-0 gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={handleCompareClick}
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold leading-none shadow-md transition-all ${
                      selected
                        ? 'border-2 border-indigo-500 bg-indigo-600 text-white'
                        : 'border-2 border-indigo-200 bg-indigo-50 text-indigo-950 hover:border-indigo-300 hover:bg-indigo-100'
                    }`}
                  >
                    <GitCompareArrows className="h-3 w-3 shrink-0" />
                    {selected ? 'Added' : 'Compare'}
                  </button>
                  <button
                    type="button"
                    onClick={() => onApply?.(card.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700"
                  >
                    Apply now
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Best for */}
              {bestFor && (
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full border border-indigo-200 bg-transparent px-3 py-1 text-xs font-semibold text-indigo-700">
                    Best for {bestFor}
                  </span>
                </div>
              )}

              {/* Feature tags */}
              {tags.length > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {tags.map(({ label, icon: Icon }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium text-indigo-700 bg-indigo-50 border-indigo-100"
                    >
                      <Icon className="h-3 w-3" />
                      {label}
                    </span>
                  ))}
                </div>
              )}

              {/* Key benefits */}
              {keyBenefits.length > 0 && (
                <ul className="mt-3 hidden space-y-1 sm:block">
                  {keyBenefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-slate-600 leading-snug">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-indigo-500" />
                      <span className="line-clamp-1">{b}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex-1" />

              {/* Quick stats row */}
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    label: 'Joining Fee',
                    value: fmt(joiningFee),
                    icon: Wallet,
                    highlight: joiningFee === 0,
                  },
                  {
                    label: 'Annual Fee',
                    value: fmt(annualFee),
                    icon: IndianRupee,
                    highlight: annualFee === 0,
                  },
                  {
                    label: 'Reward Rate',
                    value: rewardLabel,
                    icon: Percent,
                    highlight: (rateMax ?? 0) >= 3,
                  },
                  {
                    label: 'APR',
                    value: aprMax != null ? `${aprMax}%` : null,
                    icon: Shield,
                    highlight: false,
                  },
                ].filter(s => s.value != null).map(({ label, value, icon: Icon, highlight }) => (
                  <div key={label} className="rounded-lg bg-slate-50 px-3 py-2">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Icon className="h-3 w-3 text-indigo-600" />
                      <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{label}</span>
                    </div>
                    <p className={`text-sm font-bold ${highlight ? 'text-emerald-600' : 'text-slate-800'}`}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </motion.div>
  )
}
