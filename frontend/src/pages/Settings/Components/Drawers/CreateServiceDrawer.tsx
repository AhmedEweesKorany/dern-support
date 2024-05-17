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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
export function CreateServiceDrawer({title}) {
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
            <DialogTitle>Create New Service</DialogTitle>
            <DialogDescription>
              Addin New Service to Certain Category
            </DialogDescription>
          </DialogHeader>
          <CreateServiceForm />
        </DialogContent>
      </Dialog>
    )
  }


}

function CreateServiceForm({ className }: React.ComponentProps<"form">) {
    const [categories,setCategories] = React.useState([])
    React.useEffect(()=>{
        axios.get("http://localhost:3010/getAllCategories").then(data=>setCategories(data.data.data))
    },[])
  const [formData,setFormData] = React.useState({
    service_name:"",
    category_name:"",
    service_description:""
  })
 const handleClick = ()=>{
    
  if(formData.service_name == "" || formData.service_description == "" || formData.category_name == "") return toast.error("Please Enter Valid Data!")

  axios.post("http://localhost:3010/createService",formData).then((data)=>{
    
    location.reload()
  }).catch(e=> toast.error(e.response.data.message))
}
  return (
    <form className={cn("grid items-start gap-4", className)} >
      <div className="grid gap-2">
        <Label htmlFor="text">Service Name</Label>
        <Input type="text" id="text" placeholder="ex: Mobile applications" onChange={(e) =>
               setFormData((cur)=>({
                ...cur,
                service_name: e.target.value
               })) } />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="text">Service Description</Label>
        <Input type="text" id="text" placeholder="ex: lorem ipes,m mirb sodn sodm" onChange={(e) =>
               setFormData((cur)=>({
                ...cur,
                service_description: e.target.value
               })) } />
      </div>

     
      <div className="grid gap-2">
            <Label htmlFor="acc_type">Category Type</Label>
            <Select    onValueChange={    
        (e) =>{
            setFormData((prev) => ({
              ...prev,
              category_name: e // Update the status value
            }))}
          }>
                          <SelectTrigger  id="status" aria-label="Select status" >
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                           {categories?.map((item,i)=>{
                            return (<><SelectItem key={i} value={item.category_name}>{item.category_name}</SelectItem></>)
                           })}
                          </SelectContent>
                </Select>
          </div>
      <Button  onClick={handleClick} type="button">Create</Button>
    </form>
  )
}
