# AGENTS.md — my-tweakcn-theme

Panduan untuk AI agent yang mengintegrasikan atau mengembangkan package ini.
Baca sebelum menulis kode.

## Apa ini

Package tema shadcn/Tailwind-v4 dengan **parity 100% dari preset tweakcn**:
11 tema (colors + typography + radius + spacing + shadows), React provider,
toggle light/dark, dropdown switcher varian, dan runtime vanilla untuk web non-React.

## Peta file

```
themes/<id>.css        # 11 file tema. cloudflare.css = default (blok :root/.dark polos).
                       # Tema lain di-scope :root[data-theme="<id>"] dan
                       # :root[data-theme="<id>"].dark. Light+dark dalam satu file.
base.css               # @custom-variant dark + @theme inline (token -> utility Tailwind)
                       # + @layer base. WAJIB di-import konsumen setelah @import "tailwindcss".
src/themes.ts          # THEMES (id+label), DEFAULT_VARIANT ("cloudflare"), guard isThemeVariant
src/theme-provider.tsx # Context React: variant -> data-theme, mode -> .dark, localStorage
src/theme-toggle.tsx   # Tombol light/dark
src/theme-variant-switcher.tsx # Dropdown Radix pemilih varian
src/cn.ts              # clsx + tailwind-merge
vanilla/themes.js      # Runtime framework-agnostic (window.TweakThemes)
docs/                  # Panduan integrasi per target
```

## Id tema yang valid

`cloudflare` (default) · `brutal` · `sage` · `soft` · `t3-chat` · `tangerine` ·
`darkmatter` · `discord` · `js-ts-advent-of-code` · `spacelinear` · `qrafthive`

Id = nama file di `themes/` = nilai `data-theme`. Tambah tema = tambah file + daftar
di `src/themes.ts` + `src/components/theme-variant-switcher.tsx` (array VARIANTS) +
link font-nya di index.html aplikasi.

## Checklist integrasi (React + Tailwind v4)

1. `npm i github:jhonoryza/my-tweakcn-theme` + `clsx tailwind-merge lucide-react @radix-ui/react-dropdown-menu`
2. globals.css aplikasi:
   - `@import "tailwindcss";` PALING ATAS
   - `@import "my-tweakcn-theme/base.css";` — tanpa ini utility token tidak jalan
   - `@import "my-tweakcn-theme/themes/cloudflare.css";` — default, TANPA scope
   - `@import "my-tweakcn-theme/themes/<id>.css";` untuk tiap tema tambahan — ini SCOPED
     (`:root[data-theme="<id>"]`), aman di-import semua sekaligus
3. Bungkus root dengan `<ThemeProvider>` dari `my-tweakcn-theme/src`
4. Pasang `<ThemeVariantSwitcher />` + `<ThemeToggle />` di header
5. Pastikan font tema ter-load di index.html (lihat tabel font di bawah)

## Checklist integrasi (HTML statis)

1. Google Fonts link (font gabungan semua tema — ada di README)
2. `<link rel="stylesheet">` untuk `themes/cloudflare.css` + tema lain (CDN jsDelivr:
   `https://cdn.jsdelivr.net/gh/jhonoryza/my-tweakcn-theme@main/themes/<id>.css`)
3. `<script src=".../vanilla/themes.js"></script>` di `<head>` — runtime menerapkan tema
   sebelum paint
4. Ganti tema: `TweakThemes.setVariant("sage")`; mode: `TweakThemes.toggleMode()`
5. Gaya elemen pakai token: `color: var(--foreground)`, `border: var(--brutal-border-w) solid var(--border)`,
   `box-shadow: var(--shadow-md)` — BUKAN utility Tailwind (tidak ada build step)

## Gotcha (pernah kena, jangan diulang)

1. **`@import "tailwindcss"` harus paling atas** — import sesudahnya diabaikan CSS.
2. **`base.css` wajib** — file tema hanya mendefinisikan variabel; mapping
   `@theme inline` di base.css yang menghubungkannya ke utility Tailwind.
3. **File tema default (cloudflare) TANPA scope** (`:root`/`.dark` polos); semua tema
   lain WAJIB di-scope (`:root[data-theme="<id>"]`). Kalau dua file sama-sama
   unscoped, yang di-import terakhir menang dan switcher jadi tidak konsisten.
4. **Lebar border pakai var** — `border-(length:--brutal-border-w)`, bukan `border-2`
   hardcode. Tiap tema membawa `--brutal-border-w` (brutal 2px, lainnya 1px).
5. **Sudut pakai `rounded-(--radius)`** — bukan `rounded-none`/`rounded-lg` hardcode,
   supaya geometri mengikuti tema (brutal 0, sage 0.35rem, soft/qrafthive 0.75–1rem).
6. **Dark block tidak perlu mengulang shadow/font bila nilainya sama dengan light** —
   CSS var diwariskan; ulangi hanya kalau beda (contoh: brutal dark shadow tetap
   hitam = sama dengan light, tweakcn juga tidak meng-override).
7. **localStorage keys**: `theme-variant` (varian) dan `theme` (mode light/dark/system)
   — kompatibel antara runtime React dan vanilla; jangan ganti tanpa migrasi.
8. **Font Signifier (sage)** adalah font komersial — stack-nya sengaja fallback ke Georgia.
   Jangan coba muat dari CDN.

## Menambah tema baru dari tweakcn

1. Ambil preset dari `utils/theme-presets.ts` repo tweakcn (preset resmi) atau CSS
   terpublikasi dari tweakcn.com/community (tema komunitas).
2. Buat `themes/<id>.css` mengikuti format `discord.css`: blok light scoped +
   blok `.dark` scoped, token lengkap (colors, fonts, radius, spacing, shadows).
3. Bila preset hanya punya parameter shadow (x/y/blur/spread/opacity/color) tanpa
   level jadi, generate semua `--shadow-2xs..2xl` dari parameter itu.
4. Daftarkan id di `src/themes.ts` dan switcher; tambahkan font-nya ke index.html.
5. Default tema diganti dengan memindahkan blok `:root`/`.dark` polos ke file tema
   yang dituju dan menyisipkan blok light+dark scoped ke cloudflare.css.
