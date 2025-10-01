"use client"

import type { Task } from "../types/task"

export interface OverwhelmAlert {
  type: "task_overload" | "high_urgency_concentration" | "complexity_buildup" | "energy_mismatch" | "time_pressure"
  severity: "low" | "medium" | "high"
  title: string
  message: string
  suggestions: string[]
  affectedTasks?: string[] // Task IDs
}

export interface OverwhelmMetrics {
  totalTasks: number
  todoTasks: number
  inProgressTasks: number
  urgentImportantTasks: number
  highEnergyTasks: number
  totalEstimatedMinutes: number
  averageComplexity: number
  tasksWithoutEstimates: number
}

/**
 * Analyzes task patterns and detects potential overwhelm situations
 * Based on ADHD research and productivity patterns
 */
export class OverwhelmDetector {
  private static readonly THRESHOLDS = {
    // Maximum recommended active tasks for ADHD minds
    MAX_TODO_TASKS: 12,
    MAX_IN_PROGRESS: 3,

    // Time-based thresholds (in minutes)
    MAX_DAILY_COMMITMENT: 480, // 8 hours
    HIGH_TIME_PRESSURE: 240, // 4 hours of urgent tasks

    // Concentration and energy thresholds
    MAX_URGENT_IMPORTANT: 5,
    MAX_HIGH_ENERGY_RATIO: 0.7, // 70% of tasks requiring high energy

    // Complexity indicators
    MAX_HARD_TASKS: 4,
    HIGH_COMPLEXITY_RATIO: 0.6, // 60% medium/hard tasks
  }

  /**
   * Analyzes tasks and returns potential overwhelm alerts
   */
  static analyzeOverwhelm(tasks: Task[]): OverwhelmAlert[] {
    const metrics = this.calculateMetrics(tasks)
    const alerts: OverwhelmAlert[] = []

    // Task overload detection
    const taskOverloadAlert = this.detectTaskOverload(metrics, tasks)
    if (taskOverloadAlert) alerts.push(taskOverloadAlert)

    // High urgency concentration
    const urgencyAlert = this.detectHighUrgencyConcentration(metrics, tasks)
    if (urgencyAlert) alerts.push(urgencyAlert)

    // Complexity buildup
    const complexityAlert = this.detectComplexityBuildup(metrics, tasks)
    if (complexityAlert) alerts.push(complexityAlert)

    // Energy mismatch
    const energyAlert = this.detectEnergyMismatch(metrics, tasks)
    if (energyAlert) alerts.push(energyAlert)

    // Time pressure
    const timeAlert = this.detectTimePressure(metrics, tasks)
    if (timeAlert) alerts.push(timeAlert)

    return alerts
  }

  /**
   * Calculate key metrics from task list
   */
  private static calculateMetrics(tasks: Task[]): OverwhelmMetrics {
    const todoTasks = tasks.filter(t => t.status === "todo")
    const inProgressTasks = tasks.filter(t => t.status === "in-progress")
    const urgentImportantTasks = tasks.filter(t => t.lane === "urgent-important" && t.status !== "done")
    const highEnergyTasks = tasks.filter(t => t.energyLevel === "high" && t.status !== "done")
    const tasksWithEstimates = tasks.filter(t => t.estimatedMinutes && t.status !== "done")
    const hardTasks = tasks.filter(t => t.difficulty === "hard" && t.status !== "done")
    const mediumHardTasks = tasks.filter(t => (t.difficulty === "medium" || t.difficulty === "hard") && t.status !== "done")

    const totalEstimatedMinutes = tasksWithEstimates.reduce((sum, task) => sum + (task.estimatedMinutes || 0), 0)

    // Calculate average complexity (easy=1, medium=2, hard=3)
    const taskComplexities = tasks
      .filter(t => t.difficulty && t.status !== "done")
      .map(t => t.difficulty === "easy" ? 1 : t.difficulty === "medium" ? 2 : 3)
    const averageComplexity = taskComplexities.length > 0
      ? taskComplexities.reduce((sum, val) => sum + val, 0) / taskComplexities.length
      : 0

    return {
      totalTasks: tasks.filter(t => t.status !== "done").length,
      todoTasks: todoTasks.length,
      inProgressTasks: inProgressTasks.length,
      urgentImportantTasks: urgentImportantTasks.length,
      highEnergyTasks: highEnergyTasks.length,
      totalEstimatedMinutes,
      averageComplexity,
      tasksWithoutEstimates: tasks.filter(t => !t.estimatedMinutes && t.status !== "done").length
    }
  }

  /**
   * Detect task overload patterns
   */
  private static detectTaskOverload(metrics: OverwhelmMetrics, tasks: Task[]): OverwhelmAlert | null {
    if (metrics.todoTasks > this.THRESHOLDS.MAX_TODO_TASKS) {
      return {
        type: "task_overload",
        severity: metrics.todoTasks > this.THRESHOLDS.MAX_TODO_TASKS * 1.5 ? "high" : "medium",
        title: "Task Overload Detected",
        message: `You have ${metrics.todoTasks} pending tasks. ADHD research suggests keeping active tasks under ${this.THRESHOLDS.MAX_TODO_TASKS} for better focus.`,
        suggestions: [
          "Move some tasks to the 'Schedule' or 'Eliminate' quadrants",
          "Use AI breakdown to split large tasks into smaller ones",
          "Consider completing some quick wins first",
          "Archive or defer non-essential tasks"
        ]
      }
    }

    if (metrics.inProgressTasks > this.THRESHOLDS.MAX_IN_PROGRESS) {
      return {
        type: "task_overload",
        severity: "medium",
        title: "Too Many Active Tasks",
        message: `You have ${metrics.inProgressTasks} tasks in progress. ADHD minds work best with 1-3 active tasks to avoid context switching.`,
        suggestions: [
          "Complete one task before starting another",
          "Move some in-progress tasks back to 'Todo'",
          "Use timeboxing to focus on one task at a time"
        ]
      }
    }

    return null
  }

