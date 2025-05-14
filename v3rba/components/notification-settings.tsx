"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"

type NotificationSettingsValues = {
  emailNotifications: boolean
  taskReminders: boolean
  eventReminders: boolean
  systemNotifications: boolean
}

export function NotificationSettings() {
  const form = useForm<NotificationSettingsValues>({
    defaultValues: {
      emailNotifications: true,
      taskReminders: true,
      eventReminders: true,
      systemNotifications: false,
    },
  })

  function onSubmit(data: NotificationSettingsValues) {
    // V reálné aplikaci by zde byl kód pro uložení nastavení
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="emailNotifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">E-mailová oznámení</FormLabel>
                  <FormDescription>Dostávat oznámení o nových e-mailech.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taskReminders"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Připomenutí úkolů</FormLabel>
                  <FormDescription>Dostávat připomenutí o nadcházejících úkolech.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventReminders"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Připomenutí událostí</FormLabel>
                  <FormDescription>Dostávat připomenutí o nadcházejících událostech v kalendáři.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="systemNotifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Systémová oznámení</FormLabel>
                  <FormDescription>Dostávat oznámení o aktualizacích a změnách v systému.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Uložit nastavení</Button>
      </form>
    </Form>
  )
}
