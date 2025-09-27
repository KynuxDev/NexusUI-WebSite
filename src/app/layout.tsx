import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import SchemaMarkup from "@/components/schema-markup"
import Analytics from "@/components/analytics"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://powerbot.com"),
  title: {
    default: "PowerBot - En Güçlü Discord Botu | Müzik, Moderasyon, Eğlence",
    template: "%s | PowerBot - Discord Bot"
  },
  description: "PowerBot ile Discord sunucunuzu profesyonel seviyeye taşıyın. 24/7 müzik çalma, gelişmiş moderasyon araçları, eğlence komutları ve 150+ faydalı özellik. 15,000+ sunucuda güvenilir.",
  keywords: [
    "discord bot",
    "discord müzik botu",
    "discord moderasyon botu",
    "discord bot türkçe",
    "ücretsiz discord bot",
    "en iyi discord bot",
    "powerbot",
    "discord sunucu yönetimi",
    "discord bot komutları",
    "discord bot ekle",
    "discord bot davet",
    "discord automod",
    "discord leveling bot",
    "discord economy bot",
    "discord utility bot"
  ],
  authors: [
    { name: "PowerBot Team", url: "https://powerbot.com" },
    { name: "PowerBot Developers" }
  ],
  creator: "PowerBot Team",
  publisher: "PowerBot",
  category: "Technology",
  classification: "Discord Bot Service",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://powerbot.com",
    languages: {
      "tr-TR": "https://powerbot.com",
      "en-US": "https://powerbot.com/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://powerbot.com",
    siteName: "PowerBot - Discord Bot",
    title: "PowerBot - En Güçlü Discord Botu | 15,000+ Sunucuda Güvenilir",
    description: "Türkiye'nin en popüler Discord botu PowerBot ile sunucunuzu geliştirin. Müzik, moderasyon, eğlence ve 150+ özellik. Ücretsiz kurulum, 24/7 destek.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PowerBot - Discord Botu Ana Sayfa",
        type: "image/png",
      },
      {
        url: "/og-image-square.png",
        width: 600,
        height: 600,
        alt: "PowerBot Logo",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@powerbot_tr",
    creator: "@powerbot_tr",
    title: "PowerBot - En Güçlü Discord Botu",
    description: "15,000+ sunucuda güvenilir Discord botu. Müzik, moderasyon, eğlence ve daha fazlası!",
    images: {
      url: "/twitter-image.png",
      alt: "PowerBot Discord Bot",
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  other: {
    "msapplication-TileColor": "#7289da",
    "msapplication-config": "/browserconfig.xml",
    "theme-color": "#7289da",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <SchemaMarkup />
      </head>
      <body className="antialiased bg-black text-white">
        <Analytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        {children}
      </body>
    </html>
  )
}