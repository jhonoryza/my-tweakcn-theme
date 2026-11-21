# my-tweakcn-theme

**11 tema shadcn/Tailwind-v4 dengan parity 100% dari [tweakcn](https://tweakcn.com)** — plus
`ThemeProvider`, toggle terang/gelap, dan dropdown switcher varian tema, siap dipakai di web app mana pun.

Default: **Cloudflare** (oranye di dark navy). Tersedia: Neo Brutalism, Sage Garden, Soft (Modern Minimal),
T3 Chat, Tangerine, Darkmatter, Discord, JS/TS Advent of Code, SpaceLinear, Qrafthive.

## Isi

| File | Fungsi |
|---|---|
| `themes/<id>.css` | 11 file tema — token shadcn lengkap (colors, fonts, radius, spacing, shadows), light + dark dalam satu file |
| `themes/cloudflare.css` | Tema default — blok `:root` / `.dark` tanpa scope |
| `base.css` | Mapping `@theme inline` Tailwind v4 + base layer — **wajib** di globals aplikasi konsumen |
| `src/theme-provider.tsx` | React context: varian tema (data-theme) + mode terang/gelap (.dark), persisten di localStorage |
| `src/theme-toggle.tsx` | Tombol toggle terang/gelap |
| `src/theme-variant-switcher.tsx` | Dropdown pemilih tema (Radix) |
| `vanilla/themes.js` | Runtime tanpa framework untuk web non-React |
| `docs/` | Panduan integrasi + cara menambah tema |

## Tema & id

`id` = nama file = nilai `data-theme` di `<html>`:

`cloudflare` (default) · `brutal` (Neo Brutalism) · `sage` (Sage Garden) · `soft` (Modern Minimal) ·
`t3-chat` · `tangerine` · `darkmatter` · `discord` · `js-ts-advent-of-code` · `spacelinear` · `qrafthive`

## Quick start — React (Vite / Next.js)

Prasyarat: Tailwind v4 + React 18+.

```bash
npm i github:jhonoryza/my-tweakcn-theme
npm i clsx tailwind-merge lucide-react @radix-ui/react-dropdown-menu
```

1. **globals.css** aplikasimu — urutan penting:

```css
@import "tailwindcss";
@import "my-tweakcn-theme/base.css";
@import "my-tweakcn-theme/themes/cloudflare.css";  /* default */
@import "my-tweakcn-theme/themes/brutal.css";
/* ...impor tema lain yang mau tersedia */
```

2. **Bungkus aplikasi** dengan provider:

```tsx
import { ThemeProvider, ThemeVariantSwitcher, ThemeToggle } from "my-tweakcn-theme/src";

<ThemeProvider>
  <ThemeVariantSwitcher />
  <ThemeToggle />
  {/* ...aplikasimu... */}
</ThemeProvider>
```

Selesai. Switcher menyetel `data-theme` + class `.dark` di `<html>`, pilihan tersimpan di localStorage.

## Quick start — HTML statis / non-React

```html
<head>
  <!-- font yang dipakai tema -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..700&family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&family=Antic&family=Outfit:wght@400..700&display=swap" rel="stylesheet" />
  <!-- tema: default + tema lain -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jhonoryza/my-tweakcn-theme@main/themes/cloudflare.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jhonoryza/my-tweakcn-theme@main/themes/brutal.css" />
  <!-- runtime -->
  <script src="https://cdn.jsdelivr.net/gh/jhonoryza/my-tweakcn-theme@main/vanilla/themes.js"></script>
</head>
```

> Untuk HTML statis, utility Tailwind (bg-background, dsb.) tidak tersedia — gayai elemenmu
> langsung dengan token: `background: var(--background)`, `border: var(--brutal-border-w) solid var(--border)`.
> Contoh lengkap ada di `docs/integration-plain-html.md`.

## Dokumentasi

- [`AGENTS.md`](./AGENTS.md) — panduan untuk AI agent: arsitektur token, checklist integrasi, gotcha
- [`docs/integration-react.md`](./docs/integration-react.md) — integrasi React/Tailwind detail
- [`docs/integration-plain-html.md`](./docs/integration-plain-html.md) — integrasi tanpa framework + contoh markup
- [`docs/add-a-theme.md`](./docs/add-a-theme.md) — cara port tema baru dari tweakcn

## Cara kerja (singkat)

- **Varian tema** → atribut `data-theme="<id>"` di `<html>`. File tema default (`cloudflare.css`) memakai
  `:root`/`.dark` polos; tema lain meng-override lewat `:root[data-theme="<id>"]` — satu atribut, seluruh token berganti.
- **Mode terang/gelap** → class `.dark` di `<html>`.
- **Lebar border & bayangan** juga token (`--brutal-border-w`, `--shadow-*`) — jadi tiap tema membawa geometri dan
  kedalaman visualnya sendiri (brutal = 2px + shadow keras 4px, soft/sage = 1px + shadow lembut).

## License

MIT
