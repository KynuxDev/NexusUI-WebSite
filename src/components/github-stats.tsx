"use client"

import { useState, useEffect } from "react"
import { Star, GitFork, GitCommit, Users, Github, ExternalLink, Calendar, Code, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GitHubData {
  stars: number
  forks: number
  watchers: number
  commits: number
  contributors: number
  lastCommit: string
  language: string
  size: number
  openIssues: number
  version: string
}

interface Contributor {
  name: string
  avatar: string
  contributions: number
}

interface Commit {
  message: string
  author: string
  date: string
  sha: string
}

const mockGitHubData: GitHubData = {
  stars: 2847,
  forks: 342,
  watchers: 156,
  commits: 1423,
  contributors: 8,
  lastCommit: "2 saat önce",
  language: "TypeScript",
  size: 15420,
  openIssues: 12,
  version: "v2.1.4"
}

const mockContributors: Contributor[] = [
  { name: "Developer1", avatar: "👨‍💻", contributions: 847 },
  { name: "Developer2", avatar: "👩‍💻", contributions: 234 },
  { name: "Developer3", avatar: "🧑‍💻", contributions: 156 },
  { name: "Developer4", avatar: "👨‍🔬", contributions: 89 }
]

const mockCommits: Commit[] = [
  { message: "feat: Add new music commands", author: "Developer1", date: "2 saat önce", sha: "a1b2c3d" },
  { message: "fix: Resolve moderation issues", author: "Developer2", date: "5 saat önce", sha: "e4f5g6h" },
  { message: "docs: Update command documentation", author: "Developer1", date: "1 gün önce", sha: "i7j8k9l" },
  { message: "refactor: Optimize performance", author: "Developer3", date: "2 gün önce", sha: "m1n2o3p" }
]

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "commits" | "contributors">("overview")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setData(mockGitHubData)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card/50 border border-border rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gray-700 rounded-xl animate-pulse" />
                <div className="space-y-2">
                  <div className="w-32 h-6 bg-gray-700 rounded animate-pulse" />
                  <div className="w-48 h-4 bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-16 h-8 bg-gray-700 rounded animate-pulse" />
                    <div className="w-20 h-4 bg-gray-700 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!data) return null

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toString()
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
            <span className="bg-gradient-to-r from-gray-500 to-gray-300 bg-clip-text text-transparent">Open Source</span> Proje
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            PowerBot açık kaynaklı bir projedir. GitHub'da geliştirme sürecini takip edebilir ve katkıda bulunabilirsiniz
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card/50 border border-border rounded-2xl p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center">
                  <Github className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground flex items-center space-x-2">
                    <span>PowerBot</span>
                    <span className="text-sm bg-primary/20 text-primary px-2 py-1 rounded">
                      {data.version}
                    </span>
                  </h3>
                  <p className="text-muted-foreground">Discord çok amaçlı bot projesi</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Code className="h-4 w-4" />
                  <span>{data.language}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{data.lastCommit}</span>
                </div>
                <motion.a
                  href="https://github.com/yourorg/powerbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center"
              >
                <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  {formatNumber(data.stars)}
                </div>
                <div className="text-xs text-muted-foreground">Stars</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center"
              >
                <GitFork className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {formatNumber(data.forks)}
                </div>
                <div className="text-xs text-muted-foreground">Forks</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center"
              >
                <GitCommit className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {formatNumber(data.commits)}
                </div>
                <div className="text-xs text-muted-foreground">Commits</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 text-center"
              >
                <Users className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {data.contributors}
                </div>
                <div className="text-xs text-muted-foreground">Contributors</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center"
              >
                <TrendingUp className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-400 mb-1">
                  {data.openIssues}
                </div>
                <div className="text-xs text-muted-foreground">Issues</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-500/10 border border-gray-500/20 rounded-xl p-4 text-center"
              >
                <Code className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-400 mb-1">
                  {formatNumber(data.size)}
                </div>
                <div className="text-xs text-muted-foreground">KB</div>
              </motion.div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-muted/20 rounded-xl p-1 flex">
                {[
                  { id: "overview", label: "Genel Bakış", icon: TrendingUp },
                  { id: "commits", label: "Son Commitler", icon: GitCommit },
                  { id: "contributors", label: "Katkıcılar", icon: Users }
                ].map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2",
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="min-h-[300px]">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Proje İstatistikleri</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Toplam Kod Satırı:</span>
                        <span className="font-mono text-foreground">~25,000</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Ana Dil:</span>
                        <span className="text-foreground">{data.language}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Lisans:</span>
                        <span className="text-foreground">MIT</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">İlk Commit:</span>
                        <span className="text-foreground">6 ay önce</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground">Teknolojiler</h4>
                    <div className="flex flex-wrap gap-2">
                      {["TypeScript", "Discord.js", "Node.js", "MongoDB", "Redis", "Docker"].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "commits" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-foreground">Son Commitler</h4>
                  {mockCommits.map((commit, index) => (
                    <motion.div
                      key={commit.sha}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-muted/20 rounded-xl border border-border"
                    >
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <GitCommit className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{commit.message}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{commit.author}</span>
                          <span>{commit.date}</span>
                          <span className="font-mono">{commit.sha}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "contributors" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <h4 className="font-semibold text-foreground">Katkıcılar</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {mockContributors.map((contributor, index) => (
                      <motion.div
                        key={contributor.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-muted/20 rounded-xl border border-border"
                      >
                        <div className="text-2xl">{contributor.avatar}</div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{contributor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {contributor.contributions} katkı
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${Math.min((contributor.contributions / 847) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}