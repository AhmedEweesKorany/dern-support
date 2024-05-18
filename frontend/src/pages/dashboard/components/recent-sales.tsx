import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import axios from "axios"
import { useEffect, useState } from "react"
  
  export function RecentSales() {
    const [recent,setRecent] = useState([])

    console.log(recent)
    useEffect(()=>{
      axios.get("http://localhost:3010/completedOrders").then(data=>setRecent(data.data.data)).catch(e=>console.log(e))
    },[])

    return (
      <div className="space-y-8">
       {recent?.map((item)=>{
        return(
          <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{item.user_email[0].toUpperCase() + item.user_email[1].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Service: {item.service_name}</p>
            <p className="text-sm text-muted-foreground">
              {item.user_email}
            </p>
          </div>
          <div className="ml-auto font-medium">+{item.price}$</div>
        </div>
        
        )
       })}
      </div>
    )
  }