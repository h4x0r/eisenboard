"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { MoreHorizontal, Edit2, Trash2, GripVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import type { Task } from "../types/task"
import { EditTaskDialog } from "./edit-task-dialog"

interface TaskCardProps {
  task: Task
  onDragStart: () => void
  onDragEnd: () => void
  onDelete: () => void
  onEdit: (updates: Partial<Task>) => void
  isDragging: boolean
}

export function TaskCard({ task, onDragStart, onDragEnd, onDelete, onEdit, isDragging }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", task.id)
    onDragStart()
  }

  return (
    <>
      <Card
        draggable
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        className={`cursor-move transition-all duration-200 hover:shadow-md group select-none ${
          isDragging ? "opacity-50 rotate-2 scale-105 shadow-xl ring-2 ring-primary/50" : "hover:scale-[1.02]"
        }`}
        style={{
          transformOrigin: "center",
        }}
      >
        <CardContent className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm text-balance leading-tight mb-1">{task.title}</h4>
              {task.description && (
                <p className="text-xs text-muted-foreground text-pretty line-clamp-2">{task.description}</p>
              )}
            </div>

            <div
              className={`flex items-center gap-1 transition-opacity ${
                isDragging ? "opacity-0" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <GripVertical className="h-3 w-3 text-muted-foreground cursor-grab active:cursor-grabbing" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                    <Edit2 className="h-3 w-3 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                    <Trash2 className="h-3 w-3 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <Badge variant="outline" className="text-xs">
              {new Date(task.createdAt).toISOString().split("T")[0]}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <EditTaskDialog
        task={task}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={(updates) => {
          onEdit(updates)
          setIsEditOpen(false)
        }}
      />
    </>
  )
}
