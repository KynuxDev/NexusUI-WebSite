"use client"

import { useState, useEffect } from "react"
import { Gamepad2, DollarSign, Cloud, Bell, Globe, Dice6, Gift, TrendingUp, Calculator, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Command {
  id: string
  name: string
  category: "fun" | "utility"
  icon: string
  description: string
  example: string
  interactive?: boolean
}

const commands: Command[] = [
  {
    id: "8ball",
    name: "8ball",
    category: "fun",
    icon: "dice",
    description: "Sihirli 8-top ile geleceği öğrenin",
    example: "/8ball Bugün şanslı mıyım?",
    interactive: true
  },
  {
    id: "level",
    name: "level",
    category: "fun", 
    icon: "trophy",
    description: "Seviye ve XP bilgilerinizi görün",
    example: "/level @kullanici",
    interactive: true
  },
  {
    id: "daily",
    name: "daily",
    category: "fun",
    icon: "gift",
    description: "Günlük ödülünüzü alın",
    example: "/daily",
    interactive: true
  },
  {
    id: "meme",
    name: "meme",
    category: "fun",
    icon: "gamepad",
    description: "Rastgele komik meme gösterir",
    example: "/meme",
    interactive: true
  },
  {
    id: "weather",
    name: "weather",
    category: "utility",
    icon: "cloud",
    description: "Hava durumu bilgisi alın",
    example: "/weather İstanbul",
    interactive: true
  },
  {
    id: "reminder",
    name: "reminder",
    category: "utility",
    icon: "bell",
    description: "Hatırlatıcı kurun",
    example: "/reminder 1h Toplantıya katıl",
    interactive: true
  },
  {
    id: "translate",
    name: "translate",
    category: "utility",
    icon: "globe",
    description: "Metni çevirin",
    example: "/translate en Hello world",
    interactive: true
  },
  {
    id: "crypto",
    name: "crypto",
    category: "utility",
    icon: "trending",
    description: "Kripto para fiyatları",
    example: "/crypto BTC",
    interactive: true
  }
]

const eightBallResponses = [
  "Kesinlikle evet! ✨",
  "Şüphesiz! 💯",
  "Belki... 🤔",
  "Pek sanmıyorum 😕",
  "Kesinlikle hayır! ❌",
  "Daha sonra tekrar sor 🔮",
  "Gelecek parlak görünüyor! 🌟",
  "Bu konuda emin değilim 🤷‍♂️"
]

const memes = [
  "😂 Bu Epic bir meme!",
  "🔥 Stonks meme template",
  "😎 Chad vs Virgin meme",
  "🐕 Doge meme classic",
  "🎭 Drake pointing meme"
]

export default function FunUtility() {
  const [activeTab, setActiveTab] = useState<"fun" | "utility">("fun")
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null)
  const [userInput, setUserInput] = useState("")
  const [commandResult, setCommandResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const filteredCommands = commands.filter(cmd => cmd.category === activeTab)

  const simulateCommand = async (command: Command, input: string) => {
    setIsLoading(true)
    setCommandResult(null)
    
    await new Promise(resolve => setTimeout(resolve, 1000))

    let result = ""
    
    switch (command.id) {
      case "8ball":
        result = eightBallResponses[Math.floor(Math.random() * eightBallResponses.length)]
        break
      case "level":
        const level = Math.floor(Math.random() * 50) + 1
        const xp = Math.floor(Math.random() * 1000) + 100
        result = `🏆 Seviye: ${level} | 💎 XP: ${xp}/1000 | 🔥 Sıralama: #${Math.floor(Math.random() * 100) + 1}`
        break
      case "daily":
        const coins = Math.floor(Math.random() * 500) + 100
        result = `🎁 Günlük ödülün: ${coins} coin! Toplam: ${Math.floor(Math.random() * 10000) + coins} coin`
        break
      case "meme":
        result = memes[Math.floor(Math.random() * memes.length)]
        break
      case "weather":
        const temp = Math.floor(Math.random() * 35) + 5
        const conditions = ["☀️ Güneşli", "🌧️ Yağmurlu", "☁️ Bulutlu", "❄️ Karlı", "🌤️ Parçalı bulutlu"]
        const condition = conditions[Math.floor(Math.random() * conditions.length)]
        result = `${condition} | 🌡️ ${temp}°C | 💨 Rüzgar: ${Math.floor(Math.random() * 20) + 5} km/h`
        break
      case "reminder":
        result = `⏰ Hatırlatıcı kuruldu! "${input.split(' ').slice(2).join(' ')}" için alarm aktif.`
        break
      case "translate":
        result = `🌍 Çeviri: "${input}" → "Merhaba dünya" (Türkçe)`
        break
      case "crypto":
        const price = (Math.random() * 100000 + 1000).toLocaleString()
        const change = ((Math.random() - 0.5) * 10).toFixed(2)
        const isPositive = parseFloat(change) > 0
        result = `₿ BTC: $${price} | ${isPositive ? '📈' : '📉'} %${change}`
        break
      default:
        result = "Komut çalıştırıldı! ✅"
    }
    
    setCommandResult(result)
    setIsLoading(false)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Eğlence</span> & 
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent ml-3">Araçlar</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Eğlenceli oyunlardan faydalı araçlara kadar her ihtiyacınız için komutlar
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="bg-card/50 border border-border rounded-xl p-2 flex">
              <button
                onClick={() => setActiveTab("fun")}
                className={cn(
                  "px-8 py-3 rounded-lg font-medium transition-all flex items-center space-x-2",
                  activeTab === "fun"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Gamepad2 className="h-4 w-4" />
                <span>Eğlence Komutları</span>
              </button>
              <button
                onClick={() => setActiveTab("utility")}
                className={cn(
                  "px-8 py-3 rounded-lg font-medium transition-all flex items-center space-x-2",
                  activeTab === "utility"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Calculator className="h-4 w-4" />
                <span>Faydalı Araçlar</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center space-x-2">
                {activeTab === "fun" ? (
                  <>
                    <Gamepad2 className="h-5 w-5 text-green-400" />
                    <span>Eğlenceli Komutlar</span>
                  </>
                ) : (
                  <>
                    <Calculator className="h-5 w-5 text-blue-400" />
                    <span>Faydalı Araçlar</span>
                  </>
                )}
              </h3>

              {filteredCommands.map((command, index) => {
                const getIcon = () => {
                  switch (command.icon) {
                    case "dice": return <Dice6 className="h-5 w-5" />
                    case "trophy": return <TrendingUp className="h-5 w-5" />
                    case "gift": return <Gift className="h-5 w-5" />
                    case "gamepad": return <Gamepad2 className="h-5 w-5" />
                    case "cloud": return <Cloud className="h-5 w-5" />
                    case "bell": return <Bell className="h-5 w-5" />
                    case "globe": return <Globe className="h-5 w-5" />
                    case "trending": return <TrendingUp className="h-5 w-5" />
                    default: return <Search className="h-5 w-5" />
                  }
                }

                return (
                  <motion.div
                    key={command.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:scale-[1.02]",
                      selectedCommand?.id === command.id
                        ? activeTab === "fun"
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-blue-500/10 border-blue-500/30"
                        : "bg-card/50 border-border hover:border-primary/30"
                    )}
                    onClick={() => {
                      setSelectedCommand(command)
                      setUserInput("")
                      setCommandResult(null)
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={cn(
                        "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                        selectedCommand?.id === command.id
                          ? activeTab === "fun"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400"
                          : "bg-muted/50 text-muted-foreground"
                      )}>
                        {getIcon()}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          /{command.name}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-3">
                          {command.description}
                        </p>
                        <div className="bg-gray-900/30 border border-gray-700/50 rounded-lg p-2 font-mono text-sm text-gray-300">
                          {command.example}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-card/50 border border-border rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Search className="h-4 w-4 text-primary" />
                </div>
                <span>Komut Simülatörü</span>
              </h3>

              {selectedCommand ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        activeTab === "fun" ? "bg-green-500/20" : "bg-blue-500/20"
                      )}>
                        {selectedCommand.icon === "dice" && <Dice6 className="h-5 w-5 text-green-400" />}
                        {selectedCommand.icon === "cloud" && <Cloud className="h-5 w-5 text-blue-400" />}
                        {selectedCommand.icon === "gift" && <Gift className="h-5 w-5 text-green-400" />}
                        {selectedCommand.icon === "bell" && <Bell className="h-5 w-5 text-blue-400" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">/{selectedCommand.name}</h4>
                        <p className="text-sm text-gray-400">{selectedCommand.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Komut Parametresi:
                        </label>
                        <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          placeholder={selectedCommand.example.split(' ').slice(1).join(' ')}
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={() => simulateCommand(selectedCommand, userInput)}
                        disabled={isLoading}
                        className={cn(
                          "w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2",
                          activeTab === "fun"
                            ? "bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30"
                            : "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30",
                          isLoading && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Çalıştırılıyor...</span>
                          </>
                        ) : (
                          <>
                            <span>Komutu Çalıştır</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {commandResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6"
                      >
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-sm text-green-400 font-medium">Bot Yanıtı</span>
                        </div>
                        <div className="text-white text-lg">
                          {commandResult}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    Komut Seçin
                  </h4>
                  <p className="text-muted-foreground">
                    Sol taraftan bir komut seçerek simülatörü deneyin
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}