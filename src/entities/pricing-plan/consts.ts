import type { PricingPlan } from './model'

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'trial',
    title: 'Пробное занятие',
    duration: '30 минут',
    price: 'Бесплатно',
    highlighted: false,
    features: [
      'Знакомство и определение уровня',
      'Разбор целей обучения',
      'Без обязательств',
    ],
  },
  {
    id: 'single',
    title: 'Индивидуальное',
    duration: '60 минут',
    price: '1 100 ₽',
    period: '/ занятие',
    badge: 'Популярно',
    highlighted: true,
    features: [
      'Персональный план обучения',
      'Домашние задания',
      'Поддержка в Telegram',
      'Запись занятий',
    ],
  },
  {
    id: 'pack',
    title: 'Пакет 8 занятий',
    duration: '60 минут',
    price: '7 920 ₽',
    period: '(скидка 10%)',
    highlighted: false,
    features: [
      'Всё из индивидуального',
      'Приоритетное расписание',
      'Проверка проектов',
      'Скидка 10%',
    ],
  },
]