  /**
   * Detect high concentration of urgent tasks
   */
  private static detectHighUrgencyConcentration(metrics: OverwhelmMetrics, tasks: Task[]): OverwhelmAlert | null {
    if (metrics.urgentImportantTasks > this.THRESHOLDS.MAX_URGENT_IMPORTANT) {
      const urgentTasks = tasks.filter(t => t.lane === "urgent-important" && t.status !== "done")

      return {
        type: "high_urgency_concentration",
        severity: metrics.urgentImportantTasks > this.THRESHOLDS.MAX_URGENT_IMPORTANT * 1.5 ? "high" : "medium",
        title: "Crisis Mode Detected",
        message: `${metrics.urgentImportantTasks} urgent & important tasks may cause stress and decision paralysis.`,
        suggestions: [
          "Prioritize the top 3 most critical tasks",
          "Break down large urgent tasks into smaller steps",
          "Delegate or renegotiate deadlines where possible",
          "Focus on one urgent task at a time"
        ],
        affectedTasks: urgentTasks.map(t => t.id)
      }
    }

    return null
  }

  /**
   * Detect complexity buildup that may cause overwhelm
   */
  private static detectComplexityBuildup(metrics: OverwhelmMetrics, tasks: Task[]): OverwhelmAlert | null {
    const activeTasks = tasks.filter(t => t.status !== "done")
    const hardTasks = activeTasks.filter(t => t.difficulty === "hard")
    const complexityRatio = activeTasks.length > 0
      ? activeTasks.filter(t => t.difficulty === "medium" || t.difficulty === "hard").length / activeTasks.length
      : 0

    if (hardTasks.length > this.THRESHOLDS.MAX_HARD_TASKS || complexityRatio > this.THRESHOLDS.HIGH_COMPLEXITY_RATIO) {
      return {
        type: "complexity_buildup",
        severity: hardTasks.length > this.THRESHOLDS.MAX_HARD_TASKS * 1.5 ? "high" : "medium",
        title: "High Complexity Load",
        message: `${hardTasks.length} hard tasks and ${Math.round(complexityRatio * 100)}% complex tasks may cause cognitive overload.`,
        suggestions: [
          "Break down hard tasks into smaller, easier subtasks",
          "Alternate between hard and easy tasks",
          "Schedule complex tasks for your peak energy hours",
          "Consider asking for help or collaboration on difficult tasks"
        ],
        affectedTasks: hardTasks.map(t => t.id)
      }
    }

    return null
  }

  /**
   * Detect energy level mismatches with task demands
   */
  private static detectEnergyMismatch(metrics: OverwhelmMetrics, tasks: Task[]): OverwhelmAlert | null {
    const activeTasks = tasks.filter(t => t.status !== "done")
    const highEnergyRatio = activeTasks.length > 0
      ? metrics.highEnergyTasks / activeTasks.length
      : 0

    if (highEnergyRatio > this.THRESHOLDS.MAX_HIGH_ENERGY_RATIO) {
      return {
        type: "energy_mismatch",
        severity: "medium",
        title: "Energy Demand Mismatch",
        message: `${Math.round(highEnergyRatio * 100)}% of your tasks require high energy. This may lead to burnout.`,
        suggestions: [
          "Mix in some low-energy tasks for balance",
          "Schedule high-energy tasks for your peak hours",
          "Consider your natural energy cycles (morning vs. afternoon)",
          "Take breaks between demanding tasks"
        ]
      }
    }

    return null
  }

  /**
   * Detect time pressure situations
   */
  private static detectTimePressure(metrics: OverwhelmMetrics, tasks: Task[]): OverwhelmAlert | null {
    if (metrics.totalEstimatedMinutes > this.THRESHOLDS.MAX_DAILY_COMMITMENT) {
      return {
        type: "time_pressure",
        severity: metrics.totalEstimatedMinutes > this.THRESHOLDS.MAX_DAILY_COMMITMENT * 1.5 ? "high" : "medium",
        title: "Time Pressure Alert",
        message: `Estimated ${Math.round(metrics.totalEstimatedMinutes / 60)} hours of work may be overwhelming for one day.`,
        suggestions: [
          "Spread tasks across multiple days",
          "Identify which tasks can be moved to 'Schedule' quadrant",
          "Use AI breakdown to find quick wins",
          "Consider what can be delegated or eliminated"
        ]
      }
    }

    // Check for high concentration of urgent tasks by time
    const urgentTasks = tasks.filter(t => t.lane === "urgent-important" && t.status !== "done" && t.estimatedMinutes)
    const urgentTime = urgentTasks.reduce((sum, task) => sum + (task.estimatedMinutes || 0), 0)

    if (urgentTime > this.THRESHOLDS.HIGH_TIME_PRESSURE) {
      return {
        type: "time_pressure",
        severity: "high",
        title: "Urgent Time Crunch",
        message: `${Math.round(urgentTime / 60)} hours of urgent tasks require immediate attention.`,
        suggestions: [
          "Focus only on truly urgent tasks today",
          "Break down urgent tasks to find quickest wins",
          "Communicate with stakeholders about capacity",
          "Defer non-urgent work to reduce pressure"
        ],
        affectedTasks: urgentTasks.map(t => t.id)
      }
    }

    return null
  }
}