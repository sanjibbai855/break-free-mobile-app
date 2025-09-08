"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Share2, Bookmark, ChevronLeft, ChevronRight, Flame, Target, Smile } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeedItem {
  id: string
  type: "quote" | "meme" | "affirmation"
  content: string
  author?: string
  category: string
  likes: number
  isLiked: boolean
}

const feedData: FeedItem[] = [
  {
    id: "1",
    type: "quote",
    content: "The best revenge is massive success. Keep building yourself, King.",
    author: "Frank Sinatra",
    category: "Motivation",
    likes: 1247,
    isLiked: false,
  },
  {
    id: "2",
    type: "meme",
    content: "When she says 'we can still be friends' but you're already planning your glow-up montage",
    category: "Humor",
    likes: 892,
    isLiked: true,
  },
  {
    id: "3",
    type: "affirmation",
    content: "I am worthy of love. I am growing stronger every day. My future is brighter than my past.",
    category: "Self-Love",
    likes: 2156,
    isLiked: false,
  },
  {
    id: "4",
    type: "quote",
    content: "Don't cry because it's over. Smile because you dodged a bullet.",
    category: "Perspective",
    likes: 743,
    isLiked: false,
  },
  {
    id: "5",
    type: "meme",
    content: "POV: You realize you can eat whatever you want for dinner now without asking anyone",
    category: "Freedom",
    likes: 1534,
    isLiked: false,
  },
  {
    id: "6",
    type: "affirmation",
    content: "Every day I choose myself. Every day I become unstoppable. This is my comeback story.",
    category: "Empowerment",
    likes: 987,
    isLiked: true,
  },
]

export function HealingFeed() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [items, setItems] = useState(feedData)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const currentItem = items[currentIndex]

  const handleLike = () => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === currentItem.id
          ? { ...item, isLiked: !item.isLiked, likes: item.isLiked ? item.likes - 1 : item.likes + 1 }
          : item,
      ),
    )
  }

  const nextItem = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevItem = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextItem()
    } else if (isRightSwipe) {
      prevItem()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quote":
        return <Target className="h-5 w-5" />
      case "meme":
        return <Smile className="h-5 w-5" />
      case "affirmation":
        return <Flame className="h-5 w-5" />
      default:
        return <Heart className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quote":
        return "text-primary"
      case "meme":
        return "text-secondary"
      case "affirmation":
        return "text-accent"
      default:
        return "text-primary"
    }
  }

  return (
    <div className="relative h-full">
      {/* Navigation arrows for desktop */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
        onClick={prevItem}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
        onClick={nextItem}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Main feed card */}
      <div
        className="h-full px-4 py-6"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Card
          className={cn(
            "h-full bg-gradient-to-br from-card to-muted/50 border-2 transition-all duration-300",
            currentItem.type === "quote" && "border-primary/30",
            currentItem.type === "meme" && "border-secondary/30",
            currentItem.type === "affirmation" && "border-accent/30",
            isTransitioning && "scale-95 opacity-80",
          )}
        >
          <CardContent className="h-full flex flex-col justify-between p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className={cn("p-2 rounded-full bg-muted", getTypeColor(currentItem.type))}>
                  {getTypeIcon(currentItem.type)}
                </div>
                <div>
                  <p className="font-semibold capitalize">{currentItem.type}</p>
                  <p className="text-sm text-muted-foreground">{currentItem.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>{currentIndex + 1}</span>
                <span>/</span>
                <span>{items.length}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-balance mb-4">
                  {currentItem.content}
                </p>
                {currentItem.author && <p className="text-muted-foreground italic">— {currentItem.author}</p>}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={cn("flex items-center gap-2", currentItem.isLiked && "text-red-500")}
                >
                  <Heart className={cn("h-5 w-5", currentItem.isLiked && "fill-current")} />
                  <span>{currentItem.likes}</span>
                </Button>

                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </Button>
              </div>

              <Button variant="ghost" size="sm">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30",
            )}
          />
        ))}
      </div>
    </div>
  )
}
