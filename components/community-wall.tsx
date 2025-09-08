"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Plus, Trophy, Smile, Target, Flame, Users, ThumbsUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface CommunityPost {
  id: string
  author: string
  avatar: string
  content: string
  type: "progress" | "win" | "meme" | "advice" | "support"
  likes: number
  comments: number
  isLiked: boolean
  timestamp: Date
  streak?: number
  level?: string
}

const anonymousNames = [
  "KingInProgress",
  "HealingWarrior",
  "PhoenixRising",
  "StrongSilently",
  "BetterEveryDay",
  "UnstoppableForce",
  "RisingFromAshes",
  "GrowthMindset",
  "FreedomSeeker",
  "LevelingUp",
  "SelfLoveKing",
  "MovingForward",
]

const avatarColors = [
  "bg-primary",
  "bg-secondary",
  "bg-accent",
  "bg-green-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-yellow-500",
]

export function CommunityWall() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: "HealingWarrior",
      avatar: "bg-primary",
      content:
        "Day 45 no contact! Finally hit the gym consistently for 2 weeks straight. Feeling stronger mentally and physically. To anyone just starting - it gets easier, I promise.",
      type: "progress",
      likes: 127,
      comments: 23,
      isLiked: false,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      streak: 45,
      level: "Healing King",
    },
    {
      id: "2",
      author: "PhoenixRising",
      avatar: "bg-secondary",
      content:
        "She texted me yesterday asking to 'talk.' I read it, took a deep breath, and deleted it without responding. Then I went for a run. Small wins, but they add up!",
      type: "win",
      likes: 89,
      comments: 15,
      isLiked: true,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
      id: "3",
      author: "UnstoppableForce",
      avatar: "bg-green-500",
      content:
        "POV: You realize you can watch whatever you want on Netflix without someone complaining about your 'terrible taste' in movies. Freedom hits different 😂",
      type: "meme",
      likes: 156,
      comments: 31,
      isLiked: false,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    },
    {
      id: "4",
      author: "GrowthMindset",
      avatar: "bg-purple-500",
      content:
        "Pro tip: When you feel the urge to check her social media, do 10 push-ups instead. I'm now accidentally jacked because I used to be a serial stalker. Win-win!",
      type: "advice",
      likes: 203,
      comments: 42,
      isLiked: true,
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    },
    {
      id: "5",
      author: "SelfLoveKing",
      avatar: "bg-blue-500",
      content:
        "Rough day today. Saw her at the coffee shop with someone new. Not gonna lie, it stung. But I ordered my drink, smiled at the barista, and walked out with my head high. Progress isn't always linear.",
      type: "support",
      likes: 78,
      comments: 19,
      isLiked: false,
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
    },
  ])

  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostType, setNewPostType] = useState<CommunityPost["type"]>("progress")

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const createPost = () => {
    if (!newPostContent.trim()) return

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: anonymousNames[Math.floor(Math.random() * anonymousNames.length)],
      avatar: avatarColors[Math.floor(Math.random() * avatarColors.length)],
      content: newPostContent,
      type: newPostType,
      likes: 0,
      comments: 0,
      isLiked: false,
      timestamp: new Date(),
    }

    setPosts((prev) => [newPost, ...prev])
    setNewPostContent("")
    setShowNewPost(false)
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "progress":
        return <Target className="h-4 w-4" />
      case "win":
        return <Trophy className="h-4 w-4" />
      case "meme":
        return <Smile className="h-4 w-4" />
      case "advice":
        return <Flame className="h-4 w-4" />
      case "support":
        return <Heart className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "progress":
        return "text-primary"
      case "win":
        return "text-secondary"
      case "meme":
        return "text-green-500"
      case "advice":
        return "text-purple-500"
      case "support":
        return "text-pink-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const postTypes = [
    { value: "progress", label: "Progress Update", icon: <Target className="h-4 w-4" /> },
    { value: "win", label: "Victory", icon: <Trophy className="h-4 w-4" /> },
    { value: "meme", label: "Humor", icon: <Smile className="h-4 w-4" /> },
    { value: "advice", label: "Advice", icon: <Flame className="h-4 w-4" /> },
    { value: "support", label: "Need Support", icon: <Heart className="h-4 w-4" /> },
  ]

  return (
    <div className="space-y-4 p-4 pb-20">
      {/* Header */}
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Community Wall</h1>
                <p className="text-sm text-muted-foreground">Anonymous support from kings like you</p>
              </div>
            </div>
            <Button onClick={() => setShowNewPost(!showNewPost)} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Post
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* New Post Form */}
      {showNewPost && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex gap-2 flex-wrap">
              {postTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={newPostType === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewPostType(type.value as CommunityPost["type"])}
                  className="gap-2"
                >
                  {type.icon}
                  {type.label}
                </Button>
              ))}
            </div>
            <Textarea
              placeholder="Share your journey anonymously... (Keep it supportive and real)"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowNewPost(false)}>
                Cancel
              </Button>
              <Button onClick={createPost} disabled={!newPostContent.trim()}>
                Share Anonymously
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white", post.avatar)}>
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{post.author}</p>
                    {post.level && <Badge variant="secondary">{post.level}</Badge>}
                    {post.streak && <Badge variant="outline">{post.streak} days</Badge>}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={cn("flex items-center gap-1", getPostTypeColor(post.type))}>
                      {getPostTypeIcon(post.type)}
                      <span className="capitalize">{post.type}</span>
                    </div>
                    <span>•</span>
                    <span>{getTimeAgo(post.timestamp)}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-sm leading-relaxed mb-4 text-balance">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={cn("gap-2 h-8", post.isLiked && "text-red-500")}
                  >
                    <ThumbsUp className={cn("h-4 w-4", post.isLiked && "fill-current")} />
                    <span>{post.likes}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="gap-2 h-8">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="gap-2 h-8">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Guidelines */}
      <Card className="border-dashed">
        <CardContent className="p-4 text-center">
          <h3 className="font-medium mb-2">Community Guidelines</h3>
          <p className="text-sm text-muted-foreground">
            Keep it supportive, real, and anonymous. We're all here to lift each other up. No negativity, no personal
            attacks, just kings helping kings.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
