# 🤖 NexusUI - Discord Bot Website

Modern ve kullanıcı dostu Discord bot web sitesi. KynuxDev için tasarlanmış, tam donanımlı bir showcase ve yönetim platformu.

## 🚀 Özellikler

- **Modern UI/UX**: Next.js 14 ve Tailwind CSS ile geliştirilmiş
- **Responsive Design**: Tüm cihazlarda mükemmel görüntü
- **GitHub Entegrasyonu**: Gerçek zamanlı istatistikler
- **SEO Optimized**: Arama motoru dostu
- **Dark/Light Mode**: Kullanıcı tercihine göre tema
- **Interactive Components**: Dinamik müzik çalar ve komut dökümantasyonu
- **Analytics**: Detaylı kullanım istatistikleri

## 🛠️ Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Deployment**: Vercel Ready

## 🏗️ Proje Yapısı

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── analytics.tsx
│   ├── commands-documentation.tsx
│   ├── features.tsx
│   ├── footer.tsx
│   ├── fun-utility.tsx
│   ├── github-stats.tsx
│   ├── hero.tsx
│   ├── invitation-setup.tsx
│   ├── moderation-showcase.tsx
│   ├── music-player.tsx
│   ├── navbar.tsx
│   ├── open-source-project.tsx
│   └── schema-markup.tsx
└── lib/
    ├── data.ts
    ├── types.ts
    └── utils.ts
```

## 🚀 Kurulum

1. Repository'yi klonlayın:
```bash
git clone https://github.com/KynuxDev/NexusUI-WebSite.git
cd NexusUI-WebSite
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın

## 📝 Özelleştirme

### Bot Verilerini Güncelleme

`src/lib/data.ts` dosyasında bot istatistiklerini, komutlarını ve özelliklerini güncelleyebilirsiniz:

```typescript
export const botStats = {
  servers: 2800,
  users: 342000,
  commands: 1400,
  // ...
}
```

### Tema Renkleri

`tailwind.config.ts` dosyasından renk paletini özelleştirebilirsiniz.

## 🌟 Bileşenler

- **Hero Section**: Ana tanıtım bölümü
- **GitHub Stats**: Gerçek zamanlı GitHub istatistikleri
- **Features**: Bot özelliklerinin detaylı gösterimi
- **Music Player**: İnteraktif müzik çalar showcase
- **Commands**: Komut dökümantasyonu
- **Analytics**: Kullanım istatistikleri

## 🚀 Deploy

### Vercel (Önerilen)

1. Vercel hesabınıza giriş yapın
2. Repository'yi import edin
3. Deploy butonuna tıklayın

### Diğer Platformlar

Proje herhangi bir Next.js destekleyen platformda çalışabilir:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasını inceleyebilirsiniz.

## 🤝 Katkı

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

- **GitHub**: [@KynuxDev](https://github.com/KynuxDev)
- **Discord**: [NexusUI Community](https://discord.gg/your-invite)

## ⭐ Teşekkürler

Bu projeyi beğendiyseniz lütfen ⭐ verin!

---

**NexusUI** - Modern Discord Bot Experiences ✨