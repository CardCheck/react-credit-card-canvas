import React from 'react'
import { CardCard } from './CardCard'
import { CreditCard } from './types'

const SAMPLE_CARDS: CreditCard[] = [
  {
    id: 'hdfc-regalia-gold',
    name: 'HDFC Regalia Gold Credit Card',
    bank: 'HDFC Bank',
    annual_fee: 2500,
    card_image_url: '/cards/hdfc-regalia-gold.webp',
    raw_json: {
      joining_fee_inr: 2500,
      annual_fee_inr: 2500,
      reward_rate_min_pct: 1.5,
      reward_rate_max_pct: 5.0,
      apr_max_pct: 42.0,
      forex_markup_pct: 2.0,
      fuel_surcharge_waiver: true,
      has_lounge_access: true,
      is_metal_card: false,
      best_for: 'Travel & Lifestyle',
      key_benefits: [
        'Complimentary Club Marriott membership for 1 year',
        '12 Airport Lounge accesses annually (Domestic & International)',
        '5X Reward Points on flight & hotel bookings',
      ],
    },
  },
  {
    id: 'sbi-cashback',
    name: 'SBI Cashback Credit Card',
    bank: 'SBI Card',
    annual_fee: 999,
    card_image_url: '/cards/sbi-cashback.webp',
    raw_json: {
      joining_fee_inr: 999,
      annual_fee_inr: 999,
      reward_rate_min_pct: 1.0,
      reward_rate_max_pct: 5.0,
      apr_max_pct: 42.0,
      forex_markup_pct: 3.5,
      fuel_surcharge_waiver: true,
      has_lounge_access: false,
      is_metal_card: false,
      best_for: 'Online Shopping',
      key_benefits: [
        '5% Cashback on online transactions across merchant platforms',
        '1% Cashback on offline spends and utility bills',
        'Annual fee waived on ₹2 Lakhs annual spend',
      ],
    },
  },
  {
    id: 'axis-magnus',
    name: 'Axis Bank Magnus Credit Card',
    bank: 'Axis Bank',
    annual_fee: 12500,
    card_image_url: '/cards/axis-magnus.webp',
    raw_json: {
      joining_fee_inr: 12500,
      annual_fee_inr: 12500,
      reward_rate_min_pct: 2.4,
      reward_rate_max_pct: 6.0,
      apr_max_pct: 42.0,
      forex_markup_pct: 2.0,
      fuel_surcharge_waiver: true,
      has_lounge_access: true,
      is_metal_card: true,
      best_for: 'Premium Travel',
      key_benefits: [
        'Unlimited Airport Lounge Access worldwide with guest privileges',
        'Luxury airport concierge & transfer services',
        '25,000 EDGE Reward points milestone bonus',
      ],
    },
  },
]

export function App() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-8 border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-700 mb-3">
          Standalone Open Source Component Demo
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">react-credit-card-canvas</h1>
        <p className="mt-2 text-slate-600 text-sm">
          Standalone showcase of the <code className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded font-mono font-semibold">CardCard</code> UI component running independently with real card assets.
        </p>
      </header>

      <div className="space-y-6">
        {SAMPLE_CARDS.map((card, idx) => (
          <CardCard key={card.id} card={card} index={idx} />
        ))}
      </div>

      <footer className="mt-12 text-center text-xs text-slate-400 border-t border-slate-200 pt-6">
        Powered by <a href="https://cardcheck.in" target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold hover:underline">CardCheck.in</a>
      </footer>
    </div>
  )
}
