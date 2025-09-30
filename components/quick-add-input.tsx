"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Plus, Loader2 } from "lucide-react"
import type { Task, Lane } from "../types/task"
import { categorizeTask } from "../lib/task-categorizer"
import { toast } from "sonner"

interface QuickAddInputProps {
  onAddTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
}

export function QuickAddInput({ onAddTask }: QuickAddInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isProcessing) return

    const taskTitle = inputValue.trim()
    setIsProcessing(true)

    console.log("[QuickAddInput] Processing new task:", taskTitle)

    try {
      // Use AI to categorize the task
      console.log("[QuickAddInput] Calling AI categorization...")
      const categorization = await categorizeTask(taskTitle)

      console.log("[QuickAddInput] AI categorization complete:", categorization)

      // Add the task with AI-determined category
      onAddTask({
        title: taskTitle,
        description: "",
        lane: categorization.lane,
        status: "todo",
      })

      // Show toast with the reasoning
      toast.success(`Task added to "${categorization.lane.replace("-", " & ")}" quadrant`, {
        description: categorization.reasoning,
        duration: 5000,
      })

      setInputValue("")
    } catch (error) {
      console.error("[QuickAddInput] Error during AI categorization:", error)

      // Fallback to default category
      console.log("[QuickAddInput] Using fallback category: important-not-urgent")
      onAddTask({
        title: taskTitle,
        description: "",
        lane: "important-not-urgent",
        status: "todo",
      })

      toast.error("Could not categorize automatically", {
        description: "Task added to 'Important & Not Urgent' as default",
        duration: 3000,
      })

      setInputValue("")
    } finally {
      setIsProcessing(false)
      console.log("[QuickAddInput] Task processing complete")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="Quick add task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1"
        disabled={isProcessing}
      />
      <Button type="submit" size="sm" disabled={!inputValue.trim() || isProcessing}>
        {isProcessing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </form>
  )
}
