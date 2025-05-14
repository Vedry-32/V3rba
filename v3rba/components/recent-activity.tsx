import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, CheckSquare, FileText, Mail } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "task",
    title: "Dokončit návrh projektu",
    time: "Před 10 minutami",
    icon: CheckSquare,
  },
  {
    id: 2,
    type: "email",
    title: "Nový e-mail od Jan Novák",
    time: "Před 25 minutami",
    icon: Mail,
  },
  {
    id: 3,
    type: "note",
    title: "Poznámka aktualizována: Nápady na projekt",
    time: "Před 1 hodinou",
    icon: FileText,
  },
  {
    id: 4,
    type: "calendar",
    title: "Schůzka: Týmový meeting",
    time: "Před 2 hodinami",
    icon: Calendar,
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nedávná aktivita</CardTitle>
        <CardDescription>Přehled vašich posledních aktivit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10">
                  <activity.icon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
