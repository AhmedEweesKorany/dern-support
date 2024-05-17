"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components//ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const profileFormSchema = z.object({
  // username: z
  //   .string()
  //   .min(2, {
  //     message: "Username must be at least 2 characters.",
  //   })
  //   .max(30, {
  //     message: "Username must not be longer than 30 characters.",
  //   }),
  // email: z
  //   .string({
  //     required_error: "Please select an email to display.",
  //   })
  //   .email(),
  // bio: z.string().max(160).min(4),
  // urls: z
  //   .array(
  //     z.object({
  //       value: z.string().url({ message: "Please enter a valid URL." }),
  //     })
  //   )
  //   .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const token = localStorage.getItem("token") || null
const userData = token ? jwtDecode(token).user_info:null 
console.log(userData)
// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: userData?.bio,
}


export default function ChangePass() {
  const navigate = useNavigate()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const [validate,setValidate] = useState({
    cur_password:"" ,new_password:"",verify_new_password:""
  })


  function onSubmit(data: ProfileFormValues) {
    if (validate.cur_password == "" && validate.new_password == "" && validate.verify_new_password == "") return toast.info("Nothing Changed !")
    if (validate.cur_password == "" || validate.new_password == "" || validate.verify_new_password == "") return toast.error("Please Enter Valid Data !")
    if ( validate.cur_password.length < 8 || validate.new_password.length < 8 ) return toast.error("Password length should be at least 8 chars" )  
    if ( validate.new_password !== validate.verify_new_password ) return toast.error("New Password doesn't match !")  
    axios.post(`http://localhost:3010/user/login`,{
    email:userData.email,password:validate.cur_password
  }).then(()=>{
       
         axios.put(`http://localhost:3010/updateUser/${userData.id}`,{
          password:validate.new_password
         }).then(()=>{
          toast.success("Password Updated Successfully")
         }).catch(()=>toast.error("error happend ","info"))
     
      }).catch(e=>    toast.error("current password is invalid")  )
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input placeholder="Current Password" type="password"  onChange={(e) =>
               setValidate((cur)=>({
                ...cur,
                cur_password: e.target.value
               })) } />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <Input placeholder="New Password" type="password"  onChange={(e) =>
               setValidate((cur)=>({
                ...cur,
                new_password: e.target.value
               })) } />
              <FormMessage />
            </FormItem>
          )}
        />
       <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rewrite New Password</FormLabel>
              <Input placeholder="Rewrite New Password" type="password"  onChange={(e) =>
               setValidate((cur)=>({
                ...cur,
                verify_new_password: e.target.value
               })) } />
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Update Password</Button>
       
      </form>
    </Form>
  )
}