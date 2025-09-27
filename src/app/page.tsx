import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import MusicPlayer from "@/components/music-player"
import ModerationShowcase from "@/components/moderation-showcase"
import FunUtility from "@/components/fun-utility"
import CommandsDocumentation from "@/components/commands-documentation"
import GitHubStats from "@/components/github-stats"
import InvitationSetup from "@/components/invitation-setup"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MusicPlayer />
        <ModerationShowcase />
        <FunUtility />
        <CommandsDocumentation />
        <GitHubStats />
        <InvitationSetup />
      </main>
      <Footer />
    </div>
  )
}