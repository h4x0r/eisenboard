"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { MoreHorizontal, Edit2, Trash2, GripVertical, ChevronDown, ChevronRight, Loader2, GitBranch, CornerDownRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import type { Task } from "../types/task"
import { EditTaskDialog } from "./edit-task-dialog"

interface TaskCardProps {
  task: Task
  onDragStart: () => void
  onDragEnd: () => void
  onDelete: () => void
  onEdit: (updates: Partial<Task>) => void
  onExpand?: (task: Task) => void
  isExpanding?: boolean
  onBreakdown?: (task: Task) => void
  isBreakingDown?: boolean
  isDragging: boolean
  isSubtask?: boolean
  hasSubtasks?: boolean
  onToggleExpand?: () => void
  onDrop?: (droppedTaskId: string) => void
  nestingLevel?: number
}

export function TaskCard({ task, onDragStart, onDragEnd, onDelete, onEdit, onExpand, isExpanding, onBreakdown, isBreakingDown, isDragging, isSubtask, hasSubtasks, onToggleExpand, onDrop, nestingLevel = 0 }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", task.id)
    onDragStart()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onDrop) { // Allow dropping on any task
      e.dataTransfer.dropEffect = "move"
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const droppedTaskId = e.dataTransfer.getData("text/plain")
    if (droppedTaskId && droppedTaskId !== task.id && onDrop) {
      onDrop(droppedTaskId)
    }
    setIsDragOver(false)
  }

  const indentSize = nestingLevel * 24 // 24px per nesting level (6 * 4 in tailwind)

  return (
    <>
      <div className={`relative transition-all duration-200`} style={{ marginLeft: `${indentSize}px` }}>
        {nestingLevel > 0 && (
          <div className="absolute top-0 bottom-0 flex items-center" style={{ left: `-24px` }}>
            <CornerDownRight className="h-4 w-4 text-muted-foreground/50" />
          </div>
        )}
        <Card
          draggable
          onDragStart={handleDragStart}
          onDragEnd={onDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`cursor-move transition-all duration-200 hover:shadow-md group select-none ${
            isDragging ? "opacity-50 scale-105 shadow-xl ring-2 ring-primary/50" : "hover:scale-[1.02]"
          } ${nestingLevel > 0 ? `border-dashed` : ""} ${
            nestingLevel > 0 ? `opacity-${Math.max(95 - nestingLevel * 5, 85)}` : ""
          } ${
            isDragOver ? "ring-2 ring-primary bg-primary/5" : ""
          }`}
          style={{
            transformOrigin: "center",
          }}
        >
        <CardContent className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-1">
                {hasSubtasks && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleExpand?.()
                    }}
                    className="h-4 w-4 p-0 mt-0.5"
                  >
                    {task.isExpanded ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                  </Button>
                )}
                <h4 className="font-medium text-sm text-balance leading-tight mb-1 flex-1">{task.title}</h4>
              </div>
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
                <DropdownMenuTrigger className="h-6 w-6 p-0 rounded inline-flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <MoreHorizontal className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                    <Edit2 className="h-3 w-3 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  {onBreakdown && (
                    <DropdownMenuItem
                      onClick={() => onBreakdown(task)}
                      disabled={isBreakingDown}
                    >
                      {isBreakingDown ? (
                        <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                      ) : (
                        <GitBranch className="h-3 w-3 mr-2" />
                      )}
                      {isBreakingDown ? "Breaking down..." : "Break Down into Subtasks"}
                    </DropdownMenuItem>
                  )}
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
      </div>

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
