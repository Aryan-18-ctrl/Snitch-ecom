import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        minLength:3,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    } ,
    hashPassword:{
        type:String,
        required:true,  
    },
  refreshToken: {
    type: String,
    default: null,
    
},
role:{
    type:String ,
    default :"user" ,
       
    enum:["user" , "seller"]
}

    

})

const  userModel = mongoose.model("users" , userSchema)


export  default userModel
