"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, CheckSquare, FileText, Home, Mail, Menu, Settings, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
  {
    title: "Domů",
    href: "/",
    icon: Home,
  },
  {
    title: "Úkoly",
    href: "/ukoly",
    icon: CheckSquare,
  },
  {
    title: "Kalendář",
    href: "/kalendar",
    icon: Calendar,
  },
  {
    title: "Poznámky",
    href: "/poznamky",
    icon: FileText,
  },
  {
    title: "E-mail",
    href: "/email",
    icon: Mail,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const isMobile = useMobile()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  // Resetovat rozšíření při změně cesty (pouze na desktopu)
  useEffect(() => {
    if (!isMobile) {
      setIsExpanded(false)
    }
  }, [pathname, isMobile])

  const sidebarClasses = cn("bg-background border-r h-screen transition-all duration-300 z-30", {
    "fixed w-64": isMobile && isOpen,
    "fixed w-0 -translate-x-full": isMobile && !isOpen,
    "w-[4.5rem] hover:w-64 group": !isMobile,
  })

  return (
    <>
      {isMobile && (
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40" onClick={toggleSidebar}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      )}
      <div
        className={sidebarClasses}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center mb-8 mt-2 h-10">
            <div className="flex items-center justify-center w-12">
              <h1
                className={cn(
                  "text-2xl font-bold transition-opacity duration-200",
                  !isMobile && !isExpanded ? "opacity-0 w-0 overflow-hidden" : "opacity-100",
                )}
              >
                V3rba
              </h1>
              <h1
                className={cn(
                  "text-2xl font-bold transition-opacity duration-200",
                  !isMobile && !isExpanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden absolute",
                )}
              >
                V
              </h1>
            </div>
          </div>
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => isMobile && setIsOpen(false)}>
                <span
                  className={cn(
                    "flex items-center rounded-md hover:bg-accent transition-colors",
                    pathname === item.href ? "bg-accent" : "",
                  )}
                >
                  <span className="flex items-center justify-center w-12 h-10">
                    <item.icon size={20} />
                  </span>
                  <span
                    className={cn(
                      "transition-all duration-200 whitespace-nowrap",
                      !isMobile && !isExpanded ? "opacity-0 w-0 overflow-hidden" : "opacity-100",
                    )}
                  >
                    {item.title}
                  </span>
                </span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Link href="/nastaveni">
              <span className="flex items-center rounded-md hover:bg-accent transition-colors">
                <span className="flex items-center justify-center w-12 h-10">
                  <Settings size={20} />
                </span>
                <span
                  className={cn(
                    "transition-all duration-200 whitespace-nowrap",
                    !isMobile && !isExpanded ? "opacity-0 w-0 overflow-hidden" : "opacity-100",
                  )}
                >
                  Nastavení
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
