import mongoose from "mongoose"

 let connectToDb = async()=>{
    try
    {
    let connect = await mongoose.connect("mongodb+srv://ankush:ankush123@cluster0.rmop2.mongodb.net/bansal-news?retryWrites=true&w=majority")
    connect?console.log("db connection success"):"something wrong"
    }
    catch(err){
        console.log(err)
    }

}

let secretKey = "secret-bansal-blog-#$"

export default connectToDb
export {secretKey}