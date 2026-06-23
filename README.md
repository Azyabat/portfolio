# Азамат Салькаев — Сайт репетитора по программированию

## Стек
- **Next.js 14** (App Router)
- **TypeScript**
- **Framer Motion** — анимации
- **CSS Modules** — стили
- **Feature-Slice Design (FSD)** — архитектура

## Архитектура FSD

```
src/
├── app/                    # Next.js App Router (layout, page, globals.css)
├── pages/
│   └── home/ui/            # HomePage — компоновка всех виджетов
├── widgets/                # Крупные секции страницы
│   ├── header/
│   ├── hero/
│   ├── about/
│   ├── audience/
│   ├── curriculum/
│   ├── projects/
│   ├── how-it-works/
│   ├── reviews/
│   ├── pricing/
│   ├── faq/
│   ├── contact/
│   └── footer/
├── features/               # Интерактивные фичи
│   ├── accordion/          # FAQ аккордеон
│   └── contact-form/       # Форма обратной связи
├── entities/               # Бизнес-сущности
│   ├── review/             # Карточка отзыва + данные
│   ├── project/            # Карточка проекта + данные
│   └── pricing-plan/       # Карточка тарифа + данные
└── shared/                 # Переиспользуемое
    ├── ui/                 # Button, SectionTitle
    ├── lib/                # animations.ts (Framer Motion варианты)
    └── config/             # Цвета, навигация
```

## Запуск

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev-сервер
npm run dev

# 3. Открыть в браузере
# http://localhost:3000
```

## Сборка для продакшна

```bash
npm run build
npm start
```

## Кастомизация

- **Контент** — редактируй данные в `src/entities/*/model.ts`
- **Цвета** — меняй переменные в `src/app/globals.css` и `src/shared/config/index.ts`
- **Фото** — замени аватар-плейсхолдер в `Hero.tsx` на `<Image>` из next/image
- **Контакты** — обнови ссылки в `src/widgets/contact/ui/Contact.tsx` и `Footer.tsx`

## Подключение формы

В `src/features/contact-form/ui/ContactForm.tsx` замени `handleSubmit` на реальный API-запрос (например, через Telegram Bot API или EmailJS).
