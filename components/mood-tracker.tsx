"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Dumbbell, BookOpen, Users, Music, Phone, TrendingUp, Calendar, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface MoodEntry {
  id: string
  mood: string
  emoji: string
  timestamp: Date
  activities?: string[]
}

interface ActivitySuggestion {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  category: "physical" | "mental" | "social" | "creative"
  duration: string
  difficulty: "easy" | "medium" | "hard"
}

const moodOptions = [
  { mood: "terrible", emoji: "😢", label: "Terrible", color: "text-red-500" },
  { mood: "sad", emoji: "😔", label: "Sad", color: "text-orange-500" },
  { mood: "okay", emoji: "😐", label: "Okay", color: "text-yellow-500" },
  { mood: "good", emoji: "😊", label: "Good", color: "text-green-500" },
  { mood: "amazing", emoji: "🔥", label: "Amazing", color: "text-primary" },
]

const activitySuggestions: Record<string, ActivitySuggestion[]> = {
  terrible: [
    {
      id: "1",
      title: "Call a Friend",
      description: "Reach out to someone who cares about you",
      icon: <Phone className="h-5 w-5" />,
      category: "social",
      duration: "15-30 min",
      difficulty: "easy",
    },
    {
      id: "2",
      title: "Journal Your Feelings",
      description: "Write down what you're going through",
      icon: <BookOpen className="h-5 w-5" />,
      category: "mental",
      duration: "10-20 min",
      difficulty: "easy",
    },
    {
      id: "3",
      title: "Take a Walk",
      description: "Fresh air and movement can help",
      icon: <Dumbbell className="h-5 w-5" />,
      category: "physical",
      duration: "20-30 min",
      difficulty: "easy",
    },
  ],
  sad: [
    {
      id: "4",
      title: "Listen to Music",
      description: "Put on your favorite playlist",
      icon: <Music className="h-5 w-5" />,
      category: "creative",
      duration: "30-60 min",
      difficulty: "easy",
    },
    {
      id: "5",
      title: "Light Workout",
      description: "Get those endorphins flowing",
      icon: <Dumbbell className="h-5 w-5" />,
      category: "physical",
      duration: "20-45 min",
      difficulty: "medium",
    },
    {
      id: "6",
      title: "Meditation",
      description: "Center yourself with mindfulness",
      icon: <Brain className="h-5 w-5" />,
      category: "mental",
      duration: "10-15 min",
      difficulty: "easy",
    },
  ],
  okay: [
    {
      id: "7",
      title: "Hit the Gym",
      description: "Channel that energy into gains",
      icon: <Dumbbell className="h-5 w-5" />,
      category: "physical",
      duration: "45-90 min",
      difficulty: "medium",
    },
    {
      id: "8",
      title: "Learn Something New",
      description: "Invest in yourself with a skill",
      icon: <BookOpen className="h-5 w-5" />,
      category: "mental",
      duration: "30-60 min",
      difficulty: "medium",
    },
    {
      id: "9",
      title: "Meet Up with Friends",
      description: "Social connection boosts mood",
      icon: <Users className="h-5 w-5" />,
      category: "social",
      duration: "2-4 hours",
      difficulty: "easy",
    },
  ],
  good: [
    {
      id: "10",
      title: "Intense Workout",
      description: "Push your limits and feel unstoppable",
      icon: <Dumbbell className="h-5 w-5" />,
      category: "physical",
      duration: "60-90 min",
      difficulty: "hard",
    },
    {
      id: "11",
      title: "Plan Your Future",
      description: "Set goals and make action plans",
      icon: <Lightbulb className="h-5 w-5" />,
      category: "mental",
      duration: "30-60 min",
      difficulty: "medium",
    },
    {
      id: "12",
      title: "Try Something New",
      description: "Step out of your comfort zone",
      icon: <TrendingUp className="h-5 w-5" />,
      category: "creative",
      duration: "1-3 hours",
      difficulty: "medium",
    },
  ],
  amazing: [
    {
      id: "13",
      title: "Beast Mode Workout",
      description: "You're unstoppable - show the world!",
      icon: <Dumbbell className="h-5 w-5" />,
      category: "physical",
      duration: "90+ min",
      difficulty: "hard",
    },
    {
      id: "14",
      title: "Help Others",
      description: "Share your positive energy",
      icon: <Users className="h-5 w-5" />,
      category: "social",
      duration: "2+ hours",
      difficulty: "medium",
    },
    {
      id: "15",
      title: "Create Something",
      description: "Channel this energy into creation",
      icon: <Lightbulb className="h-5 w-5" />,
      category: "creative",
      duration: "1-4 hours",
      difficulty: "medium",
    },
  ],
}

