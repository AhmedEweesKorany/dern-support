import { Separator } from "@/components/ui/separator"
import { ArrowLeftSquare } from "lucide-react"
import { useNavigate } from "react-router-dom"
import UserOrderTable from "./UserOrderTAble"


export default function User_Order() {
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate("/")
    }
  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
   <ArrowLeftSquare onClick={handleClick} cursor={"pointer"}/>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Your Orders</h2>
          <p className="text-muted-foreground">
            Manage your Your Orders.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
          </aside>
        </div>
        <UserOrderTable/>
      </div>
    </>
  )
}