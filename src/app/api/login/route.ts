import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectToDb from "@/lib/connection";
import User from "@/lib/Model/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secretKey } from "@/lib/connection";

export async function POST(req:any) {
    connectToDb()
    
      const { email, password } = await req.json();
    
      try {
        // Find the user in the database by username
        const user = await User.findOne({ email });
    
        if (!user) {
          return NextResponse.json({ message: 'Invalid username or password',status:400 });
        }
    
        // Compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
          return NextResponse.json({ message: 'Invalid username or password',status:400 });
        }
    
        // At this point, the user is authenticated
        // You may generate a JWT token or set a session here
        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
            expiresIn: '1h', // Token expiration time
          });
        return NextResponse.json({ message: 'Login successful',token,user,status:200 });
      } catch (error:any) {
        console.error('Error during login:', error.message);
        return NextResponse.json({ message: 'Internal Server Error',status:500 });
      }
   
}