export function MoodTracker() {
  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    {
      id: "1",
      mood: "good",
      emoji: "😊",
      timestamp: new Date(Date.now() - 86400000), // Yesterday
      activities: ["gym", "journaling"],
    },
    {
      id: "2",
      mood: "okay",
      emoji: "😐",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      activities: ["walk"],
    },
    {
      id: "3",
      mood: "amazing",
      emoji: "🔥",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      activities: ["workout", "friends"],
    },
  ])
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)

  const logMood = (mood: string, emoji: string) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      emoji,
      timestamp: new Date(),
    }
    setMoodHistory((prev) => [newEntry, ...prev.slice(0, 6)]) // Keep last 7 entries
    setCurrentMood(mood)
  }

  const completeActivity = (activityId: string) => {
    setSelectedActivity(activityId)
    // In a real app, this would track completed activities
    setTimeout(() => setSelectedActivity(null), 2000)
  }

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return "neutral"

    const moodValues = { terrible: 1, sad: 2, okay: 3, good: 4, amazing: 5 }
    const recent = moodHistory.slice(0, 3)
    const avg =
      recent.reduce((sum, entry) => sum + moodValues[entry.mood as keyof typeof moodValues], 0) / recent.length

    if (avg >= 4) return "improving"
    if (avg <= 2.5) return "declining"
    return "stable"
  }

  const getTrendMessage = () => {
    const trend = getMoodTrend()
    switch (trend) {
      case "improving":
        return "You're on an upward trajectory! Keep it up, King!"
      case "declining":
        return "Rough patch? That's normal. You've got this."
      case "stable":
        return "Steady progress. Consistency is key."
      default:
        return "Track your mood to see patterns."
    }
  }

  const todaysMood = moodHistory.find((entry) => entry.timestamp.toDateString() === new Date().toDateString())

  return (
    <div className="space-y-6 p-4 pb-20">
      {/* Today's Mood Check-in */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            How are you feeling today?
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!todaysMood ? (
            <div className="grid grid-cols-5 gap-2 mb-4">
              {moodOptions.map((option) => (
                <Button
                  key={option.mood}
                  variant="ghost"
                  className="h-16 flex flex-col gap-1 hover:bg-muted"
                  onClick={() => logMood(option.mood, option.emoji)}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-xs">{option.label}</span>
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <span className="text-4xl mb-2 block">{todaysMood.emoji}</span>
              <p className="text-lg font-medium">You're feeling {todaysMood.mood} today</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-transparent"
                onClick={() => setMoodHistory((prev) => prev.filter((entry) => entry.id !== todaysMood.id))}
              >
                Update Mood
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {(currentMood || todaysMood) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-secondary" />
              AI Suggestions for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activitySuggestions[currentMood || todaysMood!.mood]?.map((activity) => (
                <div
                  key={activity.id}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border transition-colors cursor-pointer",
                    selectedActivity === activity.id ? "bg-primary/10 border-primary" : "bg-muted/50 hover:bg-muted",
                  )}
                  onClick={() => completeActivity(activity.id)}
                >
                  <div className="p-2 rounded-full bg-background">{activity.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.duration}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs",
                          activity.difficulty === "easy" && "text-green-500",
                          activity.difficulty === "medium" && "text-yellow-500",
                          activity.difficulty === "hard" && "text-red-500",
                        )}
                      >
                        {activity.difficulty}
                      </Badge>
                    </div>
                  </div>
                  {selectedActivity === activity.id && (
                    <Badge className="bg-primary text-primary-foreground">Done!</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mood History & Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Your Mood Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Recent Trend</p>
            <p className="font-medium">{getTrendMessage()}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Last 7 Days</p>
            {moodHistory.slice(0, 7).map((entry, index) => {
              const moodOption = moodOptions.find((opt) => opt.mood === entry.mood)
              return (
                <div key={entry.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="text-2xl">{entry.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium capitalize">{entry.mood}</p>
                    <p className="text-sm text-muted-foreground">{entry.timestamp.toLocaleDateString()}</p>
                  </div>
                  {index === 0 && <Badge variant="secondary">Today</Badge>}
                </div>
              )
            })}
          </div>

          {moodHistory.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start tracking your mood to see patterns and get personalized suggestions!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
