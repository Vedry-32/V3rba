"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import { TaskList } from "@/components/task-list"
import { TaskDialog } from "@/components/task-dialog"

export default function TasksPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Úkoly</h1>
          <p className="text-muted-foreground">Spravujte své úkoly a sledujte svůj pokrok</p>
        </div>
        <Button className="w-full md:w-auto" onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Přidat úkol
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Všechny</TabsTrigger>
          <TabsTrigger value="today">Dnes</TabsTrigger>
          <TabsTrigger value="upcoming">Nadcházející</TabsTrigger>
          <TabsTrigger value="completed">Dokončené</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Všechny úkoly</CardTitle>
              <CardDescription>Zobrazení všech vašich úkolů</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Dnešní úkoly</CardTitle>
              <CardDescription>Úkoly naplánované na dnešek</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList filter="today" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Nadcházející úkoly</CardTitle>
              <CardDescription>Úkoly naplánované na příští dny</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList filter="upcoming" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Dokončené úkoly</CardTitle>
              <CardDescription>Úkoly, které jste již dokončili</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList filter="completed" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <TaskDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
