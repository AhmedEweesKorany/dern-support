import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { CreateOrderDrawer } from './Drawers/CreateOrder'
  
const Service_section = () => {

    const [services,setServices] = useState([])
    console.log(services)
    useEffect(()=>{
        axios.get("http://localhost:3010/getAllServices").then(data=>setServices(data.data.data))
    },[])


    function getRandom (arr: String[]){
        const i = Math.floor(Math.random()* arr.length)
        return arr[i]
    }
    const durations = ['300','500','700','900','800','1000']
    const animations = ["fade-up","fade-in","fade-down","fade-right","fade-up-right","fade-down-right","flip-left","flip-up","flip-down","zoom-in-up","zoom-in-down","zoom-in-left","zoom-in-right"]
  return (
    <div id='services' className=' px-10 py-10 border-t border-b overflow-hidden'>

        <div className='section-title' data-aos = "fade-up-right" data-aos-duration="700">
            <h2>Services </h2>
            <p>showing our services</p>
        </div>

<div  className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>

    {services?.map((service,i)=>{
        return (<Card className='text-center flex flex-col  justify-center items-between'  data-aos ={`${getRandom(animations)}`}  data-aos-duration={`${getRandom(durations)}`} key={i}> 
        <CardHeader>
          <CardTitle>{service.service_name}</CardTitle>
          <CardDescription>{service.service_description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p id='cancel_darwer'>Category: {service.category_name}</p>
        </CardContent>
        <CardFooter>
          <div className='mx-auto'>
          <CreateOrderDrawer title={`Request Service (${service.service_price}$)`} price={service.service_price} service_name = {service.service_name} />

          </div>
        </CardFooter>
      </Card>)
    })}

</div>

    </div>
  )
}

export default Service_section