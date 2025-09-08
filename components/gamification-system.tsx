"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, Trophy, Target, Shield, Star, Flame, Heart, Dumbbell, BookOpen, Users, Award } from "lucide-react"
import { cn } from "@/lib/utils"

interface Level {
  id: string
  name: string
  minXP: number
  maxXP: number
  icon: React.ReactNode
  color: string
  description: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  xpReward: number
  category: "no-contact" | "mood" | "activity" | "social" | "milestone"
  unlocked: boolean
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
}

const levels: Level[] = [
  {
    id: "sad-boy",
    name: "Sad Boy",
    minXP: 0,
    maxXP: 100,
    icon: <Heart className="h-6 w-6" />,
    color: "text-muted-foreground",
    description: "Everyone starts somewhere. You're taking the first step.",
  },
  {
    id: "healing-warrior",
    name: "Healing Warrior",
    minXP: 100,
    maxXP: 300,
    icon: <Shield className="h-6 w-6" />,
    color: "text-secondary",
    description: "You're fighting the good fight. Keep pushing forward.",
  },
  {
    id: "healing-king",
    name: "Healing King",
    minXP: 300,
    maxXP: 600,
    icon: <Crown className="h-6 w-6" />,
    color: "text-primary",
    description: "You're mastering the art of moving on. Respect.",
  },
  {
    id: "unstoppable",
    name: "Unstoppable",
    minXP: 600,
    maxXP: 1000,
    icon: <Flame className="h-6 w-6" />,
    color: "text-accent",
    description: "You're not just healed, you're THRIVING. Absolute legend.",
  },
]

