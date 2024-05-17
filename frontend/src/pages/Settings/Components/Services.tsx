import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DeleteIcon, Edit } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { CreateServiceDrawer } from "./Drawers/CreateServiceDrawer"
import { UpdateServieDrawer } from "./Drawers/UpdateServiceDrawer"
import { Input } from "@/components/ui/input"


export default function Services() {

    const [services,setServices] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3010/getAllServices").then(data=>setServices(data.data.data))
    },[])

    const handleDelete = (id)=>{
        axios.delete(`http://localhost:3010/deleteService/${id}`).then(()=>{
            location.reload()
        })
    }

    const [search,setSearch] = useState("")

    const filterdData = services.filter(service=>service.service_name.toLowerCase().includes(search))
    return (
        <div  className="w-[880px]">
               <div className=" float-right mb-6">
          <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={(e)=> setSearch(e.target.value)}
      />
          </div>   
        <Table className="w-fit">
            <TableCaption>A list of your Services</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Service Id</TableHead>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Service Description</TableHead>
                    <TableHead>Category Type</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
{filterdData?.map((item,i)=>{
    return (<>
    
    <TableRow key={item.i}>
                    <TableCell >{i+1}</TableCell>
                    <TableCell>{item.service_name}</TableCell>
                    <TableCell>{item.service_description}</TableCell>
                    <TableCell>{item.category_name}</TableCell>
                    <TableCell>
                    <div className="flex flex-row gap-2">
  <div aria-label="Make Admin"><UpdateServieDrawer title={<Edit/>} data={item}/></div>
  <Button onClick={()=>{
    handleDelete(item.service_id)
  }}><DeleteIcon cursor={"pointer"} /></Button>
</div>
                    </TableCell>
                </TableRow>
    </>)
})}

            </TableBody>

        </Table>

        <CreateServiceDrawer title="Create New" />
    </div>
    )
}
