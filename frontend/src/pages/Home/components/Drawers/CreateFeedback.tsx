import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"


const token = localStorage.getItem("token") || null
const userData = token ? jwtDecode(token).user_info:null 


export function CreateFeeback({title}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button id="au">{title}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Your feedback</DialogTitle>
            <DialogDescription>
              insert your feedback below
            </DialogDescription>
          </DialogHeader>
          <FeedbackFrom />
        </DialogContent>
      </Dialog>
    )
  }


}

function FeedbackFrom({ className }: React.ComponentProps<"form">) {

  const [data,setData] = React.useState("")
  const navigate = useNavigate()
    console.log(!userData)
 const handleClick = ()=>{
    if(!userData)return navigate("/auth/login")
  if(data == "") return toast.error("Please Enter Valid Data!")
  axios.post("http://localhost:3010/createTestmonail",{feedback:data,user_name:userData.user_name,bio:userData.bio,user_id:userData.id}).then((data)=>{
    location.reload()
  }).catch(e=> toast.error(e))
}
  return (
    <form className={cn("grid items-start gap-4", className)} >
      <div className="grid gap-2 ">
        <Label htmlFor="text">Write Your Feedback</Label>
        <Input type="text" id="text"  onChange={(e)=>setData(e.target.value)} />
      </div>
     
      <Button  onClick={handleClick} type="button">Add Feedback</Button>
    </form>
  )
}
