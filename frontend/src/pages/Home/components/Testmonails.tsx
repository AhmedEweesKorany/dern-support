import  React, { useEffect, useState } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import axios from "axios"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CreateFeeback } from "./Drawers/CreateFeedback"

export default function Testmonails() {
    const [services,setServices] = useState([])
    console.log(services)
    useEffect(()=>{
        axios.get("http://localhost:3010/getAllTestmonail").then(data=>setServices(data.data.data))
    },[])

    function getRandom (arr: String[]){
        const i = Math.floor(Math.random()* arr.length)
        return arr[i]
    }
    const durations = ['300','500','700','900','800','1000']
    const animations = ["fade-up","fade-in","fade-down","fade-right","fade-up-right","fade-down-right","flip-left","flip-up","flip-down","zoom-in-up","zoom-in-down","zoom-in-left","zoom-in-right"]

  return (
  <div className="py-20 px-10" id="testmonails">
<div className="section-title mb-20" data-aos={`${getRandom(animations)}` } data-aos-duration={`${getRandom(durations)}`} >
    <h2>Testmonails</h2>
    <p>What People Say About Our Services</p>
</div>
<Carousel className="w-[1000px] max-w-xs mx-auto " data-aos={`${getRandom(animations)}` } data-aos-duration={`${getRandom(durations)}`} >
      <CarouselContent  >
        {services?.map((item, index) => (
          <CarouselItem key={index} >
            <div className="">
              <Card className="border">
                <CardHeader className="">
               <div className="flex gap-2 items-center">
               <Avatar className="h-8 w-8">
            <AvatarFallback>{item?.user_name[0].toUpperCase()+item?.user_name[1].toUpperCase()}</AvatarFallback>
            </Avatar>
                <h1>{item.user_name}</h1>
               </div>
               <p className=" text-slate-600 mx-4" >{item.bio}</p>
                </CardHeader>
                <CardContent className="flex aspect-video items-center justify-center ">
                  <span className="text-4xl font-semibold">{item.feedback}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <div className=" text-center my-6">
        <CreateFeeback title={"Write Your Own FeedBack !"} />
    </div>
  </div>
  )
}
