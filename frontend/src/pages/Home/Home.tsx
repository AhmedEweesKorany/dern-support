import { Button } from '@/components/ui/button'
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
import { MainNav } from './components/main-nav'
import { UserNav } from './components/user-nav'
import { ModeToggle } from '@/components/mode-toggle'
const Home = () => {
  const token = localStorage.getItem("token") || null
  const navigate = useNavigate()
  const userData = token ? jwtDecode(token).user_info:null 
  console.log(userData)
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    navigate("/")
    }  
  return (
<>
<div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle/>
              <UserNav userData = {userData?userData:null} handleLogout={handleLogout}/>
            </div>
          </div>
        </div>   
</>
  )
}

export default Home