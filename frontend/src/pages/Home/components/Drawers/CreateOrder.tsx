import * as React from "react"
import Swal from 'sweetalert2'

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
const token = localStorage.getItem("token") || null
const userData = token ? jwtDecode(token).user_info:null 
export function CreateOrderDrawer({title,price,service_name}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    const handleClose = ()=>setOpen(false)
    return (
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild onClick={()=> setOpen(true)}>
          <Button id="au" >{title}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Your Order</DialogTitle>
            <DialogDescription>
              Fill fields below to compelet your operation
            </DialogDescription>
          </DialogHeader>
          <CreateOrderForm price={price} handleClose={handleClose} service_name={service_name}/>
        </DialogContent>
      </Dialog>
    )
  }


}

function CreateOrderForm({ className,price ,handleClose,service_name}) {

  const [data,setData] = React.useState({
    title:"",
    label:"Develop New",
    priority:"low",
    price:price,
  })

  console.log(data)
  const navigate = useNavigate()
 const handleClick = ()=>{
    if(!userData)return navigate("/auth/login")
  if(data.title == "" || !data.label || !data.price || !data.priority) return toast.error("Please Enter Valid Data!")
  axios.post("http://localhost:3010/createOrder",{title:data.title,label:data.label,priority:data.priority,price:data.price,user_email:userData.email,service_name}).then((data)=>{
    handleClose()
    toast.success("Requested Successfully !")
  }).catch(e=> console.log(e))  
}
  return (
    <form className={cn("grid items-start gap-4", className)} >
      <div className="grid gap-2 ">
        <Label htmlFor="text">Title Of Your Request</Label>
        <Input type="text" id="text"  onChange={(e)=>setData({
            ...data,
            title:e.target.value
        })} />
      </div>  <div className="grid gap-2 ">
      <Label htmlFor="acc_type">Specify Problem Type</Label>
            <Select defaultValue="Develop New"  onValueChange={    
        (e) =>{
            setData((prev) => ({
              ...prev,
              label: e // Update the status value
            }))}
          }>
                          <SelectTrigger id="status" aria-label="Select status" >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent >
                            <SelectItem   value="Develop New">Develop New</SelectItem>
                            <SelectItem   value="documentation">Documentation</SelectItem>
                            <SelectItem   value="feature">Feature</SelectItem>
                            <SelectItem   value="bug">Bug</SelectItem>
                          </SelectContent>
                </Select>
      </div>

      <div className="grid gap-2 ">
      <Label htmlFor="acc_type">Priority</Label>
            <Select defaultValue="low"  onValueChange={    
        (e) =>{
            setData((prev) => ({
              ...prev,
              priority: e, // Update the status value,
              price: e == "high" ? price + 1*price: e=="medium" ?price + 0.5 * price:price
            }))}
          }>
                          <SelectTrigger >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent >
                            <SelectItem   value="low">Low</SelectItem>
                            <SelectItem   value="medium">Medium</SelectItem>
                            <SelectItem   value="high">High</SelectItem>
                          </SelectContent>
                </Select>
      </div>

      <div className="grid gap-2 ">
      <Label htmlFor="acc_type">Priority</Label>
      <Input type="text" disabled value={`${data.price}$`}/>
      </div>
      <Button  onClick={handleClick} type="button">Request Order</Button>
    </form>
  )
}
