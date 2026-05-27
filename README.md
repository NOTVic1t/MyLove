# 💕 Victor ❤️ Indah — Romantic Digital Memory Book

Website romantis untuk Victor Rizki Valentiano & Indah Kusuma Atmaja.

## 🚀 Cara Upload ke GitHub Pages

1. Buat repo baru di GitHub (misal: `our-story`)
2. Upload semua file ke repo tersebut
3. Pergi ke **Settings → Pages → Source: main branch / root**
4. Website langsung live di: `https://username.github.io/our-story`

## 📁 Struktur File

```
/
├── index.html          ← File utama
├── style.css           ← Semua styling
├── script.js           ← Semua logika & animasi
├── assets/
│   ├── music.mp3       ← ⚠️ WAJIB: tambahkan file lagu "A Thousand Years"
│   └── gallery/        ← Tambahkan foto-foto kamu di sini
└── README.md
```

## 🎵 Cara Tambah Musik

1. Download lagu "Christina Perri - A Thousand Years" (MP3)
2. Rename jadi `music.mp3`
3. Taruh di folder `assets/`

## 📸 Cara Tambah Foto Gallery

1. Siapkan foto-foto kamu (JPG/PNG)
2. Taruh di folder `assets/gallery/`
3. Edit `index.html` bagian Gallery Section, ganti emoji dengan tag `<img>`:

```html
<div class="polaroid-img">
  <img src="assets/gallery/foto1.jpg" alt="Caption" />
</div>
```

## 🔐 Login Credentials

- **Username:** Sunshine
- **Password:** 150426

## 💡 Tips

- Website ini **mobile-first**, paling bagus dilihat di HP
- Semua animasi pakai GSAP (sudah di-load dari CDN)
- Musik autoplay setelah login berhasil
- Hidden message section: klik tombol "Do Not Open" → password: `150426`

---

Made with 💕 for Victor & Indah
