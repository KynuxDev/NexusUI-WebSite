import { BotFeature, BotCommand, BotStats, NavItem, SocialLink } from "./types"

export const botStats: BotStats = {
  servers: 15420,
  users: 2890450,
  uptime: "99.9%",
  commands: 150
}

export const navItems: NavItem[] = [
  { title: "Anasayfa", href: "/" },
  { title: "Özellikler", href: "/features" },
  { title: "Komutlar", href: "/commands" },
  { title: "Dokümantasyon", href: "/docs" },
  { title: "Hakkında", href: "/about" }
]

export const socialLinks: SocialLink[] = [
  { name: "GitHub", href: "https://github.com", icon: "github" },
  { name: "Discord", href: "https://discord.gg", icon: "discord" },
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" }
]

export const botFeatures: BotFeature[] = [
  {
    id: "music",
    title: "Yüksek Kaliteli Müzik",
    description: "24/7 kesintisiz müzik deneyimi, playlist desteği ve ses kontrolleri",
    icon: "music",
    category: "music"
  },
  {
    id: "moderation",
    title: "Güçlü Moderasyon",
    description: "Otomatik spam koruması, ban/kick sistemi ve detaylı log kayıtları",
    icon: "shield",
    category: "moderation"
  },
  {
    id: "leveling",
    title: "Seviye Sistemi",
    description: "Aktif kullanıcıları ödüllendiren seviye sistemi ve leaderboard",
    icon: "trophy",
    category: "fun"
  },
  {
    id: "utility",
    title: "Faydalı Araçlar",
    description: "Hava durumu, hatırlatıcılar, çeviri ve daha birçok yararlı araç",
    icon: "tools",
    category: "utility"
  },
  {
    id: "economy",
    title: "Ekonomi Sistemi",
    description: "Sanal para birimi, günlük ödüller ve eğlenceli mini oyunlar",
    icon: "coins",
    category: "fun"
  },
  {
    id: "automod",
    title: "Otomatik Moderasyon",
    description: "Spam, raid ve zararlı içerik koruması ile güvenli sunucu ortamı",
    icon: "robot",
    category: "moderation"
  }
]

export const botCommands: BotCommand[] = [
  {
    name: "play",
    description: "YouTube, Spotify veya SoundCloud'dan müzik çalar",
    usage: "/play <şarkı adı veya link>",
    category: "music",
    aliases: ["p", "müzik"]
  },
  {
    name: "skip",
    description: "Şu anki şarkıyı atlar",
    usage: "/skip",
    category: "music",
    aliases: ["s", "geç"]
  },
  {
    name: "queue",
    description: "Müzik kuyruğunu gösterir",
    usage: "/queue",
    category: "music",
    aliases: ["q", "kuyruk"]
  },
  {
    name: "ban",
    description: "Kullanıcıyı sunucudan yasaklar",
    usage: "/ban <@kullanıcı> [sebep]",
    category: "moderation",
    aliases: ["yasakla"]
  },
  {
    name: "kick",
    description: "Kullanıcıyı sunucudan atar",
    usage: "/kick <@kullanıcı> [sebep]",
    category: "moderation",
    aliases: ["at"]
  },
  {
    name: "mute",
    description: "Kullanıcıyı geçici olarak susturur",
    usage: "/mute <@kullanıcı> <süre>",
    category: "moderation",
    aliases: ["sustur"]
  },
  {
    name: "8ball",
    description: "Sihirli 8-top ile gelecekteki sorunuza yanıt alın",
    usage: "/8ball <soru>",
    category: "fun",
    aliases: ["sihirli"]
  },
  {
    name: "meme",
    description: "Rastgele komik meme gösterir",
    usage: "/meme",
    category: "fun",
    aliases: ["komik"]
  },
  {
    name: "weather",
    description: "Belirtilen şehir için hava durumu bilgisi",
    usage: "/weather <şehir>",
    category: "utility",
    aliases: ["hava"]
  },
  {
    name: "reminder",
    description: "Belirli bir zamanda hatırlatıcı ayarlar",
    usage: "/reminder <süre> <mesaj>",
    category: "utility",
    aliases: ["hatırlatıcı"]
  },
  {
    name: "level",
    description: "Seviye ve deneyim puanınızı gösterir",
    usage: "/level [@kullanıcı]",
    category: "fun",
    aliases: ["seviye", "xp"]
  },
  {
    name: "daily",
    description: "Günlük ödülünüzü alın",
    usage: "/daily",
    category: "fun",
    aliases: ["günlük"]
  }
]