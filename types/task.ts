export interface Task {
  id: string
  title: string
  description?: string
  lane: "urgent-important" | "important-not-urgent" | "urgent-not-important" | "neither"
  status: "todo" | "in-progress" | "done"
  createdAt: Date
  updatedAt: Date
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
