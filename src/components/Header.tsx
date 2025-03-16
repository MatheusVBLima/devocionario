"use client"

import { cn } from "@/lib/utils"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { RefObject, useRef, useState, useEffect } from "react"
import { AnimationContainer } from "@/components/utils/AnimationContainer"
import { Wrapper } from "@/components/utils/Wrapper"
import { ThemeSwitcher } from './ThemeSwitcher'
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Hook para detectar clique fora do elemento
export const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useRef<() => void>(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return ref;
};

export const NAV_LINKS = [
  {
    name: "Santo Rosário",
    link: "/rosario",
  },
  {
    name: "Liturgia",
    link: "/liturgia",
  },
  {
    name: "Orações",
    link: "/oracoes",
  },
  {
    name: "Rotina Católica",
    link: "/rotina",
  },
  {
    name: "Blog",
    link: "/blog",
  },
]

export default function Header() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState<boolean>(false)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Efeito para evitar problemas de hidratação
  useEffect(() => {
    setMounted(true)
  }, [])

  const mobileMenuRef = useClickOutside(() => {
    if (open) setOpen(false)
  })

  const { scrollY } = useScroll({
    target: ref as RefObject<HTMLDivElement>,
    offset: ["start start", "end start"],
  })

  useMotionValueEvent(scrollY, "change", latest => {
    if (latest > 100) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  })

  // Determinar qual logo usar baseado no tema
  const logoSrc = mounted && (theme === 'dark' || resolvedTheme === 'dark') 
    ? "/logo-white.svg" 
    : "/logo.svg";

  return (
    <header className="container fixed w-full top-0 inset-x-0 z-50">
      {/* Desktop */}
      <motion.div
        animate={{
          width: visible ? "60%" : "100%",
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
          "hidden lg:flex bg-transparent self-start items-center justify-between py-4 rounded-full relative z-[50] mx-auto w-full backdrop-blur",
          visible &&
            "bg-background/60 py-2 border border-t-foreground/20 border-b-foreground/10 border-x-foreground/15 w-full"
        )}
      >
        <Wrapper className="flex items-center justify-between lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Image src={logoSrc} alt="Devocionário" width={22} height={22} />
              <span className="text-2xl font-bold !leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
                Devocionário
              </span>
            </Link>
          </motion.div>

          <div className="hidden lg:flex flex-row flex-1 absolute inset-0 items-center justify-center w-max mx-auto gap-x-2 text-sm text-muted-foreground font-medium">
            <AnimatePresence>
              {NAV_LINKS.map((link, index) => (
                <AnimationContainer
                  key={index}
                  animation="fadeDown"
                  delay={0.1 * index}
                >
                  <div className="relative">
                    <Link
                      href={link.link}
                      className="hover:text-primary transition-all duration-500 hover:bg-accent rounded-md px-4 py-2"
                    >
                      {link.name}
                    </Link>
                  </div>
                </AnimationContainer>
              ))}
            </AnimatePresence>
          </div>

          <AnimationContainer animation="fadeLeft" delay={0.1}>
            <div className="flex items-center gap-x-4">
              <ThemeSwitcher />
            </div>
          </AnimationContainer>
        </Wrapper>
      </motion.div>

      {/* Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-b border-border py-3 px-4 z-50">
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
            <span className="text-lg font-bold text-primary">
              Devocionário
            </span>
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
                {NAV_LINKS.map((link, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={link.link} className="w-full cursor-pointer">
                      {link.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
               
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}