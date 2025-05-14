import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlusCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { EmailInbox } from "@/components/email-inbox"

export default function EmailPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">E-mail</h1>
          <p className="text-muted-foreground">Spravujte svou e-mailovou komunikaci</p>
        </div>
        <Button className="w-full md:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nový e-mail
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Hledat e-maily..." className="pl-8" />
      </div>

      <Card>
        <EmailInbox />
      </Card>
    </div>
  )
}
