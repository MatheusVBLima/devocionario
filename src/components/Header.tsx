"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { MenuIcon, XIcon } from "lucide-react"

import { Container } from "@/components/layout/Container"
import { Logo } from "@/components/layout/Logo"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { navLinks } from "@/lib/site"
import { cn } from "@/lib/utils"

function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
}

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      <div aria-hidden className="h-1.5 bg-liturgical transition-colors duration-500" />
      <div className="border-b bg-background/85 backdrop-blur-md">
        <Container className="flex items-center justify-between gap-5 py-4 lg:py-5">
          <Logo />

          <nav aria-label="Principal" className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative py-1 hover:text-liturgical-ink",
                    active &&
                      "text-liturgical-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-liturgical",
                  )}
                >
                  {link.name}
                </Link>
              )
            })}
            <ThemeSwitcher />
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeSwitcher />
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((value) => !value)}
              className="flex size-10 items-center justify-center rounded-full border hover:border-liturgical"
            >
              {open ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
            </button>
          </div>
        </Container>

        <nav
          id="menu-mobile"
          aria-label="Principal"
          hidden={!open}
          className="border-t lg:hidden"
        >
          <Container className="flex flex-col py-3">
            {navLinks.map((link, index) => {
              const active = isActivePath(pathname, link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-baseline gap-4 border-b py-3.5 last:border-b-0",
                    active ? "text-liturgical-ink" : "hover:text-liturgical-ink",
                  )}
                >
                  <span className="w-6 font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-3xl leading-none">{link.name}</span>
                </Link>
              )
            })}
          </Container>
        </nav>
      </div>
    </header>
  )
}
