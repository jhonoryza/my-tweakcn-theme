# Integrasi — HTML statis / non-React

Tanpa build step. Tailwind tidak wajib — gayai elemen langsung dengan CSS variable.

## 1. Head

```html
<head>
  <!-- font gabungan semua tema -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..700&family=Space+Mono:wght@400;700&family=Inter:wght@400..700&family=Source+Serif+4:opsz,wght@8..60,400..700&family=JetBrains+Mono:wght@400..700&family=Antic&family=Outfit:wght@400..700&family=Merriweather:wght@400;700&family=Noto+Sans+JP:wght@400..700&family=Geist+Mono:wght@400..700&display=swap" rel="stylesheet" />

  <!-- tema default + tema lain yang mau tersedia -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jhonoryza/my-tweakcn-theme@main/themes/cloudflare.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jhonoryza/my-tweakcn-theme@main/themes/brutal.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jhonoryza/my-tweakcn-theme@main/themes/sage.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jhonoryza/my-tweakcn-theme@main/themes/discord.css" />

  <!-- runtime (letakkan di <head> agar tema diterapkan sebelum paint) -->
  <script src="https://cdn.jsdelivr.net/gh/jhonoryza/my-tweakcn-theme@main/vanilla/themes.js"></script>
</head>
```

## 2. Styling dengan token

Semua token tersedia sebagai CSS variable:

```css
.panel {
  background: var(--card);
  color: var(--card-foreground);
  border: var(--brutal-border-w) solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
}
.panel h2 { color: var(--primary); }
.panel code { font-family: var(--font-mono); }
```

Tombol brutal ala tema Cloudflare/brutal:

```css
.btn {
  background: var(--primary);
  color: var(--primary-foreground);
  border: var(--brutal-border-w) solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  padding: 0.5rem 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn:hover { background: color-mix(in srgb, var(--primary) 90%, var(--border)); }
.btn:active { transform: translateY(2px); box-shadow: none; }
```

## 3. Switcher UI

Runtime menyediakan API, bukan UI — pasang kontrol sendiri:

```html
<select id="theme-picker"></select>
<button id="mode-toggle">🌙</button>

<script>
  var picker = document.getElementById("theme-picker");
  TweakThemes.THEMES.forEach(function (id) {
    var opt = document.createElement("option");
    opt.value = id; opt.textContent = id;
    if (id === TweakThemes.getVariant()) opt.selected = true;
    picker.appendChild(opt);
  });
  picker.addEventListener("change", function () {
    TweakThemes.setVariant(this.value);
  });
  var modeBtn = document.getElementById("mode-toggle");
  function syncModeBtn() {
    modeBtn.textContent = TweakThemes.resolved() === "dark" ? "☀️" : "🌙";
  }
  modeBtn.addEventListener("click", function () {
    TweakThemes.toggleMode();
    syncModeBtn();
  });
  syncModeBtn();
</script>
```

## 4. API `window.TweakThemes`

| Metode / properti | Fungsi |
|---|---|
| `getVariant()` / `setVariant(id)` | Varian tema aktif |
| `getMode()` / `setMode(m)` | `"light"`, `"dark"`, atau `"system"` |
| `toggleMode()` | Ganti terang ↔ gelap |
| `resolved()` | Mode efektif saat ini |
| `THEMES`, `DEFAULT_VARIANT` | Daftar id & default (`"cloudflare"`) |

Event custom: `tweaktheme:variantchange` dan `tweaktheme:modechange` (detail = nilai baru).
