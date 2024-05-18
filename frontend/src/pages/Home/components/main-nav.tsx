
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 ", className)}
      {...props}
    >
      <a
        href="#home"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </a>
      <a
        href="#services"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Services
      </a>
      <a
        href="#testmonails"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Testmonails
      </a>
      <a
        href="/user_order"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        My Orders
      </a>
    </nav>
  )
}