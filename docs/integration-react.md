# Integrasi — React (Vite / Next.js / Remix)

Prasyarat: React 18+, Tailwind CSS v4, Node 18+.

## 1. Install

```bash
npm i github:jhonoryza/my-tweakcn-theme
npm i clsx tailwind-merge lucide-react @radix-ui/react-dropdown-menu
```

## 2. globals.css

```css
@import "tailwindcss";                                /* paling atas */
@import "my-tweakcn-theme/base.css";
@import "my-tweakcn-theme/themes/cloudflare.css";     /* default — blok :root/.dark polos */
@import "my-tweakcn-theme/themes/brutal.css";
@import "my-tweakcn-theme/themes/sage.css";
@import "my-tweakcn-theme/themes/soft.css";
@import "my-tweakcn-theme/themes/t3-chat.css";
@import "my-tweakcn-theme/themes/tangerine.css";
@import "my-tweakcn-theme/themes/darkmatter.css";
@import "my-tweakcn-theme/themes/discord.css";
@import "my-tweakcn-theme/themes/js-ts-advent-of-code.css";
@import "my-tweakcn-theme/themes/spacelinear.css";
@import "my-tweakcn-theme/themes/qrafthive.css";

/* styling spesifik aplikasimu di bawah ini */
```

Import tema tambahan boleh dipilih — hanya yang di-import yang muncul di switcher
tetap berfungsi asal filenya ada (provider hanya menyetel atribut).

## 3. Fonts

Semua tema membawa stack font-nya sendiri via `--font-sans` dsb. Muat font-fon
berikut di index.html:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..700&family=Space+Mono:wght@400;700&family=Inter:wght@400..700&family=Source+Serif+4:opsz,wght@8..60,400..700&family=JetBrains+Mono:wght@400..700&family=Antic&family=Outfit:wght@400..700&family=Merriweather:wght@400;700&family=Noto+Sans+JP:wght@400..700&family=Geist+Mono:wght@400..700&display=swap" rel="stylesheet" />
```

(Tema Sage Garden juga memakai **Signifier** — font komersial; stack-nya fallback ke Georgia.)

## 4. Provider & komponen

```tsx
import { ThemeProvider, ThemeVariantSwitcher, ThemeToggle } from "my-tweakcn-theme/src";

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <header>
        <ThemeVariantSwitcher />  {/* dropdown pemilih 11 tema */}
        <ThemeToggle />           {/* toggle terang/gelap */}
      </header>
      {children}
    </ThemeProvider>
  );
}
```

Untuk Next.js App Router, tambahkan `"use client"` di file yang memakai komponen ini,
atau bungkus dengan client boundary.

> Catatan Vite: TSX dari node_modules berjalan langsung karena Vite men-transpile ESM.
> Kalau bundler-mu menolak, tambahkan package ini ke opsi transpile
> (Next: `transpilePackages: ["my-tweakcn-theme"]`).

## 5. Memakai tema di kode

```tsx
import { useTheme, THEMES } from "my-tweakcn-theme/src";

function MyHeader() {
  const { variant, setVariant, resolvedMode } = useTheme();
  return (
    <select value={variant} onChange={(e) => setVariant(e.target.value as any)}>
      {THEMES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
    </select>
  );
}
```

Atau tulis CSS aplikasi dengan token — semuanya tersedia sebagai CSS variable
dan utility Tailwind:

```css
.my-panel {
  background: var(--card);
  border: var(--brutal-border-w) solid var(--border);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius);
}
```

## 6. Anti-flicker (opsional)

Tempatkan script kecil ini di `<head>` sebelum bundle JS agar tema tersimpan
diterapkan sebelum React mount:

```html
<script>
  (function () {
    var v = localStorage.getItem("theme-variant") || "cloudflare";
    if (v !== "cloudflare") document.documentElement.dataset.theme = v;
    var m = localStorage.getItem("theme");
    var dark = m === "dark" || (m !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  })();
</script>
```
