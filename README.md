# Mirikom — сайт-концепт (BMW service · since 2000)

Статический сайт: Next.js 16 (App Router, `output: 'export'`), TypeScript strict, Tailwind v4, Motion, GSAP + ScrollTrigger, Lenis.

## Запуск
```bash
npm install
npm run dev          # разработка
npm run build        # статика в out/
npx serve out        # локальный просмотр сборки
npm run placeholders # список всех заглушек [...] из /content
```

## Структура
- `content/` — все тексты, контакты, цены, серии, шаги (типизированные данные; позже переедет в CMS)
- `components/sections` — секции главной; `widgets` — выбор серии, хотспоты, форма; `motion` — Reveal, SplitText, CountUp, Marquee, Cursor, Lenis; `art` — SVG-графика
- `lib/typograph.ts` — типографика (nbsp, «ёлочки», тире, ₽); `lib/booking.ts` — текст заявки
- Страницы: `/`, `/service`, `/series/[slug]` (18 штук), `/how-to-find`, `/privacy`, `/styleguide`

## Деплой (бесплатно)
- **Cloudflare Pages**: подключить репозиторий, build command `npm run build`, output directory `out`.
- **GitHub Pages**: собрать с `NEXT_PUBLIC_BASE_PATH=/<repo>` и опубликовать `out/`.
- После деплоя проверить с мобильного интернета из России: загрузка, шрифты, форма, виджеты.

## Концепт
Сайт закрыт от индексации (`noindex`, `robots.txt: Disallow: /`). Не является официальным сайтом компании. Решения и допущения — в `DECISIONS.md`.

## Заглушки
Полный актуальный список: `npm run placeholders`.
