
import { Button } from "@/components/ui/button"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { toast } from "react-toastify"

export function Register() {



  const [validate,setValidate] = useState({
    user_name:"" ,email:"",account_type:"Individual",password:""
  })

  const navigate = useNavigate()

  console.log(validate)

  // handle submit and make validation
  const handleSubmit = ()=>{
    if(validate.user_name.length < 3) return toast.error("short username")
    else if( ! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(validate.email)) return toast.error("invalid email")
  else if(validate.password.length < 8 ) return toast.error("Short Password")
else{
   axios.post("http://localhost:3010/createuser",validate).then(()=>{
    toast.success("Successfully Registeraation")
    navigate("/auth/login")
   }).catch((e)=>{
    toast.error(e.response.data.message)
   })
}
  }


  return (
    <Card className="mx-auto max-w-sm my-[2%]">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid  gap-4">
            <div className="grid gap-2">
              <Label htmlFor="user-name">User name</Label>
              <Input id="user-name" placeholder="Max Blanck" required  onChange={(e) =>
               setValidate((cur)=>({
                ...cur,
                user_name: e.target.value
               })) }/>
            </div>
    
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) =>
                setValidate((cur) => ({
                  ...cur,
                  email: e.target.value.toLowerCase() // Updated only first name
                }))
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="acc_type">Email Type</Label>
            <Select defaultValue="Individual"  onValueChange={    
        (e) =>{
          if(e!== "Individual" && e !== "Business") return toast.error("please select support email type")
            setValidate((prev) => ({
              ...prev,
              account_type: e // Update the status value
            }))}
          }>
                          <SelectTrigger id="status" aria-label="Select status" >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent >
                            <SelectItem   value="Individual">Individual</SelectItem>
                            <SelectItem   value="Business">Business</SelectItem>
                          </SelectContent>
                </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password"  onChange={(e) =>
                setValidate((cur) => ({
                  ...cur,
                  password: e.target.value // Updated only first name
                }))
              } />
          </div>
          <Button  className="w-full" onClick={handleSubmit}>
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
