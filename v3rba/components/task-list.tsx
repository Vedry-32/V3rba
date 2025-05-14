"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Edit, MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TaskDialog } from "@/components/task-dialog"
import { useTaskContext, type Task } from "@/contexts/task-context"
import { format, isToday, isFuture, parseISO } from "date-fns"

type TaskListProps = {
  filter?: "all" | "today" | "upcoming" | "completed"
}

export function TaskList({ filter = "all" }: TaskListProps) {
  const { tasks, toggleTaskCompletion, deleteTask } = useTaskContext()
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filtrování úkolů podle vybraného filtru
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed
    if (filter === "today") {
      return isToday(parseISO(task.dueDate)) && !task.completed
    }
    if (filter === "upcoming") {
      return isFuture(parseISO(task.dueDate)) && !task.completed && !isToday(parseISO(task.dueDate))
    }
    return true
  })

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsDialogOpen(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  if (filteredTasks.length === 0) {
    return <p className="text-center py-4 text-muted-foreground">Žádné úkoly k zobrazení</p>
  }

  return (
    <>
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center justify-between p-4 border rounded-lg ${task.completed ? "bg-muted/50" : ""}`}
          >
            <div className="flex items-center gap-3 flex-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                id={`task-${task.id}`}
              />
              <div className="flex flex-col">
                <label
                  htmlFor={`task-${task.id}`}
                  className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.title}
                </label>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{task.description}</p>
                )}
                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{format(parseISO(task.dueDate), "d. M. yyyy")}</span>
                  </div>
                  {!task.isAllDay && task.startTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {task.startTime}
                        {task.endTime ? ` - ${task.endTime}` : ""}
                      </span>
                    </div>
                  )}
                  <Badge variant="outline">{task.category}</Badge>
                  <div className="flex items-center gap-1">
                    <div className={`h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`} />
                    <span className="capitalize">
                      {task.priority === "low" ? "Nízká" : task.priority === "medium" ? "Střední" : "Vysoká"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEditTask(task)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Upravit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteTask(task.id)}>
                  <Trash className="h-4 w-4 mr-2" />
                  Smazat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
      <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} task={editingTask} />
    </>
  )
}
