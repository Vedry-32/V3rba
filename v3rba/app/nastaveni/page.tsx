import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserSettings } from "@/components/user-settings"
import { AppSettings } from "@/components/app-settings"
import { NotificationSettings } from "@/components/notification-settings"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nastavení</h1>
        <p className="text-muted-foreground">Spravujte své preference a nastavení aplikace</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="app">Aplikace</TabsTrigger>
          <TabsTrigger value="notifications">Oznámení</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>Spravujte své osobní údaje a nastavení účtu</CardDescription>
            </CardHeader>
            <CardContent>
              <UserSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="app">
          <Card>
            <CardHeader>
              <CardTitle>Aplikace</CardTitle>
              <CardDescription>Upravte vzhled a chování aplikace</CardDescription>
            </CardHeader>
            <CardContent>
              <AppSettings />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Oznámení</CardTitle>
              <CardDescription>Nastavte si, jaká oznámení chcete dostávat</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
