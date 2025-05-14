"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Jméno musí mít alespoň 2 znaky.",
  }),
  email: z.string().email({
    message: "Neplatná e-mailová adresa.",
  }),
  bio: z.string().max(160).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  name: "Jan Novák",
  email: "jan.novak@example.com",
  bio: "Vývojář a nadšenec do produktivity.",
}

export function UserSettings() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    // V reálné aplikaci by zde byl kód pro uložení dat
    console.log(data)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage alt="Profilový obrázek" />
          <AvatarFallback className="text-lg">
            <User size={32} />
          </AvatarFallback>
        </Avatar>
        <div>
          <Button size="sm">Změnit obrázek</Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno</FormLabel>
                <FormControl>
                  <Input placeholder="Vaše jméno" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Váš e-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>O mně</FormLabel>
                <FormControl>
                  <Textarea placeholder="Napište něco o sobě" className="resize-none" {...field} />
                </FormControl>
                <FormDescription>Krátký popis, který se zobrazí na vašem profilu.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Uložit změny</Button>
        </form>
      </Form>
    </div>
  )
}
