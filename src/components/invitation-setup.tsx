"use client"

import { useState } from "react"
import { ExternalLink, Copy, CheckCircle, ArrowRight, Settings, Users, Shield, Music, Gamepad2, Bot, Server, Plus, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface SetupStep {
  id: number
  title: string
  description: string
  icon: React.ElementType
  status: "pending" | "current" | "completed"
}

const permissions = [
  { name: "Mesaj Gönderme", description: "Temel bot fonksiyonları için gerekli", required: true },
  { name: "Mesaj Geçmişini Okuma", description: "Komutları algılayabilmek için", required: true },
  { name: "Embed Bağlantıları", description: "Zengin mesaj içerikleri için", required: true },
  { name: "Ses Kanalına Bağlanma", description: "Müzik özelliği için", required: false },
  { name: "Ses Dosyası Çalma", description: "Müzik çalma yeteneği için", required: false },
  { name: "Yönetici İzinleri", description: "Moderasyon komutları için", required: false },
  { name: "Üye Yasaklama", description: "Ban komutları için", required: false },
  { name: "Üye Atma", description: "Kick komutları için", required: false }
]

const initialSteps: SetupStep[] = [
  { id: 1, title: "Bot'u Davet Et", description: "KynuxDev'u sunucunuza davet edin", icon: Plus, status: "current" },
  { id: 2, title: "İzinleri Ayarla", description: "Gerekli izinleri verin", icon: Shield, status: "pending" },
  { id: 3, title: "Kanal Ayarla", description: "Bot komutları için kanal belirleyin", icon: Settings, status: "pending" },
  { id: 4, title: "İlk Komutu Çalıştır", description: "/setup komutu ile başlayın", icon: Bot, status: "pending" }
]

export default function InvitationSetup() {
  const [steps, setSteps] = useState<SetupStep[]>(initialSteps)
  const [currentStep, setCurrentStep] = useState(1)
  const [inviteClicked, setInviteClicked] = useState(false)
  const [copiedInvite, setCopiedInvite] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "Mesaj Gönderme", "Mesaj Geçmişini Okuma", "Embed Bağlantıları"
  ])

  const inviteUrl = "https://discord.com/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot%20applications.commands"

  const handleInviteClick = () => {
    setInviteClicked(true)
    updateStepStatus(1, "completed")
    setCurrentStep(2)
  }

  const updateStepStatus = (stepId: number, status: "pending" | "current" | "completed") => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status } : step
    ))
  }

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl)
      setCopiedInvite(true)
      setTimeout(() => setCopiedInvite(false), 2000)
    } catch (err) {
      console.error('Failed to copy invite link')
    }
  }

  const togglePermission = (permission: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    )
  }

  const proceedToNextStep = () => {
    if (currentStep < 4) {
      updateStepStatus(currentStep, "completed")
      const nextStep = currentStep + 1
      updateStepStatus(nextStep, "current")
      setCurrentStep(nextStep)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            KynuxDev'u <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Kurulum</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Birkaç basit adımda KynuxDev'u sunucunuza ekleyin ve tüm özelliklerden yararlanmaya başlayın
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">Kurulum Adımları</h3>
            
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={cn(
                    "relative p-6 rounded-2xl border transition-all duration-300",
                    step.status === "completed" 
                      ? "bg-green-500/10 border-green-500/30"
                      : step.status === "current"
                      ? "bg-primary/10 border-primary/30 ring-2 ring-primary/20"
                      : "bg-card/50 border-border"
                  )}
                >
                  <div className="flex items-start space-x-4">
                    <div className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                      step.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : step.status === "current"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted/50 text-muted-foreground"
                    )}>
                      {step.status === "completed" ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={cn(
                          "text-xs font-semibold px-3 py-1 rounded-full",
                          step.status === "completed"
                            ? "bg-green-500/20 text-green-400"
                            : step.status === "current"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted/20 text-muted-foreground"
                        )}>
                          Adım {step.id}
                        </span>
                        {step.status === "completed" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-green-400"
                          >
                            ✓
                          </motion.div>
                        )}
                      </div>
                      <h4 className={cn(
                        "text-lg font-semibold mb-2",
                        step.status === "current" ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="absolute left-10 top-full w-0.5 h-6 bg-border" />
                  )}
                </motion.div>
              )
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <h4 className="text-lg font-semibold text-green-400">Kurulum Tamamlandı!</h4>
              </div>
              <p className="text-gray-300 text-sm">
                KynuxDev artık sunucunuzda aktif. /help komutu ile tüm özellikleri keşfedebilirsiniz.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-card/50 border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center space-x-2">
                <Plus className="h-5 w-5 text-primary" />
                <span>Bot'u Davet Et</span>
              </h3>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  KynuxDev'u Discord sunucunuza davet etmek için aşağıdaki butona tıklayın:
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href={inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleInviteClick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 rounded-xl font-semibold text-center transition-colors flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>Discord'a Davet Et</span>
                  </motion.a>
                  
                  <button
                    onClick={copyInviteLink}
                    className="flex items-center justify-center px-4 py-4 rounded-xl border border-border hover:bg-card transition-colors"
                  >
                    {copiedInvite ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                {inviteClicked && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/10 border border-green-500/20 rounded-xl p-4"
                  >
                    <div className="flex items-center space-x-2 text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Davet bağlantısı açıldı!</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="bg-card/50 border border-border rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center space-x-2">
                <Shield className="h-5 w-5 text-orange-400" />
                <span>Bot İzinleri</span>
              </h3>
              
              <p className="text-muted-foreground mb-6 text-sm">
                KynuxDev'un düzgün çalışması için aşağıdaki izinlere ihtiyacı vardır:
              </p>
              
              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {permissions.map((permission, index) => (
                  <motion.div
                    key={permission.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                      selectedPermissions.includes(permission.name)
                        ? "bg-primary/10 border-primary/30"
                        : "bg-muted/5 border-border hover:bg-muted/10"
                    )}
                    onClick={() => togglePermission(permission.name)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-4 h-4 rounded border-2 flex items-center justify-center",
                          selectedPermissions.includes(permission.name)
                            ? "bg-primary border-primary"
                            : "border-border"
                        )}>
                          {selectedPermissions.includes(permission.name) && (
                            <CheckCircle className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <div>
                          <h5 className={cn(
                            "font-medium text-sm",
                            permission.required ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {permission.name}
                            {permission.required && <span className="text-red-400 ml-1">*</span>}
                          </h5>
                          <p className="text-xs text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-yellow-400 text-xs flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>Kırmızı yıldızlı (*) izinler temel işlevsellik için gereklidir.</span>
                </p>
              </div>
              
              {currentStep === 2 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={proceedToNextStep}
                  className="w-full mt-6 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <span>İzinleri Onayladım</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}