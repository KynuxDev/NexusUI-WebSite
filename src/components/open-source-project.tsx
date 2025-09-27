"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Star, 
  GitFork, 
  GitCommit, 
  Users, 
  AlertCircle, 
  FileText,
  Github,
  ExternalLink,
  Calendar,
  Code,
  Database,
  Server,
  Container
} from "lucide-react"

export default function OpenSourceProject() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { icon: Star, label: "Stars", value: "2.8k", color: "text-yellow-400", bg: "bg-yellow-400/20" },
    { icon: GitFork, label: "Forks", value: "342", color: "text-blue-400", bg: "bg-blue-400/20" },
    { icon: GitCommit, label: "Commits", value: "1.4k", color: "text-green-400", bg: "bg-green-400/20" },
    { icon: Users, label: "Contributors", value: "8", color: "text-purple-400", bg: "bg-purple-400/20" },
    { icon: AlertCircle, label: "Issues", value: "12", color: "text-red-400", bg: "bg-red-400/20" },
    { icon: FileText, label: "KB", value: "15.4k", color: "text-gray-400", bg: "bg-gray-400/20" }
  ]

  const technologies = [
    { name: "TypeScript", color: "bg-blue-500" },
    { name: "Discord.js", color: "bg-indigo-500" },
    { name: "Node.js", color: "bg-green-500" },
    { name: "MongoDB", color: "bg-green-600" },
    { name: "Redis", color: "bg-red-500" },
    { name: "Docker", color: "bg-blue-600" }
  ]

  const projectInfo = [
    { label: "Toplam Kod Satırı", value: "~25,000" },
    { label: "Ana Dil", value: "TypeScript" },
    { label: "Lisans", value: "MIT" },
    { label: "İlk Commit", value: "6 ay önce" }
  ]

  const tabs = [
    { id: "overview", label: "Genel Bakış", icon: FileText },
    { id: "commits", label: "Son Commitler", icon: GitCommit },
    { id: "contributors", label: "Katkıcılar", icon: Users }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Open Source{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Proje
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            PowerBot açık kaynaklı bir projedir. GitHub'da geliştime sürecini takip edebilir ve 
            katkıda bulunabilirsiniz
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Proje Başlığı */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Github className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">PowerBot</h3>
                  <p className="text-muted-foreground">Discord çok amaçlı bot projesi</p>
                </div>
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  v2.1.4
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Code className="h-4 w-4" />
                  <span>TypeScript</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>2 saat önce</span>
                </div>
                <a 
                  href="https://github.com/powerbot/powerbot"
                  className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`${stat.bg} border border-border rounded-xl p-4 text-center hover:scale-105 transition-transform`}
                  >
                    <Icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Tab Buttons */}
            <div className="flex space-x-2 mb-8 bg-muted/30 rounded-xl p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Proje İstatistikleri */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8"
            >
              <h4 className="text-xl font-bold text-foreground mb-6">Proje İstatistikleri</h4>
              <div className="space-y-4">
                {projectInfo.map((info, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{info.label}:</span>
                    <span className="text-foreground font-semibold">{info.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Teknolojiler */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8"
            >
              <h4 className="text-xl font-bold text-foreground mb-6">Teknolojiler</h4>
              <div className="grid grid-cols-2 gap-4">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-3 h-3 rounded-full ${tech.color}`} />
                    <span className="text-foreground font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <a
                  href="https://github.com/powerbot/powerbot"
                  className="flex items-center justify-center space-x-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>GitHub'da Görüntüle</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}