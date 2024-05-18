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
import { DrawerDialogDemo } from "./Drawers/CreateCategory"
import { useEffect, useState } from "react"
import axios from "axios"
import { UpdateCategoryDrawer } from "./Drawers/UpdateCategory"
import { Input } from "@/components/ui/input"


export default function Category() {

    const [categories,setCategories] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3010/getAllCategories").then(data=>setCategories(data.data.data))
    },[])

    const handleDelete = (id)=>{
        axios.delete(`http://localhost:3010/deleteCategory/${id}`).then(()=>{
            location.reload()
        })
    }
    const [search,setSearch] = useState("")

    const filterdData = categories.filter(category=>category.category_name.toLowerCase().includes(search))
  
    return (
        <div >
         <div className=" float-right mb-6">
          <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={(e)=> setSearch(e.target.value)}
      />
          </div>     
             <Table >
            <TableCaption>A list of your Categories</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Category Id</TableHead>
                    <TableHead>Category Name</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
{filterdData?.map((item,i)=>{
    return (<>
    
    <TableRow key={item.i}>
                    <TableCell >{i+1}</TableCell>
                    <TableCell>{item.category_name}</TableCell>
                    <TableCell>
                    <div className="flex flex-row gap-2">
  <div><UpdateCategoryDrawer title={<Edit/>} data={item}/></div>
  <Button onClick={()=>{
    handleDelete(item.category_id)
  }}><DeleteIcon cursor={"pointer"} /></Button>
</div>
                    </TableCell>
                </TableRow>
    </>)
})}

            </TableBody>

        </Table>

        <DrawerDialogDemo title="Create New" />
    </div>
    )
}
