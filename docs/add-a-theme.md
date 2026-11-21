# Menambah tema baru (port dari tweakcn)

Semua tema berasal dari dua sumber di tweakcn:

1. **Preset resmi** — definisi TS di repo tweakcn, `utils/theme-presets.ts`
   (kunci id, label, dan `styles.light` / `styles.dark`).
2. **Tema komunitas** — CSS terpublikasi, misal mirror yang sudah terbukti:
   `XenchinRyu7/Ethereal-UI` → `apps/docs/public/themes/<id>.css`.

## A. Port preset resmi

Preset TS memakai kunci CAMPUR: tanpa kutip untuk kata tunggal
(`background: "#fff"`), berkutip untuk ber-hyphen (`"card-foreground": ...`).
Regex parser harus mengakomodasi keduanya:

```python
re.finditer(r'"?([\w-]+)"?:\s*"([^"]*)"', body)
```

Blok `styles.light` dan `styles.dark` di-extract terpisah (bracket matching,
bukan string search — blok tidak boleh saling tumpang tindih).

Emit satu file `themes/<id>.css` berisi:

```css
:root[data-theme="<id>"] {
  --brutal-border-w: 1px;            /* atau 2px kalau tema keras */
  --background: ...;                  /* seluruh token warna */
  ...
  --font-sans: ...;                   /* kalau preset mendefinisikan */
  --font-display: ...;                /* kalau tidak, pakai --font-sans */
  --font-serif: ...;
  --font-mono: ...;
  --radius: <dari preset>;
  --spacing: <dari preset, kalau di-override>;
  --shadow-2xs .. --shadow-2xl: ...   /* dari parameter shadow preset;
                                         kalau tidak ada, pakai default shadcn */
}

:root[data-theme="<id>"].dark {
  ...token dark...
  /* JANGAN mengulang shadow/font yang nilainya sama dengan light —
     var diwariskan; ini juga perilaku export tweakcn. */
}
```

## B. Port tema komunitas (CSS terpublikasi)

File CSS komunitas sudah berformat token shadcn dengan blok `:root` + `.dark`
(yang juga memuat `--font-*`, `--radius`, dan parameter `--shadow-*`). Port-nya
mekanikal: re-scope kedua selector ke `:root[data-theme="<id>"]` dan
`:root[data-theme="<id>"].dark`, tambahkan `--brutal-border-w`, selesai.

## C. Daftarkan

1. `src/themes.ts` → tambah `{ id, label }` di `THEMES`.
2. `docs`/README → tambahkan di daftar id.
3. `index.html` aplikasi → tambahkan font Google Fonts yang dipakai preset.
4. Build & cek: light + dark + switcher.

## D. Ganti tema default

Default package = tema yang bloknya TANPA scope (`:root`/`.dark` polos).
Pindahkan:

1. File tema lama default (cloudflare.css) → beri scope `:root[data-theme="cloudflare"]`.
2. File tema baru → jadikan blok `:root`/`.dark` polos.
3. `DEFAULT_VARIANT` di `src/themes.ts` dan fallback provider disesuaikan.
