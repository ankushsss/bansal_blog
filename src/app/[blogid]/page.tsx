"use client"
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import { useRouter } from "next/navigation"
 
export default function Page({params}:any) {
  // const router = useRouter()
  const [post,setPost] = useState<any>({})
  useEffect(()=>{
    fetchData()
  },[])
  let fetchData = () => {
    axios.post("/api/singleBlog",{id:params?.blogid}).then((res:any) => {
       console.log(res.data)
      setPost(res?.data?.blog)
    })
  }
 
  return (<div style={{display:"flex",justifyContent:"center"}}>
  { post.title? <article  className="flex max-w-xl flex-col items-start justify-between" style={{ width: "340px",cursor:"pointer",}}>
  <div style={{ height: "40px", width: "100%", overflow: "hidden" }}><img src="https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHxlbnwwfHwwfHx8MA%3D%3D" /></div>

  <div className="flex items-center gap-x-4 text-xs">
    <time dateTime={post.createdAt} className="text-gray-500">
      {post.createdAt}
    </time>
    <div
      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
    >
      blog
    </div>
  </div>
  <div className="group relative">
    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
   
        <span className="absolute inset-0" />
        {post.title}
    
    </h3>
    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
  </div>
  <div className="relative mt-8 flex items-center gap-x-4">
    <img alt="" className="h-10 w-10 rounded-full bg-gray-50" />
    <div className="text-sm leading-6">
      <p className="font-semibold text-gray-900">
      
          <span className="absolute inset-0" />
          {post.author_name}
      
      </p>
      <p className="text-gray-600">user</p>
    </div>
  </div>
</article>:<div role="status" className="max-w-sm animate-pulse">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <span className="sr-only">Loading...</span>
        </div>}
</div>)
}