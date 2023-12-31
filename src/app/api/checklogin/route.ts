import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDb from "@/lib/connection";
import Blog from "@/lib/Model/blogModel";
import bcrypt from 'bcrypt';
import { secretKey } from "@/lib/connection";
// import { Jwt } from "jsonwebtoken";
import jwt from 'jsonwebtoken'
import User from "@/lib/Model/userModel";


export async function POST(req:any) {
    connectToDb()
    
    const { token } = await req.json();
    console.log(token,"jkl")

    try {
      // Verify the token to get the user information
      const decoded:any = jwt.verify(token, secretKey);
  
      // Find the user by email (you can use other unique identifiers)
      const user = await User.findOne({ email: decoded.email });
  
      if (!user) {
        return NextResponse.json({ message: 'Unauthorized',status:401 });
      }

      return NextResponse.json({ message: 'authorized',status:200 })

    } catch (error:any) {
      console.error('Error retrieving user blogs:', error.message);
      return NextResponse.json({ message: 'Internal Server Error',status:500 });
    }
}