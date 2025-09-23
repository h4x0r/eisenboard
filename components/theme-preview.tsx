"use client"

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"

interface ThemePreviewProps {
  themeName: string
  isActive?: boolean
  onClick?: () => void
}

const themeColors = {
  default: {
    bg: "bg-slate-900",
    card: "bg-slate-800",
    text: "text-slate-100",
    accent: "bg-slate-700",
  },
  "catppuccin-mocha": {
    bg: "bg-[#1e1e2e]",
    card: "bg-[#313244]",
    text: "text-[#cdd6f4]",
    accent: "bg-[#89b4fa]",
  },
  "catppuccin-latte": {
    bg: "bg-[#eff1f5]",
    card: "bg-[#dce0e8]",
    text: "text-[#4c4f69]",
    accent: "bg-[#1e66f5]",
  },
  "catppuccin-macchiato": {
    bg: "bg-[#24273a]",
    card: "bg-[#363a4f]",
    text: "text-[#cad3f5]",
    accent: "bg-[#8aadf4]",
  },
  "catppuccin-frappe": {
    bg: "bg-[#303446]",
    card: "bg-[#414559]",
    text: "text-[#c6d0f5]",
    accent: "bg-[#8caaee]",
  },
  "solarized-dark": {
    bg: "bg-[#002b36]",
    card: "bg-[#073642]",
    text: "text-[#839496]",
    accent: "bg-[#268bd2]",
  },
  "solarized-light": {
    bg: "bg-[#fdf6e3]",
    card: "bg-[#eee8d5]",
    text: "text-[#657b83]",
    accent: "bg-[#268bd2]",
  },
} as const

export function ThemePreview({ themeName, isActive, onClick }: ThemePreviewProps) {
  const colors = themeColors[themeName as keyof typeof themeColors] || themeColors.default

  return (
    <Card
      className={`cursor-pointer transition-all hover:scale-105 ${isActive ? "ring-2 ring-primary" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className={`${colors.bg} rounded-md p-3 space-y-2`}>
          <div className={`${colors.card} rounded p-2`}>
            <div className={`h-2 ${colors.accent} rounded mb-1`} />
            <div className={`h-1 ${colors.text} opacity-60 rounded`} />
          </div>
          <div className="flex gap-1">
            <div className={`h-1 w-4 ${colors.accent} rounded`} />
            <div className={`h-1 w-6 ${colors.text} opacity-40 rounded`} />
          </div>
        </div>
        <div className="mt-2 text-center">
          <p className="text-xs font-medium">{themeName}</p>
          {isActive && (
            <Badge variant="secondary" className="text-xs mt-1">
              Active
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
