"use client"

import { Crown, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  currentLevel: string
  streak: number
}

export function AppHeader({ currentLevel, streak }: AppHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-card border-b border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-secondary" />
          <div>
            <h1 className="text-lg font-bold text-primary">BreakFree</h1>
            <p className="text-sm text-muted-foreground">{currentLevel}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{streak} days</p>
          <p className="text-xs text-muted-foreground">No Contact</p>
        </div>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
