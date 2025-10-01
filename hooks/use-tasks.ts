"use client"

import { useState, useCallback, useEffect } from "react"
import type { Task } from "../types/task"

const STORAGE_KEY = "eisenhower-tasks"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsedTasks = JSON.parse(stored).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          lane: task.lane || task.quadrant || "neither",
          status: task.status || "todo",
          parentId: task.parentId || null, // Ensure parentId is null for top-level tasks
          isExpanded: task.isExpanded || false,
          priority: task.priority || undefined,
          tags: task.tags || undefined,
        }))
        setTasks(parsedTasks)
      } else {
        // Initialize with empty array instead of sample tasks
        setTasks([])
      }
    } catch (error) {
      console.error("Failed to load tasks:", error)
      // Initialize with empty array instead of sample tasks on error
      setTasks([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save tasks to localStorage whenever tasks change
  const saveTasks = useCallback((newTasks: Task[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
    } catch (error) {
      console.error("Failed to save tasks:", error)
    }
  }, [])

  const addTask = useCallback(
    (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        parentId: taskData.parentId || null, // Ensure parentId is null for top-level tasks
      }

      setTasks((prev) => {
        const updated = [...prev, newTask]
        saveTasks(updated)
        return updated
      })

      return newTask
    },
    [saveTasks],
  )

  const updateTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      setTasks((prev) => {
        const updated = prev.map((task) => (task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task))
        saveTasks(updated)
        return updated
      })
    },
    [saveTasks],
  )

  const deleteTask = useCallback(
    (taskId: string) => {
      setTasks((prev) => {
        const updated = prev.filter((task) => task.id !== taskId)
        saveTasks(updated)
        return updated
      })
    },
    [saveTasks],
  )

  const moveTask = useCallback(
    (taskId: string, newLane: Task["lane"], newStatus: Task["status"]) => {
      setTasks((prev) => {
        const updated = prev.map((task) =>
          task.id === taskId ? { ...task, lane: newLane, status: newStatus, updatedAt: new Date() } : task,
        )
        saveTasks(updated)
        return updated
      })
    },
    [saveTasks],
  )

  const clearAllTasks = useCallback(() => {
    setTasks([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const setSampleTasks = useCallback((sampleTasksData: Omit<Task, "id" | "createdAt" | "updatedAt">[]) => {
    const sampleTasks: Task[] = sampleTasksData.map((taskData) => ({
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      parentId: taskData.parentId || null, // Ensure parentId is null for top-level tasks
    }))

    setTasks(sampleTasks)
    saveTasks(sampleTasks)
  }, [saveTasks])

  const getTasksByLane = useCallback(
    (lane: Task["lane"]) => {
      return tasks.filter((task) => task.lane === lane)
    },
    [tasks],
  )

  const getTasksByLaneAndStatus = useCallback(
    (lane: Task["lane"], status: Task["status"]) => {
      return tasks.filter((task) => task.lane === lane && task.status === status)
    },
    [tasks],
  )

  const getTaskStats = useCallback(() => {
    return {
      total: tasks.length,
      "urgent-important": tasks.filter((t) => t.lane === "urgent-important").length,
      "important-not-urgent": tasks.filter((t) => t.lane === "important-not-urgent").length,
      "urgent-not-important": tasks.filter((t) => t.lane === "urgent-not-important").length,
      neither: tasks.filter((t) => t.lane === "neither").length,
    }
  }, [tasks])

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    clearAllTasks,
    setSampleTasks,
    getTasksByLane,
    getTasksByLaneAndStatus,
    getTaskStats,
  }
}
