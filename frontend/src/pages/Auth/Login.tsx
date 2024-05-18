import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export function Login() {
  const navigate = useNavigate()
  const [data,setData] = useState({
    email:"",
    password:""
  })
  const handleSubmit = ()=>{
    if(!data.email || !data.password){
      return toast.error("please fill fields first to login !")
    }
    axios.post("http://localhost:3010/user/login",data).then(data=>{
      console.log(data.data.data.accessToken)
      console.log(data.data.data.response)
      localStorage.setItem("token",data.data.data.accessToken)
      toast.success("Logged in Successfully!")
      navigate("/")
    }).catch(e=>    toast.error(e.response.data.message)  )

  }
  return (
<Card className="mx-auto my-[8%] max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) =>
                setData((cur)=>({
                 ...cur,
                 email: e.target.value
                })) }
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
      
            </div>
            <Input id="password" type="password" required     onChange={(e) =>
                setData((cur)=>({
                 ...cur,
                 password: e.target.value
                })) } />
          </div>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Login
          </Button>
      
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/auth/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
