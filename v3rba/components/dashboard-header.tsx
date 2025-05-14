import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vítejte ve V3rba</h1>
        <p className="text-muted-foreground">
          Vaše osobní produktivní platforma pro správu úkolů, kalendáře, poznámek a e-mailů.
        </p>
      </div>
      <Button className="w-full md:w-auto">
        <PlusCircle className="mr-2 h-4 w-4" />
        Vytvořit nový
      </Button>
    </div>
  )
}
