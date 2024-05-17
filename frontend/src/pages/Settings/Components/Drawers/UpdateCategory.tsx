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

export function UpdateCategoryDrawer({title,data}) {
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
            <DialogTitle>Update Catergory</DialogTitle>
            <DialogDescription>
              Update Existing Category
            </DialogDescription>
          </DialogHeader>
          <UpdateCategory data={data} />
        </DialogContent>
      </Dialog>
    )
  }


}

function UpdateCategory({ className,data }) {

  const [category_name,setName] = React.useState(data.category_name)
 const handleClick = ()=>{
    if(category_name == data.category_name) return toast.info("Nothing Changed!")
    
    if(category_name == "") return toast.error("Please Enter Valid Data!")
  axios.put(`http://localhost:3010/updateCategory/${data.category_id}`,{category_name}).then(()=>{
    location.reload()
  }).catch(e=> toast.error(e.response.data.message))
}
  return (
    <form className={cn("grid items-start gap-4", className)} >
      <div className="grid gap-2">
        <Label htmlFor="text">Category Name</Label>
        <Input type="text" id="text" defaultValue={category_name} placeholder="ex: Factory" onChange={(e)=>setName(e.target.value)} />
      </div>
     
      <Button onClick={handleClick} type="button">Update</Button>
    </form>
  )
}
