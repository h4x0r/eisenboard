"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Plus, ChevronDown, ChevronRight } from "lucide-react"
import type { Task, Lane, StatusColumn } from "../types/task"
import { TaskCard } from "./task-card"
import { AddTaskDialog } from "./add-task-dialog"
import { useDragAndDrop } from "../hooks/use-drag-and-drop"
import { getQuadrantIcon } from "../lib/quadrant-config"

const lanes: Lane[] = [
  {
    id: "urgent-important",
    title: "Do First",
    description: "Urgent & Important",
    color: "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400",
  },
  {
    id: "important-not-urgent",
    title: "Schedule",
    description: "Important, Not Urgent",
    color: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
  },
  {
    id: "urgent-not-important",
    title: "Delegate",
    description: "Urgent, Not Important",
    color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  },
  {
    id: "neither",
    title: "Eliminate",
    description: "Neither Urgent nor Important",
    color: "bg-gray-500/10 border-gray-500/20 text-gray-700 dark:text-gray-400",
  },
]

const statusColumns: StatusColumn[] = [
  {
    id: "todo",
    title: "Todo",
    color: "bg-slate-500/10 border-slate-500/20",
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "bg-orange-500/10 border-orange-500/20",
  },
  {
    id: "done",
    title: "Done",
    color: "bg-green-500/10 border-green-500/20",
  },
]

const getLaneIcon = (laneId: string) => {
  const IconComponent = getQuadrantIcon(laneId)
  return IconComponent ? <IconComponent className="h-4 w-4" /> : null
}

interface KanbanBoardProps {
  tasks: Task[]
  onTaskMove: (taskId: string, newLane: Task["lane"], newStatus: Task["status"], targetTaskId?: string) => void
  onTaskAdd: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  onTaskDelete: (taskId: string) => void
  onTaskEdit: (taskId: string, updates: Partial<Task>) => void
  onTaskExpand?: (task: Task) => void
  expandingTaskId?: string | null
  onTaskBreakdown?: (task: Task) => void
  breakingDownTaskId?: string | null
}

