"use client"

import { useState, useEffect } from "react"
import { Shield, Ban, UserX, Volume, AlertTriangle, Eye, Clock, CheckCircle, XCircle, Activity } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ModerationLog {
  id: string
  type: "ban" | "kick" | "mute" | "warn" | "automod"
  user: string
  moderator: string
  reason: string
  timestamp: string
  severity: "low" | "medium" | "high"
}

const mockLogs: ModerationLog[] = [
  { id: "1", type: "automod", user: "SpamBot#1234", moderator: "AutoMod", reason: "Spam mesaj tespit edildi", timestamp: "2 saniye önce", severity: "high" },
  { id: "2", type: "mute", user: "ToxicUser#5678", moderator: "Moderator#0001", reason: "Küfürlü dil kullanımı", timestamp: "1 dakika önce", severity: "medium" },
  { id: "3", type: "warn", user: "NewUser#9999", moderator: "KynuxDev", reason: "Kural ihlali uyarısı", timestamp: "3 dakika önce", severity: "low" },
  { id: "4", type: "ban", user: "Raider#1337", moderator: "Admin#0001", reason: "Raid girişimi", timestamp: "5 dakika önce", severity: "high" },
  { id: "5", type: "kick", user: "Advertiser#4444", moderator: "KynuxDev", reason: "İzinsiz reklam", timestamp: "8 dakika önce", severity: "medium" }
]

const commands = [
  { command: "/ban @SpamBot#1234 spam", description: "Kullanıcıyı kalıcı olarak yasaklar" },
  { command: "/kick @ToxicUser#5678 uygunsuz davranış", description: "Kullanıcıyı sunucudan geçici olarak atar" },
  { command: "/mute @NewUser#9999 10m küfür", description: "Kullanıcıyı belirli süre susturur" },
  { command: "/warn @Advertiser#4444 reklam yasak", description: "Kullanıcıya uyarı verir" },
  { command: "/automod enable spam", description: "Otomatik spam korumasını etkinleştirir" }
]

const severityColors = {
  low: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30",
  medium: "text-orange-400 bg-orange-500/20 border-orange-500/30", 
  high: "text-red-400 bg-red-500/20 border-red-500/30"
}

const typeIcons = {
  ban: Ban,
  kick: UserX,
  mute: Volume,
  warn: AlertTriangle,
  automod: Shield
}

export default function ModerationShowcase() {
  const [activeCommand, setActiveCommand] = useState(0)
  const [logs, setLogs] = useState(mockLogs)
  const [isTyping, setIsTyping] = useState(false)
  const [typedCommand, setTypedCommand] = useState("")
  
  const [stats, setStats] = useState({
    totalActions: 1247,
    autoModBlocked: 89,
    activeWarnings: 23,
    bannsToday: 12
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCommand((prev) => (prev + 1) % commands.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (activeCommand >= 0) {
      setIsTyping(true)
      setTypedCommand("")
      const command = commands[activeCommand].command
      
      let i = 0
      const typeInterval = setInterval(() => {
        if (i <= command.length) {
          setTypedCommand(command.slice(0, i))
          i++
        } else {
          setIsTyping(false)
          clearInterval(typeInterval)
        }
      }, 80)
      
      return () => clearInterval(typeInterval)
    }
  }, [activeCommand])

  const addNewLog = () => {
    const newLog: ModerationLog = {
      id: Date.now().toString(),
      type: "automod",
      user: `User${Math.floor(Math.random() * 9999)}#1234`,
      moderator: "KynuxDev",
      reason: "Otomatik kural ihlali tespiti",
      timestamp: "Az önce",
      severity: "medium"
    }
    
    setLogs(prev => [newLog, ...prev.slice(0, 4)])
    setStats(prev => ({
      ...prev,
      totalActions: prev.totalActions + 1,
      autoModBlocked: prev.autoModBlocked + 1
    }))
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Güçlü <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Moderasyon</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Gelişmiş moderasyon araçları ile sunucunuzu güvenli ve düzenli tutun
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Moderasyon İstatistikleri</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-card/30 border border-border/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-red-400 mb-1">
                    <motion.span
                      key={stats.totalActions}
                      initial={{ scale: 1.2, color: "#f87171" }}
                      animate={{ scale: 1, color: "#f87171" }}
                      transition={{ duration: 0.3 }}
                    >
                      {stats.totalActions}
                    </motion.span>
                  </div>
                  <div className="text-sm text-gray-400">Toplam İşlem</div>
                </div>
                <div className="bg-card/30 border border-border/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-orange-400 mb-1">
                    <motion.span
                      key={stats.autoModBlocked}
                      initial={{ scale: 1.2, color: "#fb923c" }}
                      animate={{ scale: 1, color: "#fb923c" }}
                      transition={{ duration: 0.3 }}
                    >
                      {stats.autoModBlocked}
                    </motion.span>
                  </div>
                  <div className="text-sm text-gray-400">Otomatik Engelleme</div>
                </div>
                <div className="bg-card/30 border border-border/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-yellow-400 mb-1">{stats.activeWarnings}</div>
                  <div className="text-sm text-gray-400">Aktif Uyarı</div>
                </div>
                <div className="bg-card/30 border border-border/50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-red-500 mb-1">{stats.bannsToday}</div>
                  <div className="text-sm text-gray-400">Bugünkü Ban</div>
                </div>
              </div>

              <button
                onClick={addNewLog}
                className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Activity className="h-4 w-4" />
                <span>Yeni Moderasyon Eylemi Simüle Et</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card/50 border border-border rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Eye className="h-4 w-4 text-primary" />
                </div>
                <span>Komut Önizleme</span>
              </h3>
              
              <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 font-mono">
                <div className="text-green-400 text-sm mb-2">KynuxDev Console v2.1.0</div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">$</span>
                  <span className="text-white">
                    {typedCommand}
                    {isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-white"
                      >
                        |
                      </motion.span>
                    )}
                  </span>
                </div>
                
                {!isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-1"
                  >
                    <div className="text-green-400 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Komut başarıyla çalıştırıldı</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {commands[activeCommand]?.description}
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="text-sm text-gray-400 mb-3">Popüler Moderasyon Komutları:</div>
                {commands.map((cmd, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "p-3 rounded-lg border cursor-pointer transition-all",
                      activeCommand === index
                        ? "bg-primary/20 border-primary/30 text-primary"
                        : "bg-card/30 border-border/50 text-gray-400 hover:text-white hover:border-primary/20"
                    )}
                    onClick={() => setActiveCommand(index)}
                  >
                    <div className="font-mono text-sm">{cmd.command}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-card/50 border border-border rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-orange-400" />
                </div>
                <span>Moderasyon Logları</span>
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Canlı</span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              <AnimatePresence>
                {logs.map((log, index) => {
                  const Icon = typeIcons[log.type]
                  return (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        "p-4 rounded-xl border",
                        severityColors[log.severity]
                      )}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-current/20 flex items-center justify-center">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium capitalize">{log.type}</span>
                            <span className="text-xs opacity-70">{log.timestamp}</span>
                          </div>
                          <div className="text-sm opacity-90 mb-2">
                            <span className="font-medium">{log.user}</span> - {log.reason}
                          </div>
                          <div className="text-xs opacity-70">
                            Moderatör: {log.moderator}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="font-medium text-green-400">Otomatik Koruma Aktif</span>
              </div>
              <div className="text-sm text-gray-300">
                Spam koruması, raid koruması ve kötü amaçlı link tespiti aktif çalışıyor.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}