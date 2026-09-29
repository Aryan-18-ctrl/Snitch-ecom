import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet } from "react-router";


// export const axiosInstance = axios.create({
//     baseURL:"http://localhost:5173/api",
//     withCredentials:true
// })



export const axiosInstance = axios.create({
  baseURL: "https://snitch-ecom-ochre.vercel.app/api",
  withCredentials: true
})


export const AxiosInterceptor = () => {

    const { accessToken  , setAccessToken} = useContext(AuthContext)

    axiosInstance.interceptors.request.use((config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    })

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {


                if (
                    error.response?.status === 401 &&
                    error.config?.url === "/auth/me"
                ){
        const response = await axiosInstance.post("/auth/refresh")

            // new access token
            const newAccessToken = response.data.accessToken

         setAccessToken(newAccessToken)

        error.config.headers.Authorization = `Bearer ${newAccessToken}`
         
        return axiosInstance(error.config)

        }

        return Promise.reject(error)
    }
)
    
}


