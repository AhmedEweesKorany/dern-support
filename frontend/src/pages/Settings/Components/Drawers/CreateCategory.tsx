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

export function DrawerDialogDemo({title}) {
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
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Addin new category to your stock
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }


}

function ProfileForm({ className }: React.ComponentProps<"form">) {

  const [category_name,setName] = React.useState("")
 const handleClick = ()=>{
  axios.post("http://localhost:3010/createCategory",{category_name}).then((data)=>{
    console.log(data)
    toast.success("Category Created !")
    document.getElementById("au")?.click()
    location.reload()
  }).catch(e=> toast.error(e.response.data.message))
}
  return (
    <form className={cn("grid items-start gap-4", className)} >
      <div className="grid gap-2">
        <Label htmlFor="text">Category Name</Label>
        <Input type="text" id="text" placeholder="ex: Factory" onChange={(e)=>setName(e.target.value)} />
      </div>
     
      <Button  onClick={handleClick} type="button">Create</Button>
    </form>
  )
}
