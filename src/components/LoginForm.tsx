"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import AlertsSnackbar from "./AlertsSnackbar"
import { Button } from "@mui/material"
export default function LoginForm() {
    const [user,setUser]= useState<any>({
        email:"",
        password:""
    })
    const [alrtMssg, setAllrtMassg] = useState({
        type:"success",
        open:false,
        mssg:""
    })
    const router = useRouter()
    useEffect(()=>{
        if(localStorage.getItem("token"))
        {
         axios.post("/api/checklogin",{token:localStorage.getItem("token")}).then((res)=>{
            if(res.status == 200)
            {       
               router.push("/")
            }
         })
        }
      },[])
    const loginUser = ()=>{
        try{
           axios.post("/api/login",user).then((userData:any)=>{
            console.log(userData)
            localStorage.setItem("token",userData.data.token)
            localStorage.setItem("name",userData.data.user.fullName)
            setAllrtMassg({
                open:true,
                mssg:"login success",
                type:"success"
            })
            setTimeout(()=>{
                router.push("/")
            window.location.reload()
                
              
            },1000)
         

          

            
           }).catch((Err:any)=>{
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
                mssg:"syntax error",
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
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <form className="space-y-6" action="#" method="POST"> */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={(e)=>setUser({...user,email:e.target.value})}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={user.password}
                    onChange={(e)=>setUser({...user,password:e.target.value})}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={loginUser}
                  disabled={!user.email || !user.password }
                >
                  Sign in
                </Button>
              </div>
            {/* </form> */}
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a onClick={()=>router.push("/signup")} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign Up
              </a>
            </p>
          </div>
          <AlertsSnackbar type={alrtMssg.type} mssg={alrtMssg.mssg}open={alrtMssg.open} alrtMssg={alrtMssg} setAllrtMassg={setAllrtMassg}/>
        </div>
      </>
    )
  }
  