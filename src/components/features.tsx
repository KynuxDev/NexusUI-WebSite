"use client"

import { useState } from "react"
import { Music, Shield, Trophy, Wrench, Coins, Bot, ChevronRight, Play, Pause, Volume2, Users, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { botFeatures } from "@/lib/data"
import { cn } from "@/lib/utils"

const iconMap = {
  music: Music,
  shield: Shield,
  trophy: Trophy,
  tools: Wrench,
  coins: Coins,
  robot: Bot
}

const categoryColors = {
  music: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  moderation: "from-red-500/20 to-orange-500/20 border-red-500/30", 
  fun: "from-green-500/20 to-emerald-500/20 border-green-500/30",
  utility: "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
}

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(botFeatures.map(f => f.category)))
  
  const filteredFeatures = selectedCategory 
    ? botFeatures.filter(f => f.category === selectedCategory)
    : botFeatures

  const currentFeature = filteredFeatures[activeFeature] || botFeatures[0]

  const renderPreview = () => {
    switch (currentFeature.id) {
      case "music":
        return (
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Music className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Şu an çalıyor</h4>
                  <p className="text-sm text-gray-400">Imagine Dragons - Believer</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="w-10 h-10 bg-purple-500/30 hover:bg-purple-500/50 rounded-xl flex items-center justify-center transition-colors">
                  <Play className="h-5 w-5 text-white ml-0.5" />
                </button>
                <button className="w-10 h-10 bg-purple-500/30 hover:bg-purple-500/50 rounded-xl flex items-center justify-center transition-colors">
                  <Volume2 className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>2:34</span>
                <span>3:12</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <h5 className="font-medium text-white">Kuyrukta Bekleyenler</h5>
              {["Coldplay - Yellow", "The Weeknd - Blinding Lights", "Ed Sheeran - Shape of You"].map((song, i) => (
                <div key={i} className="flex items-center space-x-3 text-sm text-gray-400">
                  <span className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  <span>{song}</span>
                </div>
              ))}
            </div>
          </div>
        )
      
      case "moderation":
        return (
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8 text-red-400" />
                <h4 className="text-xl font-semibold text-white">Moderasyon Paneli</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-red-400">47</div>
                  <div className="text-sm text-gray-400">Engellenen Spam</div>
                </div>
                <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-400">12</div>
                  <div className="text-sm text-gray-400">Aktif Uyarı</div>
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <h5 className="font-medium text-white">Son Eylemler</h5>
                {[
                  { action: "Kullanıcı @spammer susturuldu", time: "2 dakika önce", color: "text-orange-400" },
                  { action: "Spam mesaj silindi", time: "5 dakika önce", color: "text-red-400" },
                  { action: "Raid koruması aktif", time: "10 dakika önce", color: "text-green-400" }
                ].map((log, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className={log.color}>{log.action}</span>
                    <span className="text-gray-500">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className={cn("bg-gradient-to-br rounded-2xl p-8 border", categoryColors[currentFeature.category])}>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                {(() => {
                  const Icon = iconMap[currentFeature.icon as keyof typeof iconMap] || Bot
                  return <Icon className="h-10 w-10 text-primary" />
                })()}
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">{currentFeature.title}</h4>
              <p className="text-gray-300 leading-relaxed">{currentFeature.description}</p>
              <div className="mt-6 flex justify-center">
                <button className="flex items-center space-x-2 bg-primary/30 hover:bg-primary/50 text-white px-6 py-3 rounded-xl transition-colors">
                  <span>Özelliği Keşfet</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Güçlü <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Özellikler</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            KynuxDev'un sunduğu kapsamlı özellikler ile Discord sunucunuzu bir üst seviyeye taşıyın
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-6 py-2 rounded-full border transition-colors",
              !selectedCategory 
                ? "bg-primary text-primary-foreground border-primary" 
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-2 rounded-full border transition-colors capitalize",
                selectedCategory === category 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {category === 'music' && 'Müzik'}
              {category === 'moderation' && 'Moderasyon'}
              {category === 'fun' && 'Eğlence'}
              {category === 'utility' && 'Araçlar'}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {filteredFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap] || Bot
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "p-6 rounded-2xl border cursor-pointer transition-all duration-300",
                    activeFeature === index 
                      ? "bg-card border-primary shadow-lg scale-105" 
                      : "bg-card/50 border-border hover:border-primary/50 hover:bg-card/70"
                  )}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                      activeFeature === index 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="lg:pl-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {renderPreview()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}