export function KanbanBoard({ tasks, onTaskMove, onTaskAdd, onTaskDelete, onTaskEdit, onTaskExpand, expandingTaskId, onTaskBreakdown, breakingDownTaskId }: KanbanBoardProps) {
  const [addTaskLane, setAddTaskLane] = useState<Task["lane"] | null>(null)
  const [addTaskStatus, setAddTaskStatus] = useState<Task["status"]>("todo")
  const [showDoneColumns, setShowDoneColumns] = useState(true)
  const [collapsedLanes, setCollapsedLanes] = useState<Set<string>>(new Set())
  const [collapsedDoneColumns, setCollapsedDoneColumns] = useState<Set<string>>(new Set())

  const { draggedTask, dragOverTarget, handleDragStart, handleDragEnd, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop()

  // Recursively get tasks and their children with nesting levels
  const getTasksWithNesting = (
    parentId: string | null,
    laneId: Task["lane"],
    statusId: Task["status"],
    level: number = 0
  ): Array<{ task: Task; level: number }> => {
    const currentLevelTasks = tasks.filter((task) =>
      task.parentId === parentId &&
      task.lane === laneId &&
      task.status === statusId
    )

    const result: Array<{ task: Task; level: number }> = []

    currentLevelTasks.forEach((task) => {
      result.push({ task, level })

      if (task.isExpanded) {
        const children = getTasksWithNesting(task.id, laneId, statusId, level + 1)
        result.push(...children)
      }
    })

    return result
  }

  const getTasksForLaneAndStatus = (laneId: Task["lane"], statusId: Task["status"]) => {
    return getTasksWithNesting(null, laneId, statusId, 0)
  }

  const hasSubtasks = (taskId: string) => {
    return tasks.some((task) => task.parentId === taskId)
  }

  const toggleTaskExpanded = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      onTaskEdit(taskId, { isExpanded: !task.isExpanded })
    }
  }

  const toggleLaneCollapse = (laneId: string) => {
    const newCollapsed = new Set(collapsedLanes)
    if (newCollapsed.has(laneId)) {
      newCollapsed.delete(laneId)
    } else {
      newCollapsed.add(laneId)
    }
    setCollapsedLanes(newCollapsed)
  }

  const toggleDoneColumnCollapse = (laneId: string) => {
    const newCollapsed = new Set(collapsedDoneColumns)
    const key = `${laneId}-done`
    if (newCollapsed.has(key)) {
      newCollapsed.delete(key)
    } else {
      newCollapsed.add(key)
    }
    setCollapsedDoneColumns(newCollapsed)
  }

  return (
    <div className="h-full p-6">
      <div className="space-y-6">
        {lanes.map((lane) => {
          const laneTaskCounts = {
            todo: getTasksForLaneAndStatus(lane.id, "todo").length,
            "in-progress": getTasksForLaneAndStatus(lane.id, "in-progress").length,
            done: getTasksForLaneAndStatus(lane.id, "done").length,
          }

          const isCollapsed = collapsedLanes.has(lane.id)

          return (
            <Card key={lane.id} className={`${lane.color}`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLaneCollapse(lane.id)}
                      className="h-6 w-6 p-0 hover:bg-transparent"
                    >
                      {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                    {getLaneIcon(lane.id)}
                    <CardTitle className="text-lg">{lane.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {laneTaskCounts.todo + laneTaskCounts["in-progress"] + laneTaskCounts.done} total
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{lane.description}</p>
              </CardHeader>

              {!isCollapsed && (
                <CardContent>
                  <div
                    className={`grid gap-4 ${
                      collapsedDoneColumns.has(`${lane.id}-done`)
                        ? "grid-cols-[1fr_1fr_auto]"
                        : showDoneColumns
                          ? "grid-cols-3"
                          : "grid-cols-2"
                    }`}
                  >
                    {statusColumns
                      .filter((status) => showDoneColumns || status.id !== "done")
                      .map((status) => {
                        const columnTasks = getTasksForLaneAndStatus(lane.id, status.id)
                        const isDropTarget =
                          draggedTask && (draggedTask.lane !== lane.id || draggedTask.status !== status.id)
                        const isDragOver = dragOverTarget === `${lane.id}-${status.id}`

                        const isDoneColumn = status.id === "done"
                        const isDoneCollapsed = isDoneColumn && collapsedDoneColumns.has(`${lane.id}-done`)

                        return (
                          <div
                            key={status.id}
                            className={`${
                              isDoneCollapsed && isDoneColumn
                                ? "w-8 min-h-[200px] flex flex-col items-center justify-start"
                                : "min-h-[200px]"
                            } rounded-lg border-2 border-dashed p-3 transition-all duration-200 ${status.color} ${
                              isDropTarget && isDragOver
                                ? "border-primary bg-primary/5 scale-[1.02]"
                                : "border-muted-foreground/25"
                            }`}
                            onDragOver={(e) => handleDragOver(e, `${lane.id}-${status.id}`)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, lane.id, status.id, onTaskMove)}
                          >
                            {isDoneCollapsed && isDoneColumn ? (
                              <div className="flex flex-col items-center gap-2 h-full">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleDoneColumnCollapse(lane.id)}
                                  className="h-6 w-6 p-0 hover:bg-transparent"
                                >
                                  <span className="text-xs font-bold">{"<"}</span>
                                </Button>
                                <div className="writing-mode-vertical text-xs font-medium transform rotate-90 whitespace-nowrap">
                                  Done
                                </div>
                                <Badge
                                  variant="outline"
                                  className="text-xs w-6 h-6 p-0 flex items-center justify-center"
                                >
                                  {columnTasks.length}
                                </Badge>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-sm">{status.title}</h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">
                                      {columnTasks.length}
                                    </Badge>
                                    {isDoneColumn && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleDoneColumnCollapse(lane.id)}
                                        className="h-4 w-4 p-0 hover:bg-transparent"
                                      >
                                        <span className="text-xs font-bold">{">"}</span>
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                <div className="space-y-2 mb-3">
                                  {columnTasks.map(({ task, level }) => (
                                    <TaskCard
                                      key={task.id}
                                      task={task}
                                      onDragStart={() => handleDragStart(task)}
                                      onDragEnd={handleDragEnd}
                                      onDelete={() => onTaskDelete(task.id)}
                                      onEdit={(updates) => onTaskEdit(task.id, updates)}
                                      onExpand={onTaskExpand}
                                      isExpanding={expandingTaskId === task.id}
                                      onBreakdown={onTaskBreakdown}
                                      isBreakingDown={breakingDownTaskId === task.id}
                                      isDragging={draggedTask?.id === task.id}
                                      isSubtask={!!task.parentId}
                                      hasSubtasks={hasSubtasks(task.id)}
                                      onToggleExpand={() => toggleTaskExpanded(task.id)}
                                      onDrop={(droppedTaskId) => onTaskMove(droppedTaskId, task.lane, task.status, task.id)}
                                      nestingLevel={level}
                                    />
                                  ))}
                                </div>

                                {isDropTarget && isDragOver && (
                                  <div className="text-xs text-primary font-medium animate-pulse text-center py-2">
                                    Drop here to move task
                                  </div>
                                )}

                                {columnTasks.length === 0 && !isDragOver && (
                                  <div className="text-center text-muted-foreground text-xs py-4">No tasks</div>
                                )}

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full border border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors mt-2"
                                  onClick={() => {
                                    setAddTaskLane(lane.id)
                                    setAddTaskStatus(status.id)
                                  }}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              </>
                            )}
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              )}

              {isCollapsed && <div className="h-4"></div>}
            </Card>
          )
        })}
      </div>

      <AddTaskDialog
        open={addTaskLane !== null}
        onOpenChange={(open) => !open && setAddTaskLane(null)}
        lane={addTaskLane}
        status={addTaskStatus}
        onAdd={(task) => {
          onTaskAdd(task)
          setAddTaskLane(null)
        }}
      />
    </div>
  )
}
