"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { BarChart3 } from "lucide-react"
import { quadrantConfig } from "../lib/quadrant-config"

interface TaskStatsProps {
  stats: {
    total: number
    "urgent-important": number
    "important-not-urgent": number
    "urgent-not-important": number
    neither: number
  }
}

export function TaskStats({ stats }: TaskStatsProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          <CardTitle className="text-lg">Task Overview</CardTitle>
          <Badge variant="secondary" className="ml-auto">
            {stats.total} total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quadrantConfig.map(({ key, label, icon: Icon, color, bgColor }) => (
            <div key={key} className={`flex items-center gap-3 p-3 rounded-lg ${bgColor} border border-border/50`}>
              <Icon className={`h-4 w-4 ${color}`} />
              <div>
                <div className="text-sm font-medium">{label}</div>
                <div className={`text-lg font-bold ${color}`}>{stats[key]}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
