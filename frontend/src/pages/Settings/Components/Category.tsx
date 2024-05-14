import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DeleteIcon, Edit } from "lucide-react"
import { DrawerDialogDemo } from "./Drawers/CreateCategory"
import { useEffect, useState } from "react"
import axios from "axios"


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
    return (
        <div >
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
{categories?.map((item,i)=>{
    return (<>
    
    <TableRow key={item.i}>
                    <TableCell >{i+1}</TableCell>
                    <TableCell>{item.category_name}</TableCell>
                    <TableCell>
                    <div className="flex flex-row gap-2">
  <div><Edit  cursor={"pointer"} /></div>
  <div><DeleteIcon cursor={"pointer"} onClick={()=>{
    handleDelete(item.category_id)
  }}/></div>
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
