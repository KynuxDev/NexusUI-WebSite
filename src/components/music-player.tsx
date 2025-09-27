"use client"

import { useState, useEffect } from "react"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Shuffle, Repeat, Heart, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Track {
  id: string
  title: string
  artist: string
  duration: string
  durationSeconds: number
  cover: string
}

const playlist: Track[] = [
  { id: "1", title: "Imagine Dragons - Believer", artist: "Imagine Dragons", duration: "3:12", durationSeconds: 192, cover: "🎵" },
  { id: "2", title: "The Weeknd - Blinding Lights", artist: "The Weeknd", duration: "3:21", durationSeconds: 201, cover: "🌟" },
  { id: "3", title: "Dua Lipa - Levitating", artist: "Dua Lipa", duration: "3:23", durationSeconds: 203, cover: "💫" },
  { id: "4", title: "Ed Sheeran - Shape of You", artist: "Ed Sheeran", duration: "3:53", durationSeconds: 233, cover: "🎸" },
  { id: "5", title: "Billie Eilish - Bad Guy", artist: "Billie Eilish", duration: "3:14", durationSeconds: 194, cover: "😈" }
]

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(45)
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const track = playlist[currentTrack]
  const currentTime = Math.floor((progress / 100) * track.durationSeconds)
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext()
            return 0
          }
          return prev + 0.5
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isPlaying, currentTrack])

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length)
    setProgress(0)
  }

  const handlePrev = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length)
    setProgress(0)
  }

  const handleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3)
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
            Müzik <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Deneyimi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Yüksek kaliteli ses, kesintisiz çalma ve gelişmiş kontroller ile mükemmel müzik deneyimi
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 shadow-2xl">
            
            <div className="flex flex-col lg:flex-row gap-8">
              
              <div className="lg:w-1/3">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                  className="relative mx-auto w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl"
                >
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-6xl lg:text-7xl">
                    {track.cover}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </div>

              <div className="lg:w-2/3 space-y-6">
                <div className="text-center lg:text-left">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{track.title}</h3>
                      <p className="text-lg text-gray-300 mb-4">{track.artist}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{track.duration}</span>
                  </div>
                  <div className="relative group">
                    <div className="w-full h-2 bg-gray-700 rounded-full cursor-pointer">
                      <motion.div
                        className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative"
                        style={{ width: `${progress}%` }}
                        layoutId="progress"
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                      isShuffled 
                        ? "bg-purple-500/30 text-purple-400 hover:bg-purple-500/50" 
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Shuffle className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                  </button>

                  <button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>

                  <button
                    onClick={handleRepeat}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors relative",
                      repeatMode > 0 
                        ? "bg-purple-500/30 text-purple-400 hover:bg-purple-500/50" 
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Repeat className="h-4 w-4" />
                    {repeatMode === 2 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full text-xs flex items-center justify-center text-white">1</span>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-full transition-colors",
                      isLiked 
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
                    <span className="text-sm">Beğen</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <div className="w-20 h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        style={{ width: `${isMuted ? 0 : volume}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-8">{isMuted ? 0 : volume}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
                <span>Kuyrukta Bekleyenler</span>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {playlist.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-xl transition-colors cursor-pointer",
                      index === currentTrack 
                        ? "bg-purple-500/20 border border-purple-500/30" 
                        : "hover:bg-white/5"
                    )}
                    onClick={() => {
                      setCurrentTrack(index)
                      setProgress(0)
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                      {index === currentTrack && isPlaying ? (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="text-lg"
                        >
                          🎵
                        </motion.div>
                      ) : (
                        <span className="text-sm font-medium text-gray-400">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm font-medium truncate",
                        index === currentTrack ? "text-purple-400" : "text-white"
                      )}>
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{item.artist}</p>
                    </div>
                    <span className="text-xs text-gray-500">{item.duration}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}