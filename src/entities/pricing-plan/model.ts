export interface PricingPlan {
  id: string
  title: string
  duration: string
  price: string
  oldPrice?: string
  period?: string
  badge?: string
  discountBadge?: string
  highlighted: boolean
  features: string[]
}

export { PRICING_PLANS } from './consts'
