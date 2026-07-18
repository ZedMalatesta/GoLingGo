# GoLingGo

Мобильное + веб-приложение — агрегатор языковых встреч, разговорных клубов и
тандем-партнёров в конкретном городе.

## MVP

1. **Лента событий** с фильтрами «язык + уровень + формат + бесплатно/платно»
   (вкладка «События»).
2. **Кабинет организатора** — опубликовать событие за 2 минуты (вкладка
   «Создать»).
3. **RSVP и напоминание за 2 часа** до начала — локальные уведомления через
   `expo-notifications` (на вебе недоступны, работают в мобильном приложении).
4. **Профиль с несколькими языками сразу** (родные и изучаемые с уровнем) —
   отсюда «перекрёстные коммьюнити»: счётчик событий по каждому языку.

## Стек

- Expo SDK 57 + React Native 0.86 + TypeScript (strict)
- React Navigation (bottom tabs)
- Zustand + AsyncStorage (persist) — RSVP, свои события и профиль переживают
  перезапуск
- expo-notifications — локальные напоминания

## Запуск

```bash
npm install
npm start        # Expo dev server (QR для Expo Go)
npm run web      # веб-версия
npm run ios      # iOS-симулятор
npm run android  # Android-эмулятор
```

Проверка типов: `npm run ts:check`. Сборка веба: `npm run build:web`.

## Структура

```
App.tsx                    — корень, ждёт гидратации стора
app/Navigations/Routes.tsx — 4 вкладки: События / Создать / Мои встречи / Профиль
app/pages/                 — экраны MVP
app/components/            — EventCard, FilterBar, Chip
app/store/appStore.ts      — zustand-стор с persist
app/mocks/events.ts        — демо-события
app/utils/notifications.ts — напоминание за 2 часа
```
