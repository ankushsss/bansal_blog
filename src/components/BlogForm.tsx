"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Button } from "@mui/material"
import AlertsSnackbar from "./AlertsSnackbar"
export default function BlogForm() {
    const [blog,setBlog]= useState<any>({
        title:"",
        content:"",
        token:""

    })
    const [alrtMssg, setAllrtMassg] = useState({
        type:"success",
        open:false,
        mssg:""
    })
    const router = useRouter()
    useEffect(()=>{
    setBlog({...blog,token:localStorage.getItem("token")})
    
    },[])

    useEffect(()=>{
        if(!localStorage.getItem("token"))
        {
            
            router.push("/login")
        
        }
      },[])
    const addBlog = ()=>{
        try{
           axios.post("/api/blog",blog).then((userData:any)=>{
            setAllrtMassg({
                open:true,
                mssg:"Blog Add success",
                type:"success"
            })
            setTimeout(()=>{
                router.push("/")
            // window.location.reload()
                
              
            },1000)
            // router.push("/")
           }).catch(Err=>{
            setAllrtMassg({
                open:true,
                mssg:"Wrong Password",
                type:"error"
            })
           })
        }
        catch(err)
        {
            setAllrtMassg({
                open:true,
                mssg:"Wrong Password",
                type:"error"
            })
        }
    }
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
       
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Add Your Blog 
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <form className="space-y-6" action="#" method="POST"> */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="title"
                    value={blog.title}
                    onChange={(e)=>setBlog({...blog,title:e.target.value})}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
              <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                <textarea id="message" value={blog.content} onChange={(e)=>setBlog({...blog,content:e.target.value})}  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
              </div>
  
              <div>
                <br/>
                
                <Button
                  type="submit"
                  variant="contained"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={addBlog}
                  disabled={!blog.title || !blog.content}
                >
                  Submit
                </Button>
              </div>
            {/* </form> */}
  
           
          </div>
          <AlertsSnackbar type={alrtMssg.type} mssg={alrtMssg.mssg}open={alrtMssg.open} alrtMssg={alrtMssg} setAllrtMassg={setAllrtMassg}/>

        </div>
      </>
    )
  }
  