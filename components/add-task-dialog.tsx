"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import type { Task } from "../types/task"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lane: Task["lane"] | null
  status: Task["status"]
  onAdd: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
}

const laneLabels = {
  "urgent-important": "Do First (Urgent & Important)",
  "important-not-urgent": "Schedule (Important, Not Urgent)",
  "urgent-not-important": "Delegate (Urgent, Not Important)",
  neither: "Eliminate (Neither Urgent nor Important)",
}

const statusLabels = {
  todo: "Todo",
  "in-progress": "In Progress",
  done: "Done",
}

export function AddTaskDialog({ open, onOpenChange, lane, status, onAdd }: AddTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !lane) return

    onAdd({
      title: title.trim(),
      description: description.trim() || undefined,
      lane,
      status,
    })

    setTitle("")
    setDescription("")
  }

  const handleClose = () => {
    setTitle("")
    setDescription("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>{lane && `Adding to: ${laneLabels[lane]} → ${statusLabels[status]}`}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title..."
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
