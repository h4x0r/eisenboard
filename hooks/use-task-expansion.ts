"use client"

import { useCallback, useState } from "react"
import { createOpenRouterClient } from "../lib/openrouter"
import type { Task } from "../types/task"

export function useTaskExpansion() {
  const [isExpanding, setIsExpanding] = useState<string | null>(null)
  const [expandError, setExpandError] = useState<string | null>(null)

  const expandTask = useCallback(
    async (
      task: Task,
      addTask: (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => Task
    ): Promise<boolean> => {
      setIsExpanding(task.id)
      setExpandError(null)

      try {
        const client = createOpenRouterClient()

        if (!client) {
          throw new Error("OpenRouter API key not configured. Please add NEXT_PUBLIC_OPENROUTER_API_KEY or OPENROUTER_API_KEY to your environment variables.")
        }

        const subtasks = await client.generateSubtasks(task.title, task.description)

        if (subtasks.length === 0) {
          throw new Error("No subtasks could be generated for this task")
        }

        // Add each subtask with the same lane and status as the parent task
        subtasks.forEach((subtask) => {
          addTask({
            title: subtask.title,
            description: subtask.description,
            lane: task.lane,
            status: task.status
          })
        })

        return true
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to expand task"
        setExpandError(errorMessage)
        console.error("Task expansion error:", error)
        return false
      } finally {
        setIsExpanding(null)
      }
    },
    []
  )

  const clearError = useCallback(() => {
    setExpandError(null)
  }, [])

  return {
    expandTask,
    isExpanding,
    expandError,
    clearError
  }
}