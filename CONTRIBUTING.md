# Contributing

Terima kasih sudah mau berkontribusi! Repo ini kecil dan sengaja sederhana.

## Cara kontribusi

1. Fork & branch dari `main` (mis. `theme/nama-tema`).
2. Ikuti `AGENTS.md` — terutama bagian [Menambah tema baru](./docs/add-a-theme.md).
3. Pastikan `npm run typecheck` hijau.
4. Kalau menambah tema: tambahkan font yang dipakai ke daftar di README § Quick start.
5. Pull request dengan screenshot light + dark kalau mengubah tampilan.

## Aturan tema

- Satu tema = satu file di `themes/<id>.css`, blok light (`:root[data-theme="<id>"]`)
  dan dark (`:root[data-theme="<id>"].dark`) di dalam satu file.
- Token yang di-harcoding di komponen dilarang — pakai var (--border, --radius,
  --brutal-border-w, --shadow-*).
- Nilai tema harus parity dengan tweakcn — jangan menambah warna di luar preset.
