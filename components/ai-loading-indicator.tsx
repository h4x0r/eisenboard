"use client"

import { Loader2, Sparkles } from "lucide-react"

interface AILoadingIndicatorProps {
  message?: string
}

export function AILoadingIndicator({ message = "AI is thinking..." }: AILoadingIndicatorProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Sparkles className="h-8 w-8 text-primary absolute -top-1 -left-1 animate-pulse" />
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <Sparkles className="h-6 w-6 text-primary absolute -bottom-1 -right-1 animate-pulse delay-75" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{message}</p>
            <p className="text-xs text-muted-foreground mt-1">Powered by Claude Opus 4.1</p>
          </div>
        </div>
      </div>
    </div>
  )
}