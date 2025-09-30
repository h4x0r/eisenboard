"use client"

import { useState } from "react"

import { KanbanBoard } from "../components/kanban-board"
import { TaskStats } from "../components/task-stats"
import { TaskActions } from "../components/task-actions"
import { ThemeSwitcher } from "../components/theme-switcher"
import { ThemeProvider } from "../components/theme-provider"
import { QuickAddInput } from "../components/quick-add-input"
import { useTasks } from "../hooks/use-tasks"
import { useTaskExpansion } from "../hooks/use-task-expansion"
import { breakdownTask } from "../lib/task-breakdown"
import { toast } from "sonner"
import type { Task } from "../types/task"
import { EisenboardIcon } from "../components/eisenboard-icon"
import { Button } from "../components/ui/button"
import { Database } from "lucide-react"

export default function HomePage() {
  const { tasks, isLoading, addTask, updateTask, deleteTask, moveTask, clearAllTasks, getTaskStats } = useTasks()
  const { expandTask, isExpanding, expandError, clearError } = useTaskExpansion()
  const [breakingDownTaskId, setBreakingDownTaskId] = useState<string | null>(null)

  console.log("[v0] NODE_ENV:", process.env.NODE_ENV)
  console.log("[v0] VERCEL_ENV:", process.env.NEXT_PUBLIC_VERCEL_ENV)
  console.log("[v0] isDev:", process.env.NODE_ENV === "development")
  console.log("[v0] isProd:", process.env.NODE_ENV === "production")

  const handleLoadSampleData = () => {
    const sampleTasks: Omit<Task, "id" | "createdAt" | "updatedAt">[] = [
      {
        title: "Fix critical production bug",
        description: "Database connection timeout affecting users",
        lane: "urgent-important",
        status: "in-progress",
        priority: "high",
        tags: ["bug", "production"],
      },
      {
        title: "Prepare quarterly presentation",
        description: "Board meeting next week",
        lane: "urgent-important",
        status: "todo",
        priority: "high",
        tags: ["presentation"],
      },
      {
        title: "Learn new framework",
        description: "Study Next.js 15 features",
        lane: "important-not-urgent",
        status: "todo",
        priority: "medium",
        tags: ["learning"],
      },
      {
        title: "Plan team building event",
        description: "Organize Q2 team outing",
        lane: "important-not-urgent",
        status: "todo",
        priority: "medium",
        tags: ["team"],
      },
      {
        title: "Review design mockups",
        description: "Quick feedback needed",
        lane: "important-not-urgent",
        status: "done",
        priority: "low",
        tags: ["design"],
      },
      {
        title: "Respond to Slack messages",
        description: "Multiple threads need replies",
        lane: "urgent-not-important",
        status: "in-progress",
        priority: "low",
        tags: ["communication"],
      },
      {
        title: "Schedule dentist appointment",
        description: "Overdue checkup",
        lane: "urgent-not-important",
        status: "todo",
        priority: "low",
        tags: ["personal"],
      },
      {
        title: "Organize desk cables",
        description: "Clean up workspace",
        lane: "neither",
        status: "todo",
        priority: "low",
        tags: ["organization"],
      },
      {
        title: "Browse social media",
        description: "Check latest updates",
        lane: "neither",
        status: "todo",
        priority: "low",
        tags: ["leisure"],
      },
    ]

    // Clear existing tasks and add sample data
    clearAllTasks()
    sampleTasks.forEach((task) => addTask(task))
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(tasks, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `eisenhower-tasks-${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (importedTasks: Task[]) => {
    const validTasks = importedTasks
      .filter((task) => task.id && task.title && (task.lane || (task as any).quadrant))
      .map((task) => ({
        ...task,
        // Handle migration from old quadrant format to new lane/status format
        lane: task.lane || (task as any).quadrant || "neither",
        status: task.status || "todo",
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }))

    if (validTasks.length > 0) {
      // Clear existing tasks and add imported ones
      clearAllTasks()
      validTasks.forEach((task) => addTask(task))
      alert(`Successfully imported ${validTasks.length} tasks`)
    } else {
      alert("No valid tasks found in the imported file")
    }
  }

  const handleTaskExpand = async (task: Task) => {
    const success = await expandTask(task, addTask)
    if (success) {
      // Optionally show a success message
      console.log(`Task "${task.title}" expanded successfully`)
    } else if (expandError) {
      // Show error to user
      alert(`Failed to expand task: ${expandError}`)
    }
  }

  const handleTaskBreakdown = async (task: Task) => {
    try {
      setBreakingDownTaskId(task.id)
      console.log(`[HomePage] Starting breakdown for task: ${task.title}`)

      const breakdown = await breakdownTask(task.title, task.description, task.lane)

      console.log(`[HomePage] Breakdown complete, creating ${breakdown.subtasks.length} subtasks`)

      // Create subtasks from the breakdown
      breakdown.subtasks.forEach((subtask) => {
        addTask({
          title: subtask.title,
          description: `${subtask.reasoning}`,
          lane: subtask.lane,
          status: "todo",
          priority: task.priority,
          tags: [...(task.tags || []), "subtask"],
          parentId: task.id
        })
      })

      // Mark the parent task as expanded
      updateTask(task.id, { isExpanded: true })

      // Show success message
      toast.success(`Created ${breakdown.subtasks.length} subtasks`, {
        description: breakdown.overall_approach,
        duration: 5000
      })

      console.log(`[HomePage] Successfully created subtasks for: ${task.title}`)
    } catch (error) {
      console.error(`[HomePage] Failed to breakdown task:`, error)
      toast.error("Failed to break down task", {
        description: error instanceof Error ? error.message : "An error occurred",
        duration: 3000
      })
    } finally {
      setBreakingDownTaskId(null)
    }
  }

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your tasks...</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <EisenboardIcon className="h-6 w-6" />
              <h1 className="text-xl font-semibold">EisenBoard</h1>
            </div>
            <div className="flex-1 max-w-md">
              <QuickAddInput onAddTask={addTask} />
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleLoadSampleData} variant="outline" size="sm" className="gap-2 bg-transparent">
                <Database className="h-4 w-4" />
                SAMPLE DATA
              </Button>
              <TaskActions
                taskCount={tasks.length}
                onClearAll={clearAllTasks}
                onExport={handleExport}
                onImport={handleImport}
              />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      <div className="h-screen pt-20 overflow-y-auto bg-background">
        <main className="container mx-auto px-6 pb-6">
          <TaskStats stats={getTaskStats()} />

          <KanbanBoard
            tasks={tasks}
            onTaskMove={moveTask}
            onTaskAdd={addTask}
            onTaskDelete={deleteTask}
            onTaskEdit={updateTask}
            onTaskExpand={handleTaskExpand}
            expandingTaskId={isExpanding}
            onTaskBreakdown={handleTaskBreakdown}
            breakingDownTaskId={breakingDownTaskId}
          />
        </main>
      </div>
    </ThemeProvider>
  )
}
