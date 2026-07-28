export interface CreditCard {
  id: string;
  name: string;
  bank: string;
  annual_fee: number;
  card_image_url?: string | null;
  raw_json?: {
    joining_fee_inr?: number | null;
    annual_fee_inr?: number | null;
    reward_rate_min_pct?: number | null;
    reward_rate_max_pct?: number | null;
    apr_max_pct?: number | null;
    forex_markup_pct?: number | null;
    fuel_surcharge_waiver?: boolean;
    has_lounge_access?: boolean;
    is_metal_card?: boolean;
    card_type?: string;
    best_for?: string;
    key_benefits?: string[];
    [key: string]: any;
  } | null;
  [key: string]: any;
}
