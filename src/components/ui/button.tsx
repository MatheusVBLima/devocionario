import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-liturgical hover:text-white",
        accent: "bg-liturgical text-white hover:opacity-90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border border-border bg-transparent hover:border-liturgical",
        secondary: "bg-card text-card-foreground hover:bg-border",
        ghost: "hover:bg-card",
        link: "rounded-none border-b border-current px-0 pb-0.5 font-semibold hover:text-liturgical-ink",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-[52px] px-[26px] text-[15px] font-semibold",
        icon: "size-10",
      },
    },
    compoundVariants: [{ variant: "link", className: "h-auto" }],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
