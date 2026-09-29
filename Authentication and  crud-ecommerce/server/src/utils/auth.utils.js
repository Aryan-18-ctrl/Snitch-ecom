
import config from "../config/env.config.js"
import jwt from "jsonwebtoken"


 export  function generateTokens(userId , role){

    const accessToken =  jwt.sign({id:userId  , role}, config.Access_TOKEN_SECRET ,{expiresIn:"15m"}) 

        const refreshToken =  jwt.sign({id:userId , role}, config.REFRESH_TOKEN_SECRET ,{expiresIn:"7d"}) 


        return {accessToken , refreshToken}



}   




export function verifyAccessToken(token){

    const decode  = jwt.verify(token , config.Access_TOKEN_SECRET)

    return decode


}


export function verifyRefreshToken(token){

    const decode  = jwt.verify(token , config.REFRESH_TOKEN_SECRET)

    return decode


}