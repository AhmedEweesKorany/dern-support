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
import { DeleteIcon } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import { CreateServiceDrawer } from "./Drawers/CreateServiceDrawer"
import { PersonIcon } from "@radix-ui/react-icons"
import { jwtDecode } from "jwt-decode"
import { Input } from "@/components/ui/input"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  

export default function Users() {
    const token = localStorage.getItem("token") || null

    const userData = token ? jwtDecode(token).user_info:null 

    
    const [users,setUsers] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:3010").then(data=>setUsers(data.data.data))
    },[])

    const handleDelete = (id,email)=>{
        if ( userData.email == email) localStorage.removeItem("token")
        axios.delete(`http://localhost:3010/deleteUser/${id}`).then(()=>{
            location.reload()
        })
    }

    function handleAdmin (id){
        axios.put(`http://localhost:3010/makeUserAdmin/${id}`).then(()=>{
            location.reload()
        }).catch(e=>console.log(e))
    }

    const [search,setSearch] = useState("")

    const filterdData = users.filter(user=>user.user_name.toLowerCase().includes(search.toLowerCase()))
  
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
            <TableCaption>A list of System Users</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>User Id</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>User Email</TableHead>
                    <TableHead>Account Type</TableHead>
                    <TableHead>isAdmin</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
{filterdData?.map((user,i)=>{
    return (<>
    
    <TableRow key={i}>
                    <TableCell >{i+1}</TableCell>
                    <TableCell>{user.user_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.account_type}</TableCell>
                    <TableCell>{user.isAdmin ? "Yes":"No"}</TableCell>
                    <TableCell>
                    <div className="flex flex-row gap-2">

        {user.isAdmin == 0 ? 
  <div aria-label="Make Admin">
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <Button onClick={()=>{
    handleAdmin(user.user_id)
  }}> <PersonIcon/>   </Button></TooltipTrigger>
    <TooltipContent>
      <p>Make Admin</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

    
    
  </div>:null}

  <Button onClick={()=>{
    handleDelete(user.user_id,user.email)
  }}><DeleteIcon cursor={"pointer"} /></Button>
</div>
                    </TableCell>
                </TableRow>
    </>)
})}

            </TableBody>

        </Table>

    </div>
    )
}
