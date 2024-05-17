import { jwtDecode } from 'jwt-decode'
import {  useNavigate } from 'react-router-dom'
import { MainNav } from './components/main-nav'
import { UserNav } from './components/user-nav'
import { ModeToggle } from '@/components/mode-toggle'
import Landing from './components/Landing'
import Service_section from './components/Service_section'
import Testmonails from './components/Testmonails'
import { AccordionDemo } from './components/FAQs'

const Home = () => {
  const token = localStorage.getItem("token") || null
  const userData = token ? jwtDecode(token).user_info:null 
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    navigate("/")
    }  
  const navigate = useNavigate()
  console.log(userData)
  return (
<>
<div className="border-b" data-aos="fade" data-aos-duration="500">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ModeToggle/>
              <UserNav userData = {userData?userData:null} handleLogout={handleLogout}/>
            </div>
          </div>
        </div>   
          <Landing/>
          <Service_section/>
          <Testmonails/>
</>
  )
}

export default Home