"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

// Ukázkové poznámky
const demoNotes = [
  {
    id: "1",
    title: "Nápady na projekt",
    content:
      "1. Implementovat nový design\n2. Přidat funkci exportu dat\n3. Optimalizovat výkon aplikace\n4. Vytvořit mobilní verzi",
    date: "14. 5. 2024",
    tags: ["Práce", "Nápady"],
  },
  {
    id: "2",
    title: "Nákupní seznam",
    content: "- Mléko\n- Chléb\n- Vejce\n- Ovoce\n- Zelenina",
    date: "13. 5. 2024",
    tags: ["Osobní"],
  },
  {
    id: "3",
    title: "Poznámky ze schůzky",
    content:
      "Hlavní body:\n- Představení nového projektu\n- Rozdělení úkolů\n- Termín dokončení: 30. 6. 2024\n- Další schůzka příští týden",
    date: "10. 5. 2024",
    tags: ["Práce", "Schůzka"],
  },
  {
    id: "4",
    title: "Knihy ke čtení",
    content: "1. Sapiens - Yuval Noah Harari\n2. Atomic Habits - James Clear\n3. Deep Work - Cal Newport",
    date: "5. 5. 2024",
    tags: ["Osobní", "Knihy"],
  },
]

export function NotesList() {
  const [notes, setNotes] = useState(demoNotes)

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId))
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Card key={note.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{note.title}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => deleteNote(note.id)}>
                    <Trash className="h-4 w-4 mr-2" />
                    Smazat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="whitespace-pre-line text-sm">{note.content}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-start pt-2 border-t">
            <div className="text-xs text-muted-foreground mb-2">{note.date}</div>
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
