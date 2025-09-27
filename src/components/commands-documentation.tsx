"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Music, Shield, Gamepad2, Wrench, ChevronRight, Copy, CheckCircle, Hash, User, Clock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { botCommands } from "@/lib/data"
import { cn } from "@/lib/utils"

const categoryConfig = {
  music: { icon: Music, label: "Müzik", color: "text-purple-400", bgColor: "bg-purple-500/10 border-purple-500/20" },
  moderation: { icon: Shield, label: "Moderasyon", color: "text-red-400", bgColor: "bg-red-500/10 border-red-500/20" },
  fun: { icon: Gamepad2, label: "Eğlence", color: "text-green-400", bgColor: "bg-green-500/10 border-green-500/20" },
  utility: { icon: Wrench, label: "Araçlar", color: "text-blue-400", bgColor: "bg-blue-500/10 border-blue-500/20" }
}

export default function CommandsDocumentation() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null)
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const categories = Object.keys(categoryConfig)

  const filteredCommands = useMemo(() => {
    return botCommands.filter(command => {
      const matchesSearch = command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          command.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          command.aliases?.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === "all" || command.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const commandsByCategory = useMemo(() => {
    const grouped = filteredCommands.reduce((acc, command) => {
      if (!acc[command.category]) {
        acc[command.category] = []
      }
      acc[command.category].push(command)
      return acc
    }, {} as Record<string, typeof botCommands>)
    
    return grouped
  }, [filteredCommands])

  const copyCommand = async (commandName: string) => {
    try {
      await navigator.clipboard.writeText(`/${commandName}`)
      setCopiedCommand(commandName)
      setTimeout(() => setCopiedCommand(null), 2000)
    } catch (err) {
      console.error('Failed to copy command')
    }
  }

  const getCommandStats = () => ({
    total: botCommands.length,
    music: botCommands.filter(c => c.category === 'music').length,
    moderation: botCommands.filter(c => c.category === 'moderation').length,
    fun: botCommands.filter(c => c.category === 'fun').length,
    utility: botCommands.filter(c => c.category === 'utility').length
  })

  const stats = getCommandStats()

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
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Komut</span> Dokümantasyonu
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            PowerBot'un tüm komutlarını keşfedin ve nasıl kullanılacağını öğrenin
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="bg-card/50 border border-border rounded-xl px-6 py-3">
                <div className="text-2xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {key === 'total' ? 'Toplam Komut' : categoryConfig[key as keyof typeof categoryConfig]?.label || key}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="lg:w-1/3 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-card/50 border border-border rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">Komut Arama</h3>
                
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Komut ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Kategori Filtresi</span>
                  </h4>
                  
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl border transition-all",
                      selectedCategory === "all"
                        ? "bg-primary/10 border-primary/30 text-primary"
                        : "bg-muted/20 border-border text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    )}
                  >
                    Tüm Komutlar ({stats.total})
                  </button>
                  
                  {categories.map((category) => {
                    const config = categoryConfig[category as keyof typeof categoryConfig]
                    const Icon = config.icon
                    const count = stats[category as keyof typeof stats]
                    
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center space-x-3",
                          selectedCategory === category
                            ? `bg-${category === 'music' ? 'purple' : category === 'moderation' ? 'red' : category === 'fun' ? 'green' : 'blue'}-500/10 border-${category === 'music' ? 'purple' : category === 'moderation' ? 'red' : category === 'fun' ? 'green' : 'blue'}-500/30 text-${category === 'music' ? 'purple' : category === 'moderation' ? 'red' : category === 'fun' ? 'green' : 'blue'}-400`
                            : "bg-muted/20 border-border text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{config.label}</span>
                        <span className="text-xs">({count})</span>
                      </button>
                    )
                  })}
                </div>
              </motion.div>

              {selectedCommand && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">Komut Detayları</h3>
                  {(() => {
                    const command = botCommands.find(c => c.name === selectedCommand)
                    if (!command) return null
                    
                    const config = categoryConfig[command.category as keyof typeof categoryConfig]
                    const Icon = config.icon
                    
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", config.bgColor)}>
                            <Icon className={cn("h-5 w-5", config.color)} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">/{command.name}</h4>
                            <p className="text-xs text-muted-foreground">{config.label}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h5 className="text-sm font-medium text-foreground mb-1">Açıklama</h5>
                            <p className="text-sm text-muted-foreground">{command.description}</p>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-foreground mb-1">Kullanım</h5>
                            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 font-mono text-sm">
                              <code className="text-green-400">{command.usage}</code>
                            </div>
                          </div>
                          
                          {command.aliases && command.aliases.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium text-foreground mb-1">Alternatif İsimler</h5>
                              <div className="flex flex-wrap gap-2">
                                {command.aliases.map(alias => (
                                  <span key={alias} className="px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground">
                                    {alias}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <button
                            onClick={() => copyCommand(command.name)}
                            className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                          >
                            {copiedCommand === command.name ? (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                <span>Kopyalandı!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4" />
                                <span>Komutu Kopyala</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              )}
            </div>

            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-card/50 border border-border rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedCategory === "all" ? "Tüm Komutlar" : categoryConfig[selectedCategory as keyof typeof categoryConfig]?.label}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {filteredCommands.length} komut bulundu
                  </div>
                </div>

                {filteredCommands.length === 0 ? (
                  <div className="text-center py-12">
                    <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-foreground mb-2">Komut Bulunamadı</h4>
                    <p className="text-muted-foreground">
                      Arama kriterlerinize uygun komut bulunmuyor. Farklı terimler deneyin.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(commandsByCategory).map(([category, commands]) => {
                      const config = categoryConfig[category as keyof typeof categoryConfig]
                      const Icon = config.icon
                      
                      return (
                        <div key={category} className="space-y-3">
                          <div className="flex items-center space-x-3 mb-4">
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", config.bgColor)}>
                              <Icon className={cn("h-4 w-4", config.color)} />
                            </div>
                            <h4 className="font-semibold text-foreground">{config.label}</h4>
                            <span className="text-xs text-muted-foreground">({commands.length})</span>
                          </div>
                          
                          <div className="grid gap-3">
                            {commands.map((command, index) => (
                              <motion.div
                                key={command.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className={cn(
                                  "p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.02]",
                                  selectedCommand === command.name
                                    ? "bg-primary/10 border-primary/30"
                                    : "bg-muted/20 border-border hover:border-primary/30 hover:bg-muted/30"
                                )}
                                onClick={() => setSelectedCommand(command.name)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <Hash className="h-4 w-4 text-primary" />
                                      <code className="font-mono font-semibold text-foreground">/{command.name}</code>
                                      {command.aliases && (
                                        <div className="flex space-x-1">
                                          {command.aliases.slice(0, 2).map(alias => (
                                            <span key={alias} className="px-2 py-0.5 bg-muted/50 rounded text-xs text-muted-foreground">
                                              {alias}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{command.description}</p>
                                    <div className="text-xs text-muted-foreground font-mono bg-muted/30 rounded px-2 py-1 inline-block">
                                      {command.usage}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        copyCommand(command.name)
                                      }}
                                      className="w-8 h-8 rounded-lg bg-muted/30 hover:bg-primary/20 text-muted-foreground hover:text-primary flex items-center justify-center transition-colors"
                                    >
                                      {copiedCommand === command.name ? (
                                        <CheckCircle className="h-4 w-4 text-green-400" />
                                      ) : (
                                        <Copy className="h-4 w-4" />
                                      )}
                                    </button>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}