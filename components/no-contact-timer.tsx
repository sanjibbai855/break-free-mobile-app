"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, Zap, Crown, Target, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface Milestone {
  days: number
  title: string
  message: string
  icon: React.ReactNode
  color: string
  achieved: boolean
}

export function NoContactTimer() {
  const [startDate] = useState(new Date("2024-11-15")) // Example start date
  const [currentStreak, setCurrentStreak] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationMilestone, setCelebrationMilestone] = useState<Milestone | null>(null)

  const milestones: Milestone[] = [
    {
      days: 1,
      title: "First Day",
      message: "You did it! Day one is always the hardest. Keep going, King!",
      icon: <Target className="h-6 w-6" />,
      color: "text-primary",
      achieved: currentStreak >= 1,
    },
    {
      days: 3,
      title: "3 Day Warrior",
      message: "Three days strong! The urge to text is fading. You're building mental muscle!",
      icon: <Zap className="h-6 w-6" />,
      color: "text-secondary",
      achieved: currentStreak >= 3,
    },
    {
      days: 7,
      title: "Week Champion",
      message: "One whole week! You're officially in beast mode. That's some serious self-control!",
      icon: <Trophy className="h-6 w-6" />,
      color: "text-primary",
      achieved: currentStreak >= 7,
    },
    {
      days: 14,
      title: "Two Week Legend",
      message: "Two weeks of pure strength! You're not the same person who started this journey.",
      icon: <Flame className="h-6 w-6" />,
      color: "text-secondary",
      achieved: currentStreak >= 14,
    },
    {
      days: 30,
      title: "Monthly Master",
      message: "30 DAYS! You absolute legend! You've officially leveled up your life!",
      icon: <Crown className="h-6 w-6" />,
      color: "text-primary",
      achieved: currentStreak >= 30,
    },
    {
      days: 60,
      title: "Unstoppable Force",
      message: "60 days of pure discipline! You're not just healing, you're THRIVING!",
      icon: <Crown className="h-6 w-6" />,
      color: "text-secondary",
      achieved: currentStreak >= 60,
    },
  ]

  useEffect(() => {
    const calculateStreak = () => {
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - startDate.getTime())
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      setCurrentStreak(diffDays)

      // Check for milestone celebration
      const recentMilestone = milestones.find((m) => m.days === diffDays)
      if (recentMilestone && !showCelebration) {
        setCelebrationMilestone(recentMilestone)
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 5000)
      }
    }

    calculateStreak()
    const interval = setInterval(calculateStreak, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(interval)
  }, [startDate, showCelebration])

  const getTimeBreakdown = () => {
    const totalHours = currentStreak * 24
    const totalMinutes = totalHours * 60
    const weeks = Math.floor(currentStreak / 7)
    const remainingDays = currentStreak % 7

    return { totalHours, totalMinutes, weeks, remainingDays }
  }

  const { totalHours, totalMinutes, weeks, remainingDays } = getTimeBreakdown()

  const getMotivationalMessage = () => {
    if (currentStreak === 0) return "Your journey starts now. You've got this!"
    if (currentStreak < 3) return "Every hour counts. Stay strong!"
    if (currentStreak < 7) return "You're building unstoppable momentum!"
    if (currentStreak < 30) return "Look at you go! Absolute legend!"
    return "You're not just healing, you're DOMINATING!"
  }

  const resetTimer = () => {
    if (confirm("Are you sure you want to reset your no-contact streak?")) {
      // In a real app, this would update the start date
      window.location.reload()
    }
  }

  return (
    <div className="space-y-6 p-4 pb-20">
      {/* Celebration Modal */}
      {showCelebration && celebrationMilestone && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm bg-gradient-to-br from-primary/20 to-secondary/20 border-primary animate-pulse">
            <CardContent className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className={cn("p-4 rounded-full bg-muted", celebrationMilestone.color)}>
                  {celebrationMilestone.icon}
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">{celebrationMilestone.title}</h2>
              <p className="text-muted-foreground mb-6 text-balance">{celebrationMilestone.message}</p>
              <Button onClick={() => setShowCelebration(false)} className="w-full">
                Keep Going!
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Timer Display */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-primary mb-2">{currentStreak}</h1>
            <p className="text-xl text-muted-foreground">{currentStreak === 1 ? "Day" : "Days"} No Contact</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-secondary">{weeks}</p>
              <p className="text-sm text-muted-foreground">Weeks</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-secondary">{remainingDays}</p>
              <p className="text-sm text-muted-foreground">Extra Days</p>
            </div>
          </div>

          <p className="text-lg font-medium mb-6 text-balance">{getMotivationalMessage()}</p>

          <div className="flex gap-2 justify-center">
            <Badge variant="secondary">{totalHours.toLocaleString()} hours strong</Badge>
            <Badge variant="outline">{totalMinutes.toLocaleString()} minutes</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            Milestones
          </h2>
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.days}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  milestone.achieved ? "bg-primary/10 border border-primary/20" : "bg-muted/50",
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-full bg-muted",
                    milestone.achieved ? milestone.color : "text-muted-foreground",
                  )}
                >
                  {milestone.icon}
                </div>
                <div className="flex-1">
                  <p className={cn("font-medium", milestone.achieved ? "text-foreground" : "text-muted-foreground")}>
                    {milestone.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{milestone.days} days</p>
                </div>
                {milestone.achieved && <Badge className="bg-primary text-primary-foreground">Achieved!</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Support */}
      <Card className="border-destructive/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-destructive">Feeling Weak?</h3>
          <p className="text-muted-foreground mb-4">
            Remember why you started. You're stronger than the urge to reach out.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              Talk to Buddy
            </Button>
            <Button variant="destructive" onClick={resetTimer} size="sm">
              Reset Timer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
