export interface PricingPlan {
  id: string
  title: string
  duration: string
  price: string
  period?: string
  badge?: string
  highlighted: boolean
  features: string[]
}

export { PRICING_PLANS } from './consts'
