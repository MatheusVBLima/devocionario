"use client"

import Image from "next/image"
import { MenuIcon } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AnimationContainer } from "@/components/utils/AnimationContainer"
import { Wrapper } from "@/components/utils/Wrapper"
import { cn } from "@/lib/utils"
import { navLinks } from "@/lib/site"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const [visible, setVisible] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100)
  })

  const logoSrc =
    mounted && (theme === "dark" || resolvedTheme === "dark")
      ? "/logo-white.svg"
      : "/logo.svg"

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <motion.div
        animate={{
          width: visible ? "86%" : "100%",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 40,
        }}
        style={{
          minWidth: "800px",
        }}
        className={cn(
          "relative z-50 mx-auto hidden w-full items-center justify-between rounded-full bg-transparent py-4 backdrop-blur lg:flex",
          visible &&
            "border border-t-foreground/20 border-x-foreground/15 border-b-foreground/10 bg-background/60 py-2",
        )}
      >
        <Wrapper className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-8 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Image src={logoSrc} alt="Devocionário" width={22} height={22} />
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-2xl font-bold !leading-tight text-transparent">
                Devocionário
              </span>
            </Link>
          </motion.div>

          <div className="flex min-w-0 items-center justify-center gap-x-1 text-sm font-medium text-muted-foreground">
            <AnimatePresence>
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                
                return (
                  <AnimationContainer
                    key={link.href}
                    animation="fadeDown"
                    delay={0.1 * index}
                  >
                    <div className="relative">
                      <Link
                        href={link.href}
                        className={cn(
                          "relative rounded-full px-4 py-2 whitespace-nowrap transition-colors duration-300 xl:px-5 hover:text-primary",
                          isActive ? "text-primary font-semibold" : ""
                        )}
                      >
                        {link.name}
                        {isActive && (
                          <motion.div
                            layoutId="activeTabIndicator"
                            className="absolute -bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    </div>
                  </AnimationContainer>
                )
              })}
            </AnimatePresence>
          </div>

          <AnimationContainer animation="fadeLeft" delay={0.1}>
            <div className="flex items-center gap-x-4">
              <ThemeSwitcher />
            </div>
          </AnimationContainer>
        </Wrapper>
      </motion.div>

      <div className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-sm lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logoSrc}
              alt="Devocionário"
              width={28}
              height={28}
              priority
              className="size-10"
            />
            <span className="text-lg font-bold text-primary">Devocionário</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                  
                  return (
                    <DropdownMenuItem 
                      key={link.href} 
                      asChild
                      className={isActive ? "bg-primary/10 text-primary font-medium" : ""}
                    >
                      <Link href={link.href} className="w-full cursor-pointer">
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
