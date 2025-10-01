"use client"

import React from "react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { X, AlertTriangle, AlertCircle, Info, Lightbulb } from "lucide-react"
import type { OverwhelmAlert } from "../lib/overwhelm-detector"

interface OverwhelmAlertsProps {
  alerts: OverwhelmAlert[]
  onDismiss?: (alert: OverwhelmAlert) => void
  className?: string
}

export function OverwhelmAlerts({ alerts, onDismiss, className }: OverwhelmAlertsProps) {
  if (alerts.length === 0) return null

  const getSeverityIcon = (severity: OverwhelmAlert["severity"]) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />
      case "medium":
        return <AlertCircle className="h-4 w-4" />
      case "low":
        return <Info className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: OverwhelmAlert["severity"]) => {
    switch (severity) {
      case "high":
        return "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
      case "medium":
        return "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
      case "low":
        return "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200"
    }
  }

  const getTypeLabel = (type: OverwhelmAlert["type"]) => {
    switch (type) {
      case "task_overload":
        return "Task Overload"
      case "high_urgency_concentration":
        return "Crisis Mode"
      case "complexity_buildup":
        return "High Complexity"
      case "energy_mismatch":
        return "Energy Mismatch"
      case "time_pressure":
        return "Time Pressure"
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {alerts.map((alert, index) => (
        <Alert
          key={`${alert.type}-${index}`}
          className={`relative ${getSeverityColor(alert.severity)}`}
        >
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-2 flex-shrink-0">
              {getSeverityIcon(alert.severity)}
              <Badge
                variant="outline"
                className="text-xs border-current bg-transparent"
              >
                {getTypeLabel(alert.type)}
              </Badge>
            </div>

            <div className="flex-1 min-w-0">
              <AlertTitle className="text-sm font-semibold mb-1">
                {alert.title}
              </AlertTitle>
              <AlertDescription className="text-sm mb-3">
                {alert.message}
              </AlertDescription>

              {/* Suggestions */}
              {alert.suggestions && alert.suggestions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-xs font-medium">
                    <Lightbulb className="h-3 w-3" />
                    ADHD-Friendly Suggestions:
                  </div>
                  <ul className="text-xs space-y-1 pl-4">
                    {alert.suggestions.map((suggestion, suggestionIndex) => (
                      <li key={suggestionIndex} className="flex items-start gap-2">
                        <span className="text-current">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Affected tasks count */}
              {alert.affectedTasks && alert.affectedTasks.length > 0 && (
                <div className="mt-2 text-xs">
                  <Badge variant="secondary" className="bg-current/10 text-current border-current/20">
                    {alert.affectedTasks.length} task{alert.affectedTasks.length !== 1 ? 's' : ''} affected
                  </Badge>
                </div>
              )}
            </div>

            {/* Dismiss button */}
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(alert)}
                className="h-6 w-6 p-0 text-current hover:bg-current/10"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </Alert>
      ))}
    </div>
  )
}

/**
 * Quick action component for common overwhelm responses
 */
interface QuickActionsProps {
  alerts: OverwhelmAlert[]
  onQuickAction?: (action: string, alert: OverwhelmAlert) => void
}

export function OverwhelmQuickActions({ alerts, onQuickAction }: QuickActionsProps) {
  if (alerts.length === 0) return null

  const getQuickActions = (alert: OverwhelmAlert): Array<{ label: string; action: string }> => {
    switch (alert.type) {
      case "task_overload":
        return [
          { label: "Move to Schedule", action: "move_to_schedule" },
          { label: "Break Down Tasks", action: "breakdown_tasks" },
          { label: "Archive Non-Essential", action: "archive_tasks" }
        ]
      case "high_urgency_concentration":
        return [
          { label: "Prioritize Top 3", action: "prioritize_top_3" },
          { label: "Break Down Urgent", action: "breakdown_urgent" },
          { label: "Focus Mode", action: "focus_mode" }
        ]
      case "complexity_buildup":
        return [
          { label: "Break Down Hard Tasks", action: "breakdown_hard" },
          { label: "Mix Easy Tasks", action: "mix_easy_tasks" },
          { label: "Schedule Complex Work", action: "schedule_complex" }
        ]
      case "energy_mismatch":
        return [
          { label: "Add Low-Energy Tasks", action: "add_low_energy" },
          { label: "Reschedule High-Energy", action: "reschedule_high_energy" }
        ]
      case "time_pressure":
        return [
          { label: "Spread Across Days", action: "spread_tasks" },
          { label: "Find Quick Wins", action: "find_quick_wins" },
          { label: "Defer Non-Urgent", action: "defer_tasks" }
        ]
      default:
        return []
    }
  }

  // Get unique quick actions across all alerts
  const allActions = new Map<string, { label: string; action: string; alert: OverwhelmAlert }>()

  alerts.forEach(alert => {
    getQuickActions(alert).forEach(actionItem => {
      const key = `${alert.type}-${actionItem.action}`
      if (!allActions.has(key)) {
        allActions.set(key, { ...actionItem, alert })
      }
    })
  })

  if (allActions.size === 0) return null

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-muted-foreground">Quick Actions:</span>
      {Array.from(allActions.values()).map(({ label, action, alert }) => (
        <Button
          key={`${alert.type}-${action}`}
          variant="outline"
          size="sm"
          onClick={() => onQuickAction?.(action, alert)}
          className="h-7 text-xs"
        >
          {label}
        </Button>
      ))}
    </div>
  )
}