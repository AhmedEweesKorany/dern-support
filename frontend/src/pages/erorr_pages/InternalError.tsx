
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const InternalError = () => {
const navigate = useNavigate() 
const handleBack = ()=>{
    navigate("/")
}
  return (
    <h1 className='text-3xl text-center my-[20%]'>500  ||Internal Server Error<br/>
    <Button onClick={handleBack}> Back To Home Page</Button>
    </h1>
    
)
}

export default InternalError