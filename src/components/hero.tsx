"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Bot, ExternalLink, Play, ArrowRight, Users, Zap, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { botStats } from "@/lib/data"

export default function Hero() {
  const [currentStat, setCurrentStat] = useState(0)
  
  const stats = [
    { label: "Aktif Sunucu", value: botStats.servers.toLocaleString(), icon: Users },
    { label: "Toplam Kullanıcı", value: `${(botStats.users / 1000000).toFixed(1)}M`, icon: Users },
    { label: "Uptime", value: botStats.uptime, icon: Zap },
    { label: "Toplam Komut", value: botStats.commands.toString(), icon: Shield }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl"
              />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-2xl">
                <Bot className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
          >
            Discord'un En{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Güçlü
            </span>{" "}
            Botu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            PowerBot ile sunucunuzu daha eğlenceli, güvenli ve kullanışlı hale getirin. 
            Müzik, moderasyon, eğlence ve utility özelliklerinin mükemmel birleşimi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              href="https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID"
              className="group flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span>Botu Davet Et</span>
              <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="#features"
              className="group flex items-center space-x-2 border-2 border-border hover:border-primary text-foreground hover:text-primary px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              <Play className="h-5 w-5" />
              <span>Özellikler</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  animate={{
                    scale: currentStat === index ? 1.1 : 1,
                    opacity: currentStat === index ? 1 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 text-center hover:bg-card/70 transition-colors"
                >
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-20"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-muted-foreground"
              >
                <ArrowRight className="h-6 w-6 rotate-90" />
              </motion.div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Aşağı kaydırarak keşfedin</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}