import mongoose from "mongoose";
// In app/api/inngest/route.js
import { inngest, syncUserCreation, syncUserUpdate, syncUserDeletion } from "@/config/inngest";
let cached=global.mongoose
if(!cached){
cached=global.mongoose={conn:null,promise:null}
}
async function connectToDB()
{
    if(cached.conn)
    {
        return cached.conn
    }
    if(cached.promise)
    {
        const opts={
            bufferCommands:false
        }
cached.promise=mongoose.connect(`${process.env.MONGODB_URL}/sleekcart`,opts).then(mongoose=>{
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}
export default connectToDB