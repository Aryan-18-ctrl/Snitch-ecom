import { createContext, useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../axiosinstance/axiosInstance";
import toast from "react-hot-toast";
export const AuthContext = createContext()

export function AuthContextProvider({children}){

    const [user , setUser] = useState(null)

    const [accessToken , setAccessToken] = useState("") 
     
    const  [isLoading , setIsLoading] = useState(true) 

    const getMe = async  ()=>{

       try {

         const res= await axiosInstance.get("/auth/me")
           setUser(res.data?.data.user)

       } catch (error) {

        console.log("error in me" ,error)


       }
       finally{
        setIsLoading(false)
       }

    }

    useEffect(()=>{
        getMe()

    } , [])
  
  


return (

    <AuthContext.Provider value={{accessToken ,  setAccessToken , user , setUser , isLoading}}>
        {children}
    </AuthContext.Provider>


)


}


