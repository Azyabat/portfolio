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
├── screens/
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

## CI/CD

Деплой настроен через GitHub Actions: при push в ветку `main` проект устанавливает зависимости, проходит type-check, собирается и отправляется на сервер. Запуск на сервере выполняется через PM2.

### GitHub Secrets

- `VPS_HOST` — IP или домен сервера
- `VPS_SSH_KEY` — приватный SSH-ключ для доступа к серверу
- `VPS_USER` — пользователь на сервере
- `VPS_PORT` — SSH-порт
- `TELEGRAM_BOT_TOKEN` — токен бота из `@BotFather`
- `TELEGRAM_CHAT_ID` — chat id получателя заявок

### GitHub Variables

- `DEPLOY_PATH` — путь проекта на сервере
- `PM2_APP_NAME` — имя процесса PM2
- `APP_PORT` — порт Next.js приложения

### Подготовка сервера

На сервере должны быть установлены Node.js, Yarn и PM2.

Для автозапуска PM2 после перезагрузки сервера выполните команду `pm2 startup` для пользователя "из переменных" и следуйте инструкции, которую выведет PM2.

## Форма обратной связи

Форма отправляет заявки через `POST /api/contact` в Telegram-бота. Эти же Telegram-настройки используются для уведомлений о посещениях сайта. Для локальной разработки можно скопировать `.env.example` в `.env.local` и заполнить настройки Telegram. При деплое GitHub Actions создает `.env.production` на сервере из Telegram-секретов.

## Логирование посещений

При первом открытии страницы middleware отправляет в Telegram уведомление с временем посещения, страницей, IP, источником перехода, браузером, устройством, ОС и геолокацией по IP, если ее удалось определить. Чтобы не спамить при переходах по страницам, после уведомления ставится cookie `azacode_visit_logged` на 30 минут.
