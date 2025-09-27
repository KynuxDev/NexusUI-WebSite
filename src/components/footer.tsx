import Link from "next/link"
import { Bot, Github, MessageCircle, Twitter, Heart, ExternalLink } from "lucide-react"
import { socialLinks, navItems, botStats } from "@/lib/data"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Bot className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">KynuxDev</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discord sunucularınız için en güçlü ve güvenilir bot. 
              24/7 aktif, yüksek performanslı ve kullanıcı dostu.
            </p>
            <div className="flex space-x-2">
              <Link
                href="https://github.com"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://discord.gg"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Sayfalar</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Kaynaklar</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/api"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  API Dokümantasyonu
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Bot Durumu
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Değişiklik Günlüğü
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Destek
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">İstatistikler</h3>
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-primary">{botStats.servers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Aktif Sunucu</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">{(botStats.users / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">Toplam Kullanıcı</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{botStats.uptime}</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Kullanım Şartları
              </Link>
            </div>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>by KynuxDev Team</span>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            © 2024 KynuxDev. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </footer>
  )
}