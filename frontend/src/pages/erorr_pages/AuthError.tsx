
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const AuthError = () => {
const navigate = useNavigate() 
const handleBack = ()=>{
    navigate("/")
}
  return (
    <h1 className='text-3xl text-center my-[20%]'>401 || You Are Not Authorized To Access This Page<br/>
    <Button onClick={handleBack}> Back To Home Page</Button>
    </h1>
    
)
}

export default AuthError