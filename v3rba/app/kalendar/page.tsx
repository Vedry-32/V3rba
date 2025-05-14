"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { CalendarView } from "@/components/calendar-view"
import { TaskDialog } from "@/components/task-dialog"

export default function CalendarPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kalendář</h1>
          <p className="text-muted-foreground">Spravujte své události a schůzky</p>
        </div>
        <Button className="w-full md:w-auto" onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Přidat úkol
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <CalendarView />
        </CardContent>
      </Card>

      <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
