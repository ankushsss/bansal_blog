import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDb from "@/lib/connection";
import User from "@/lib/Model/userModel";
import Blog from "@/lib/Model/blogModel";
import bcrypt from 'bcrypt';


export async function POST(req:any) {
    connectToDb()
    
  const { id } = await req.json();
  try {
    // Check if the user with the given email already exists
    const existingUser:any = await Blog.find({_id:new mongoose.Types.ObjectId(id)})
    console.log(existingUser,"existingUser")


    return NextResponse.json({ message: 'Single Data fetched',blog:existingUser.length !=0?existingUser[0]:{},status:201 });
  } catch (error:any) {
    console.error('Error registering user:', error.message);
    return NextResponse.json({ message: 'Internal Server Error,',status:500 });
  }
}