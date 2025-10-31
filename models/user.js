import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
const userSchemema=new mongoose.Schema({
    _id:{type : String,required:true},
    name:{type : String,required:true},
    email:{type : String,required:true,unique:true},
    cartItems :{type : Object,default : {}}

},{minimize:false})
const User =mongoose.models.user|| mongoose.model('user',userSchemema) 
 export default User