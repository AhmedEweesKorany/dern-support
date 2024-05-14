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
  urls: [
    { value: "https://shadcn.com" },
    { value: "http://twitter.com/shadcn" },
  ],
}


export function ProfileForm() {
  const navigate = useNavigate()
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const [validate,setValidate] = useState({
    user_name:userData?.user_name ,email:userData?.email,bio:userData?.bio
  })


  function onSubmit(data: ProfileFormValues) {
    if(validate.bio == userData.bio && validate.email == userData.email && validate.user_name == userData.user_name){
      return toast.info("Nothing Changed!")
    }else{

      axios.put(`http://localhost:3010/updateuser/${userData.id}`,validate).then(()=>{
        axios.get(`http://localhost:3010/oneUser/${userData.id}`).then((data)=>{
          console.log(data.data.data.accessToken)
          console.log(data.data.data.response)
          localStorage.setItem("token",data.data.data.accessToken)
          toast.success("Updated Successfully")
        })
     
      }).catch(e=>{
        console.log(e)
        toast.error(e.response.data)
      })
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" defaultValue={userData?.user_name} onChange={(e) =>
               setValidate((cur)=>({
                ...cur,
                user_name: e.target.value
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
              <FormLabel>Email</FormLabel>
              <Input placeholder="example@c.com" defaultValue={userData?.email}  onChange={(e) =>
               setValidate((cur)=>({
                ...cur,
                email: e.target.value
               })) } />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  defaultValue={userData?.bio}
                  onChange={(e) =>
                    setValidate((cur)=>({
                     ...cur,
                     bio: e.target.value
                    })) }                />
              </FormControl>
        
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}