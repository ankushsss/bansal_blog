import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDb from "@/lib/connection";
import User from "@/lib/Model/userModel";
import bcrypt from 'bcrypt';
export async function GET() {
    connectToDb()
    
   return NextResponse.json({mssg:"hii"}) 
}


export async function POST(req:any) {
    connectToDb()
    
  const { fullName, email, password } = await req.json();
  const saltRounds = 10;
  try {
    // Check if the user with the given email already exists
    const existingUser = await User.find({ email });
   console.log(fullName)
    if (existingUser.length != 0) {
      return NextResponse.json({ message: 'User with this email already exists',status:400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully',status:201 });
  } catch (error:any) {
    console.error('Error registering user:', error.message);
    return NextResponse.json({ message: 'Internal Server Error,',status:500 });
  }
}