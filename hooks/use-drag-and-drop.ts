"use client"

import type React from "react"

import { useState, useCallback } from "react"
import type { Task } from "../types/task"

export function useDragAndDrop() {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)
  const [dragOverTarget, setDragOverTarget] = useState<string | null>(null)

  const handleDragStart = useCallback((task: Task) => {
    setDraggedTask(task)
    // Add visual feedback
    if (typeof window !== "undefined") {
      document.body.style.cursor = "grabbing"
    }
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null)
    setDragOverTarget(null)
    // Reset cursor
    if (typeof window !== "undefined") {
      document.body.style.cursor = ""
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, target: string) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    setDragOverTarget(target)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Only clear if we're leaving the target entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverTarget(null)
    }
  }, [])

  const handleDrop = useCallback(
    (
      e: React.DragEvent,
      lane: Task["lane"],
      status: Task["status"],
      onTaskMove: (taskId: string, newLane: Task["lane"], newStatus: Task["status"]) => void,
    ) => {
      e.preventDefault()

      if (draggedTask && (draggedTask.lane !== lane || draggedTask.status !== status)) {
        onTaskMove(draggedTask.id, lane, status)

        // Add success feedback
        if (typeof window !== "undefined") {
          const dropZone = e.currentTarget as HTMLElement
          dropZone.style.transform = "scale(1.02)"
          setTimeout(() => {
            dropZone.style.transform = ""
          }, 150)
        }
      }

      setDraggedTask(null)
      setDragOverTarget(null)

      if (typeof window !== "undefined") {
        document.body.style.cursor = ""
      }
    },
    [draggedTask],
  )

  return {
    draggedTask,
    dragOverTarget,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
