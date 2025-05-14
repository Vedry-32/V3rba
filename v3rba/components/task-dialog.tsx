"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cs } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { type Task, type Priority, type Category, useTaskContext } from "@/contexts/task-context"

const formSchema = z.object({
  title: z.string().min(1, { message: "Název úkolu je povinný" }),
  description: z.string().optional(),
  dueDate: z.date({ required_error: "Datum je povinné" }),
  priority: z.enum(["low", "medium", "high"] as const),
  category: z.enum(["Práce", "Osobní", "Zdraví", "Vzdělávání", "Jiné"] as const),
  isAllDay: z.boolean().default(false),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
}

export function TaskDialog({ open, onOpenChange, task }: TaskDialogProps) {
  const { addTask, updateTask } = useTaskContext()
  const isEditing = !!task

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "medium" as Priority,
      category: "Osobní" as Category,
      isAllDay: false,
      startTime: "09:00",
      endTime: "10:00",
    },
  })

  // Nastavení výchozích hodnot při editaci
  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        description: task.description || "",
        dueDate: new Date(task.dueDate),
        priority: task.priority,
        category: task.category,
        isAllDay: task.isAllDay || false,
        startTime: task.startTime || "09:00",
        endTime: task.endTime || "10:00",
      })
    } else {
      form.reset({
        title: "",
        description: "",
        dueDate: new Date(),
        priority: "medium",
        category: "Osobní",
        isAllDay: false,
        startTime: "09:00",
        endTime: "10:00",
      })
    }
  }, [task, form])

  const onSubmit = (values: FormValues) => {
    const formattedDate = format(values.dueDate, "yyyy-MM-dd")

    if (isEditing && task) {
      updateTask({
        ...task,
        title: values.title,
        description: values.description,
        dueDate: formattedDate,
        priority: values.priority,
        category: values.category,
        isAllDay: values.isAllDay,
        startTime: values.isAllDay ? undefined : values.startTime,
        endTime: values.isAllDay ? undefined : values.endTime,
      })
    } else {
      addTask({
        title: values.title,
        description: values.description,
        completed: false,
        dueDate: formattedDate,
        priority: values.priority,
        category: values.category,
        isAllDay: values.isAllDay,
        startTime: values.isAllDay ? undefined : values.startTime,
        endTime: values.isAllDay ? undefined : values.endTime,
      })
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Upravit úkol" : "Přidat nový úkol"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Upravte detaily úkolu a klikněte na Uložit změny."
              : "Vyplňte detaily nového úkolu a klikněte na Přidat úkol."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Název úkolu</FormLabel>
                  <FormControl>
                    <Input placeholder="Zadejte název úkolu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Popis</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Zadejte popis úkolu (volitelné)" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priorita</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Vyberte prioritu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Nízká</SelectItem>
                        <SelectItem value="medium">Střední</SelectItem>
                        <SelectItem value="high">Vysoká</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategorie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Vyberte kategorii" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Práce">Práce</SelectItem>
                        <SelectItem value="Osobní">Osobní</SelectItem>
                        <SelectItem value="Zdraví">Zdraví</SelectItem>
                        <SelectItem value="Vzdělávání">Vzdělávání</SelectItem>
                        <SelectItem value="Jiné">Jiné</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Datum</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                        >
                          {field.value ? format(field.value, "PPP", { locale: cs }) : <span>Vyberte datum</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAllDay"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Celodenní</FormLabel>
                    <FormDescription>Označte, pokud se jedná o celodenní úkol</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {!form.watch("isAllDay") && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Čas začátku</FormLabel>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input type="time" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Čas konce</FormLabel>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input type="time" {...field} />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <DialogFooter>
              <Button type="submit">{isEditing ? "Uložit změny" : "Přidat úkol"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
