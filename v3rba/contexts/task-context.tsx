"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Priority = "low" | "medium" | "high"
export type Category = "Práce" | "Osobní" | "Zdraví" | "Vzdělávání" | "Jiné"

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  dueDate: string
  priority: Priority
  category: Category
  isAllDay?: boolean
  startTime?: string
  endTime?: string
}

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, "id">) => void
  updateTask: (task: Task) => void
  deleteTask: (taskId: string) => void
  toggleTaskCompletion: (taskId: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

// Ukázkové úkoly
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Dokončit návrh projektu",
    description: "Finalizovat všechny wireframy a připravit prezentaci pro klienta",
    completed: false,
    dueDate: "2024-05-15",
    priority: "high",
    category: "Práce",
    isAllDay: false,
    startTime: "09:00",
    endTime: "12:00",
  },
  {
    id: "2",
    title: "Nakoupit potraviny",
    description: "Mléko, chléb, vejce, ovoce, zelenina",
    completed: false,
    dueDate: "2024-05-14",
    priority: "medium",
    category: "Osobní",
    isAllDay: true,
  },
  {
    id: "3",
    title: "Zavolat doktorovi",
    description: "Objednat se na preventivní prohlídku",
    completed: true,
    dueDate: "2024-05-13",
    priority: "high",
    category: "Zdraví",
    isAllDay: false,
    startTime: "14:00",
    endTime: "14:30",
  },
  {
    id: "4",
    title: "Připravit prezentaci",
    description: "Připravit prezentaci pro týmový meeting",
    completed: false,
    dueDate: "2024-05-20",
    priority: "medium",
    category: "Práce",
    isAllDay: false,
    startTime: "13:00",
    endTime: "15:00",
  },
]

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const addTask = (task: Omit<Task, "id">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}
