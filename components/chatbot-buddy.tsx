"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Zap, Heart, Dumbbell, Coffee } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sender: "user" | "buddy"
  timestamp: Date
  type?: "text" | "suggestion" | "emergency"
}

interface QuickAction {
  id: string
  text: string
  icon: React.ReactNode
  response: string
  type: "emergency" | "motivation" | "activity"
}

const quickActions: QuickAction[] = [
  {
    id: "want-to-text",
    text: "I want to text her",
    icon: <Heart className="h-4 w-4" />,
    response:
      "Bro... if you text her at 2am, you'll regret it by 9am. Put the phone down and go do 20 push-ups. Your future self will thank you. Trust me on this one.",
    type: "emergency",
  },
  {
    id: "feeling-lonely",
    text: "I'm feeling lonely",
    icon: <Coffee className="h-4 w-4" />,
    response:
      "Loneliness hits different at night, I get it. But remember - you're not alone, you're just learning to enjoy your own company. Call a friend, watch something funny, or hit me up. We got this.",
    type: "emergency",
  },
  {
    id: "need-motivation",
    text: "I need motivation",
    icon: <Zap className="h-4 w-4" />,
    response:
      "Listen up, King. You're not the same person who got hurt. Every day you choose yourself is another day you're becoming unstoppable. You're literally leveling up while she's... well, who cares what she's doing?",
    type: "motivation",
  },
  {
    id: "what-to-do",
    text: "What should I do?",
    icon: <Dumbbell className="h-4 w-4" />,
    response:
      "Perfect timing! Here's what we're gonna do: 1) Hit the gym (endorphins > her), 2) Learn something new (knowledge is power), 3) Call your boys (real ones support you). Pick one and crush it.",
    type: "activity",
  },
]

const buddyResponses = [
  "You're asking the right questions, that's growth right there.",
  "Real talk - you're handling this better than most people would.",
  "I see you working on yourself. That's some king energy right there.",
  "Plot twist: the best revenge is becoming the person you were meant to be.",
  "She lost a good one. Her loss, your gain. Keep that energy up.",
  "You know what's attractive? A man who knows his worth. That's you right now.",
  "Every day you don't text her is another day you're choosing yourself. Respect.",
  "You're not healing, you're UPGRADING. There's a difference.",
]

const emergencyResponses = [
  "Hold up, King. Take 3 deep breaths. Whatever you're thinking of doing... don't. Talk to me first.",
  "I can sense the chaos energy. Before you do something you'll regret, let's chat. What's going on?",
  "Nah nah nah, we're not doing this. Put the phone down, step away from social media, and tell me what's happening.",
  "Emergency mode activated. Whatever it is, we can handle it together. But first - are you about to text her?",
]

export function ChatbotBuddy() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Yo! I'm your AI wingman. Think of me as that friend who always keeps it 100 with you. How you holding up today, King?",
      sender: "buddy",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      type: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBuddyResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Emergency responses
    if (
      lowerMessage.includes("text her") ||
      lowerMessage.includes("message her") ||
      lowerMessage.includes("call her")
    ) {
      return "STOP RIGHT THERE. Put the phone down. You know what happens when you text her? Nothing good. Go do 25 push-ups, drink some water, and remember why you started this journey. You're stronger than this urge."
    }

    if (lowerMessage.includes("miss her") || lowerMessage.includes("thinking about her")) {
      return "Missing someone is normal, but don't let it control you. She's living her life, you should be living yours BETTER. Channel that energy into something that makes you unstoppable."
    }

    if (
      lowerMessage.includes("social media") ||
      lowerMessage.includes("instagram") ||
      lowerMessage.includes("facebook")
    ) {
      return "Bro... stalking her socials is like picking at a scab. It just makes it worse. Block, mute, whatever you need to do. Your mental health > her vacation pics."
    }

    if (lowerMessage.includes("sad") || lowerMessage.includes("depressed") || lowerMessage.includes("down")) {
      return "Feeling down is part of the process, but don't set up camp there. You're not broken, you're just recalibrating. This is temporary, your growth is permanent."
    }

    if (lowerMessage.includes("gym") || lowerMessage.includes("workout") || lowerMessage.includes("exercise")) {
      return "NOW WE'RE TALKING! The gym is your therapy session with weights. Every rep is you choosing yourself. Go show those weights who's boss!"
    }

    if (lowerMessage.includes("friends") || lowerMessage.includes("hang out") || lowerMessage.includes("social")) {
      return "Your real friends are the ones checking on you right now. Lean on them, but also be the friend you'd want to have. Good energy attracts good people."
    }

    // Default responses
    return buddyResponses[Math.floor(Math.random() * buddyResponses.length)]
  }

  const sendMessage = (text: string, isQuickAction = false) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate buddy typing delay
    setTimeout(
      () => {
        const buddyResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: isQuickAction ? text : generateBuddyResponse(text),
          sender: "buddy",
          timestamp: new Date(),
          type: "text",
        }

        setMessages((prev) => [...prev, buddyResponse])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    ) // Random delay between 1.5-2.5s
  }

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.response, true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const getMessageTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Chat Header */}
      <Card className="rounded-b-none border-b-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Your AI Buddy</h2>
              <p className="text-sm text-muted-foreground font-normal">Always here to keep it real with you</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
        {messages.map((message) => (
          <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-3 text-sm",
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground border",
              )}
            >
              <p className="text-balance">{message.text}</p>
              <p
                className={cn(
                  "text-xs mt-1 opacity-70",
                  message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
                )}
              >
                {getMessageTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-card text-card-foreground border rounded-lg p-3 text-sm">
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-muted-foreground ml-2">Buddy is typing...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-card border-t">
        <p className="text-sm text-muted-foreground mb-3">Quick help:</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              className={cn(
                "justify-start gap-2 h-auto p-3 text-left bg-transparent",
                action.type === "emergency" && "border-destructive/30 hover:bg-destructive/5",
                action.type === "motivation" && "border-primary/30 hover:bg-primary/5",
                action.type === "activity" && "border-secondary/30 hover:bg-secondary/5",
              )}
              onClick={() => handleQuickAction(action)}
            >
              {action.icon}
              <span className="text-xs">{action.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-card border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Talk to your buddy..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
