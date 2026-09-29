import  mongoose from "mongoose" 
import config from "./env.config.js"

import dns from "dns";

dns.setServers([
  "1.1.1.1",
  "8.8.8.8" 
]);



async function connectDb(){

    try {
            await mongoose.connect(config.MONGO_URI)

            console.log("connected to db")
        
    } catch (error) {

        console.log("error in connecting db" , error)
        
    }

}


export  default connectDb