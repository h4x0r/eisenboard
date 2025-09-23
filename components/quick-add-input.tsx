"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import type { Task, Lane } from "../types/task"

interface QuickAddInputProps {
  onAddTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
}

export function QuickAddInput({ onAddTask }: QuickAddInputProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Default to "Important & Not Urgent" lane and "todo" status for quick adds
    onAddTask({
      title: inputValue.trim(),
      description: "",
      lane: "important-not-urgent" as Lane,
      status: "todo",
      priority: "medium",
    })

    setInputValue("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <Input
        type="text"
        placeholder="Quick add task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" size="sm" disabled={!inputValue.trim()}>
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  )
}
