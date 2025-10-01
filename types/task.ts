export interface Task {
  id: string
  title: string
  description?: string
  lane: "urgent-important" | "important-not-urgent" | "urgent-not-important" | "neither"
  status: "todo" | "in-progress" | "done"
  createdAt: Date
  updatedAt: Date
  parentId?: string
  isExpanded?: boolean
  priority?: "high" | "medium" | "low"
  tags?: string[]
  // Enhanced task breakdown with time estimation
  estimatedMinutes?: number
  actualMinutes?: number
  startedAt?: Date
  completedAt?: Date
  difficulty?: "easy" | "medium" | "hard"
  energyLevel?: "low" | "medium" | "high"
}

export interface Lane {
  id: "urgent-important" | "important-not-urgent" | "urgent-not-important" | "neither"
  title: string
  description: string
  color: string
}

export interface StatusColumn {
  id: "todo" | "in-progress" | "done"
  title: string
  color: string
}
