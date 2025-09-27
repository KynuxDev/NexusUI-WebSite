export interface BotFeature {
  id: string
  title: string
  description: string
  icon: string
  category: 'music' | 'moderation' | 'fun' | 'utility'
}

export interface BotCommand {
  name: string
  description: string
  usage: string
  category: 'music' | 'moderation' | 'fun' | 'utility'
  aliases?: string[]
}

export interface BotStats {
  servers: number
  users: number
  uptime: string
  commands: number
}

export interface NavItem {
  title: string
  href: string
}

export interface SocialLink {
  name: string
  href: string
  icon: string
}