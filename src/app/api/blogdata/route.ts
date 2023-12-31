import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDb from "@/lib/connection";
import Blog from "@/lib/Model/blogModel";
import bcrypt from 'bcrypt';
import { secretKey } from "@/lib/connection";
// import { Jwt } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import User from "@/lib/Model/userModel";


export async function POST(req:any,res:any) {
    connectToDb()
     let {page} = req.json()

    try {
      // Verify the token to get the user information
  
      // Find all blogs associated with the user
      const userBlogs:any =  await Blog.find({})

      console.log(userBlogs)



      return NextResponse.json({ message: 'User blogs add list', blogs: userBlogs,status:200 });
    } catch (error:any) {
      console.error('Error retrieving user blogs:', error.message);
      return NextResponse.json({ message: 'Internal Server Error',status:500 });
    }
}