export function GamificationSystem() {
  const [currentXP, setCurrentXP] = useState(350) // Example XP
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first-day",
      title: "First Day Strong",
      description: "Completed your first day of no contact",
      icon: <Target className="h-5 w-5" />,
      xpReward: 25,
      category: "no-contact",
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 20),
    },
    {
      id: "week-warrior",
      title: "Week Warrior",
      description: "7 days of no contact - you're building serious discipline",
      icon: <Trophy className="h-5 w-5" />,
      xpReward: 50,
      category: "no-contact",
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 15),
    },
    {
      id: "no-stalking",
      title: "Digital Detox King",
      description: "Didn't check her social media for 7 days straight",
      icon: <Shield className="h-5 w-5" />,
      xpReward: 75,
      category: "no-contact",
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 10),
    },
    {
      id: "mood-tracker",
      title: "Self-Aware Legend",
      description: "Tracked your mood for 7 consecutive days",
      icon: <Star className="h-5 w-5" />,
      xpReward: 40,
      category: "mood",
      unlocked: true,
      unlockedAt: new Date(Date.now() - 86400000 * 5),
    },
    {
      id: "gym-beast",
      title: "Gym Beast",
      description: "Completed 10 workout activities",
      icon: <Dumbbell className="h-5 w-5" />,
      xpReward: 60,
      category: "activity",
      unlocked: false,
      progress: 7,
      maxProgress: 10,
    },
    {
      id: "knowledge-seeker",
      title: "Knowledge Seeker",
      description: "Completed 5 learning activities",
      icon: <BookOpen className="h-5 w-5" />,
      xpReward: 45,
      category: "activity",
      unlocked: false,
      progress: 3,
      maxProgress: 5,
    },
    {
      id: "social-butterfly",
      title: "Social Butterfly",
      description: "Hung out with friends 5 times this month",
      icon: <Users className="h-5 w-5" />,
      xpReward: 55,
      category: "social",
      unlocked: false,
      progress: 2,
      maxProgress: 5,
    },
    {
      id: "month-master",
      title: "Monthly Master",
      description: "30 days of no contact - absolute legend status",
      icon: <Crown className="h-5 w-5" />,
      xpReward: 100,
      category: "milestone",
      unlocked: false,
      progress: 23,
      maxProgress: 30,
    },
  ])

  const [showLevelUp, setShowLevelUp] = useState(false)
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null)

  const getCurrentLevel = () => {
    return levels.find((level) => currentXP >= level.minXP && currentXP < level.maxXP) || levels[levels.length - 1]
  }

  const getNextLevel = () => {
    const currentLevel = getCurrentLevel()
    const currentIndex = levels.findIndex((level) => level.id === currentLevel.id)
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null
  }

  const getProgressToNextLevel = () => {
    const currentLevel = getCurrentLevel()
    const nextLevel = getNextLevel()

    if (!nextLevel) return 100 // Max level reached

    const progressInCurrentLevel = currentXP - currentLevel.minXP
    const totalXPNeededForLevel = nextLevel.minXP - currentLevel.minXP

    return (progressInCurrentLevel / totalXPNeededForLevel) * 100
  }

  const getXPToNextLevel = () => {
    const nextLevel = getNextLevel()
    return nextLevel ? nextLevel.minXP - currentXP : 0
  }

  const unlockAchievement = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) =>
        achievement.id === achievementId ? { ...achievement, unlocked: true, unlockedAt: new Date() } : achievement,
      ),
    )

    const achievement = achievements.find((a) => a.id === achievementId)
    if (achievement) {
      setNewAchievement(achievement)
      setCurrentXP((prev) => prev + achievement.xpReward)
      setTimeout(() => setNewAchievement(null), 4000)
    }
  }

  const currentLevel = getCurrentLevel()
  const nextLevel = getNextLevel()
  const progressPercent = getProgressToNextLevel()
  const xpToNext = getXPToNextLevel()

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const lockedAchievements = achievements.filter((a) => !a.unlocked)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "no-contact":
        return "text-primary"
      case "mood":
        return "text-secondary"
      case "activity":
        return "text-accent"
      case "social":
        return "text-green-500"
      case "milestone":
        return "text-yellow-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6 p-4 pb-20">
      {/* Achievement Unlock Modal */}
      {newAchievement && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm bg-gradient-to-br from-primary/20 to-secondary/20 border-primary animate-bounce">
            <CardContent className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="p-4 rounded-full bg-primary text-primary-foreground">{newAchievement.icon}</div>
              </div>
              <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
              <h3 className="text-lg font-semibold mb-2">{newAchievement.title}</h3>
              <p className="text-muted-foreground mb-4">{newAchievement.description}</p>
              <Badge className="bg-secondary text-secondary-foreground">+{newAchievement.xpReward} XP</Badge>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Current Level & Progress */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className={cn("p-3 rounded-full bg-muted", currentLevel.color)}>{currentLevel.icon}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{currentLevel.name}</h2>
              <p className="text-muted-foreground">{currentLevel.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{currentXP}</p>
              <p className="text-sm text-muted-foreground">XP</p>
            </div>
          </div>

          {nextLevel && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to {nextLevel.name}</span>
                <span>{xpToNext} XP to go</span>
              </div>
              <Progress value={progressPercent} className="h-3" />
            </div>
          )}

          {!nextLevel && (
            <div className="text-center py-4">
              <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">MAX LEVEL REACHED!</Badge>
              <p className="text-sm text-muted-foreground mt-2">You are truly unstoppable!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-secondary" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unlockedAchievements.slice(0, 3).map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10"
              >
                <div className={cn("p-2 rounded-full bg-muted", getCategoryColor(achievement.category))}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">+{achievement.xpReward} XP</Badge>
                  {achievement.unlockedAt && (
                    <p className="text-xs text-muted-foreground mt-1">{achievement.unlockedAt.toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Towards Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lockedAchievements
              .filter((a) => a.progress !== undefined)
              .map((achievement) => (
                <div key={achievement.id} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-full bg-muted", getCategoryColor(achievement.category))}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    <Badge variant="outline">+{achievement.xpReward} XP</Badge>
                  </div>
                  <div className="ml-11">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {achievement.progress}/{achievement.maxProgress}
                      </span>
                    </div>
                    <Progress
                      value={((achievement.progress || 0) / (achievement.maxProgress || 1)) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* All Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-6 w-6 text-secondary" />
            Achievement Gallery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={cn(
                  "p-4 rounded-lg border text-center transition-colors",
                  achievement.unlocked ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-muted opacity-60",
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-full bg-muted mx-auto mb-2 w-fit",
                    achievement.unlocked ? getCategoryColor(achievement.category) : "text-muted-foreground",
                  )}
                >
                  {achievement.icon}
                </div>
                <h4 className={cn("font-medium text-sm mb-1", !achievement.unlocked && "text-muted-foreground")}>
                  {achievement.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
                <Badge variant={achievement.unlocked ? "default" : "outline"} className="text-xs">
                  {achievement.unlocked ? "Unlocked" : `${achievement.xpReward} XP`}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Debug: Unlock Achievement Button (for demo) */}
      <Card className="border-dashed">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground mb-3">Demo: Unlock next achievement</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const nextLocked = lockedAchievements[0]
              if (nextLocked) unlockAchievement(nextLocked.id)
            }}
            disabled={lockedAchievements.length === 0}
          >
            Unlock Achievement
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
