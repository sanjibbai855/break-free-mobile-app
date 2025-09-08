"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { HealingFeed } from "@/components/healing-feed"
import { NoContactTimer } from "@/components/no-contact-timer"
import { MoodTracker } from "@/components/mood-tracker"
import { GamificationSystem } from "@/components/gamification-system"
import { ChatbotBuddy } from "@/components/chatbot-buddy"
import { CommunityWall } from "@/components/community-wall"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [currentLevel] = useState("Healing King")
  const [streak] = useState(23)

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <div className="h-[calc(100vh-8rem)]">
            <HealingFeed />
          </div>
        )

      case "timer":
        return <NoContactTimer />

      case "mood":
        return <MoodTracker />

      case "progress":
        return <GamificationSystem />

      case "chat":
        return <ChatbotBuddy />

      case "community":
        return <CommunityWall />

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader currentLevel={currentLevel} streak={streak} />
      <main className="flex-1">{renderContent()}</main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
