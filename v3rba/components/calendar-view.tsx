"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, CheckSquare, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTaskContext } from "@/contexts/task-context"
import { TaskDialog } from "@/components/task-dialog"
import { format, isSameDay, parseISO } from "date-fns"
import { cs } from "date-fns/locale"

// Ukázkové události
const demoEvents = [
  {
    id: "1",
    title: "Týmová schůzka",
    date: new Date(2024, 4, 15),
    time: "10:00 - 11:30",
    location: "Konferenční místnost A",
    category: "Práce",
  },
  {
    id: "2",
    title: "Oběd s klientem",
    date: new Date(2024, 4, 15),
    time: "12:30 - 14:00",
    location: "Restaurace Central",
    category: "Práce",
  },
  {
    id: "3",
    title: "Lékařská prohlídka",
    date: new Date(2024, 4, 18),
    time: "09:00 - 10:00",
    location: "Poliklinika Centrum",
    category: "Zdraví",
  },
  {
    id: "4",
    title: "Narozeniny Petra",
    date: new Date(2024, 4, 20),
    time: "18:00 - 22:00",
    location: "Kavárna Louvre",
    category: "Osobní",
  },
]

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { tasks } = useTaskContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<any>(undefined)

  // Filtrování událostí pro vybraný den
  const selectedDateEvents = demoEvents.filter(
    (event) =>
      date &&
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear(),
  )

  // Filtrování úkolů pro vybraný den
  const selectedDateTasks = tasks.filter((task) => date && isSameDay(parseISO(task.dueDate), date))

  // Funkce pro zvýraznění dnů s událostmi nebo úkoly
  const isDayWithContent = (day: Date) => {
    return (
      demoEvents.some(
        (event) =>
          event.date.getDate() === day.getDate() &&
          event.date.getMonth() === day.getMonth() &&
          event.date.getFullYear() === day.getFullYear(),
      ) || tasks.some((task) => isSameDay(parseISO(task.dueDate), day))
    )
  }

  const handleEditTask = (task: any) => {
    setEditingTask(task)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="p-4 lg:w-1/2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-full"
          locale={cs}
          modifiers={{
            event: (date) => isDayWithContent(date),
          }}
          modifiersStyles={{
            event: {
              fontWeight: "bold",
              textDecoration: "underline",
            },
          }}
        />
      </div>
      <div className="p-4 lg:w-1/2 border-t lg:border-t-0 lg:border-l">
        <h2 className="text-xl font-semibold mb-4">
          {date ? format(date, "EEEE, d. MMMM yyyy", { locale: cs }) : "Vyberte datum"}
        </h2>

        {selectedDateEvents.length === 0 && selectedDateTasks.length === 0 ? (
          <p className="text-muted-foreground">Žádné události ani úkoly pro tento den</p>
        ) : (
          <div className="space-y-6">
            {selectedDateEvents.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">Události</h3>
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{event.title}</CardTitle>
                          <Badge>{event.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedDateTasks.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-3">Úkoly</h3>
                <div className="space-y-4">
                  {selectedDateTasks.map((task) => (
                    <Card key={task.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle
                            className={`text-base ${task.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {task.title}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditTask(task)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Badge>{task.category}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          {task.description && <p className="text-muted-foreground">{task.description}</p>}
                          <div className="flex items-center gap-4">
                            {!task.isAllDay && task.startTime && (
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>
                                  {task.startTime}
                                  {task.endTime ? ` - ${task.endTime}` : ""}
                                </span>
                              </div>
                            )}
                            {task.isAllDay && <Badge variant="outline">Celodenní</Badge>}
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <CheckSquare className={`h-4 w-4 ${task.completed ? "text-green-500" : ""}`} />
                              <span>{task.completed ? "Dokončeno" : "Nedokončeno"}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} task={editingTask} />
    </div>
  )
}
