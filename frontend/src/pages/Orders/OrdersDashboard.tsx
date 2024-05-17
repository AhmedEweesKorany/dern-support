
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';


// Simulate a database read for tasks.
export default  function OrdersDashboard() {

  const [tasks,setTasks] = useState([])

  
  console.log(tasks)
  useEffect(()=>{
      axios.get("http://localhost:3010/getAllOrders").then(data=>setTasks(data.data.data))
  },[])

  const navigate = useNavigate()
  const token = localStorage.getItem("token") || null
  const userData = token ? jwtDecode(token).user_info:null 
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    navigate("/")
    }  
  return (
    <>

      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav userData = {userData?userData:null} handleLogout={handleLogout}/>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}