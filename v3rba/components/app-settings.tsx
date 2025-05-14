"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import { useTheme } from "next-themes"

type AppSettingsValues = {
  theme: "light" | "dark" | "system"
  compactMode: boolean
  autoSave: boolean
}

export function AppSettings() {
  const { setTheme, theme } = useTheme()

  const form = useForm<AppSettingsValues>({
    defaultValues: {
      theme: (theme as "light" | "dark" | "system") || "system",
      compactMode: false,
      autoSave: true,
    },
  })

  function onSubmit(data: AppSettingsValues) {
    setTheme(data.theme)
    // V reálné aplikaci by zde byl kód pro uložení dalších nastavení
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motiv</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="light" />
                    </FormControl>
                    <FormLabel className="font-normal">Světlý</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dark" />
                    </FormControl>
                    <FormLabel className="font-normal">Tmavý</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="system" />
                    </FormControl>
                    <FormLabel className="font-normal">Systémový</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Vyberte motiv aplikace podle vašich preferencí.</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="compactMode"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Kompaktní režim</FormLabel>
                <FormDescription>Zobrazí více obsahu na obrazovce s menšími mezerami.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="autoSave"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Automatické ukládání</FormLabel>
                <FormDescription>Automaticky ukládat změny v poznámkách a úkolech.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Uložit nastavení</Button>
      </form>
    </Form>
  )
}
