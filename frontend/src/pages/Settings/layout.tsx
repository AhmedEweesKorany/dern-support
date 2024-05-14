import { Separator } from "@/components/ui/separator"
import { ArrowLeftSquare } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { SidebarNav } from "./Components/side-bar-nav"


const sidebarNavItems = [
  {
    title: "Services",
    href: "/dashboard/settings",
  },
  {
    title: "category",
    href: "/dashboard/settings/category",
  },  {
    title: "users",
    href: "/dashboard/settings/users",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function DashboardSetting({ children }: SettingsLayoutProps) {
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate("/dashboard")
    }
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
   <ArrowLeftSquare onClick={handleClick} cursor={"pointer"}/>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your Entire System Settings.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}