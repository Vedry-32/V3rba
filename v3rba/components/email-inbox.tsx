"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Archive, Star, Trash } from "lucide-react"

// Ukázkové e-maily
const demoEmails = [
  {
    id: "1",
    from: {
      name: "Jan Novák",
      email: "jan.novak@example.com",
      avatar: "",
    },
    subject: "Pozvánka na schůzku",
    preview: "Dobrý den, rád bych vás pozval na schůzku ohledně nového projektu...",
    date: "10:30",
    isRead: false,
    isStarred: true,
    folder: "inbox",
  },
  {
    id: "2",
    from: {
      name: "Marie Svobodová",
      email: "marie.svobodova@example.com",
      avatar: "",
    },
    subject: "Dokumenty k projektu",
    preview: "V příloze zasílám dokumenty, které jsme dnes probírali na schůzce...",
    date: "Včera",
    isRead: true,
    isStarred: false,
    folder: "inbox",
  },
  {
    id: "3",
    from: {
      name: "Petr Černý",
      email: "petr.cerny@example.com",
      avatar: "",
    },
    subject: "Faktura za služby",
    preview: "Dobrý den, v příloze zasílám fakturu za poskytnuté služby v minulém měsíci...",
    date: "12. 5.",
    isRead: true,
    isStarred: false,
    folder: "inbox",
  },
  {
    id: "4",
    from: {
      name: "Lucie Dvořáková",
      email: "lucie.dvorakova@example.com",
      avatar: "",
    },
    subject: "Potvrzení rezervace",
    preview: "Vaše rezervace na 20. 5. 2024 byla úspěšně potvrzena...",
    date: "10. 5.",
    isRead: false,
    isStarred: true,
    folder: "inbox",
  },
  {
    id: "5",
    from: {
      name: "Tomáš Horák",
      email: "tomas.horak@example.com",
      avatar: "",
    },
    subject: "Nabídka spolupráce",
    preview: "Dobrý den, rádi bychom vám nabídli spolupráci na novém projektu...",
    date: "5. 5.",
    isRead: true,
    isStarred: false,
    folder: "archived",
  },
]

export function EmailInbox() {
  const [emails, setEmails] = useState(demoEmails)
  const [activeTab, setActiveTab] = useState("inbox")

  const markAsRead = (emailId: string) => {
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, isRead: true } : email)))
  }

  const toggleStar = (emailId: string) => {
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, isStarred: !email.isStarred } : email)))
  }

  const archiveEmail = (emailId: string) => {
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, folder: "archived" } : email)))
  }

  const deleteEmail = (emailId: string) => {
    setEmails(emails.map((email) => (email.id === emailId ? { ...email, folder: "trash" } : email)))
  }

  const filteredEmails = emails.filter((email) => email.folder === activeTab)

  return (
    <Tabs defaultValue="inbox" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="inbox">Doručené</TabsTrigger>
        <TabsTrigger value="archived">Archivované</TabsTrigger>
        <TabsTrigger value="trash">Koš</TabsTrigger>
      </TabsList>
      <TabsContent value={activeTab}>
        {filteredEmails.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">Žádné e-maily k zobrazení</div>
        ) : (
          <div className="divide-y">
            {filteredEmails.map((email) => (
              <div
                key={email.id}
                className={`p-4 flex items-start gap-4 hover:bg-muted/50 cursor-pointer ${
                  !email.isRead ? "bg-muted/20" : ""
                }`}
                onClick={() => markAsRead(email.id)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={email.from.avatar || "/placeholder.svg"} alt={email.from.name} />
                  <AvatarFallback>
                    {email.from.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium truncate">{email.from.name}</div>
                    <div className="text-sm text-muted-foreground">{email.date}</div>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <div className={`truncate ${!email.isRead ? "font-semibold" : ""}`}>{email.subject}</div>
                    {!email.isRead && <Badge variant="outline">Nové</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">{email.preview}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStar(email.id)
                    }}
                  >
                    <Star className={`h-4 w-4 ${email.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      archiveEmail(email.id)
                    }}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteEmail(email.id)
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
