import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokens } from "../utils/auth.utils.js"
import { verifyRefreshToken } from "../utils/auth.utils.js"
import { cookie } from "express-validator"

 
export const registerController = async (req,res)=>{

  try {
      const {name , email ,password }  = req.body

    const isUserExists = await userModel.findOne({email})

    if(isUserExists){
        return res.status(409).json({
            message:"user already exists"
        })
    }

    const user = await  userModel.create({name , email , hashPassword:await bcrypt.hash(password , 10)}) 


    return res.status(201).json({
        message:"user registered successfully" , 
        data:{
            user:{
                id:user._id , 
                name:user.name ,
                email:user.email ,
                role:user.role

            }
        }
    })

    
  } catch (error) {


    return res.status(500).json({
        message:"Internal server error"
    })

  }

}


  
export const loginController  = async (req,res)=>{

   try {
     const {email , password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(401).json({
            message:"invalid email or password"
        })
    }

const validatePassword = await bcrypt.compare(password, user.hashPassword)

    if(!validatePassword){
        return res.status(401).json({

            message:"Invalid email or password"
        })
    }

    //  gerate tokes --- 

const {accessToken , refreshToken} = generateTokens(user._id , user.role )

const saveRefreshToekn = await userModel.findByIdAndUpdate(user._id,{refreshToken})

res.cookie("refreshToken" , refreshToken , 
    {httpOnly:true})

return res.status(200).json({
    message:"user logged in successfully" ,

 data:{  user:{
                id:user._id , 
                name:user.name ,
                email:user.email ,
            role:user.role


            }
        } , 
        
    accessToken
})

   } catch (error) {
console.log(error)
        return res.status(500).json({
        message:"Internal server error"
    })

    
   }

}




export const getMeController = async (req, res) => {
  try {
    const { id, role } = req.user;
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ 
      message: "User fetched successfully", 
      data:{
        user:{
            name:user.name ,
            email:user.email ,
            id:user._id ,
            role:user.role
        }
      }
       
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error", error: error.message });
  }
};



export const refreshController = async (req, res) =>{

  const refreshTokenclient = req.cookies?.refreshToken;

    if(!refreshTokenclient){
        return res.status(401).json({
            message:"refreshtoken not found"
        })
    }

    try {

        const {id  } = verifyRefreshToken(refreshTokenclient)

        const user = await userModel.findById(id) ;

        if(!user){
            return res.status(404).json({
                message:"user not  found"
            })
        }

  

    if (user.refreshToken !== refreshTokenclient) {
      await userModel.findByIdAndUpdate(id, { refreshToken: null });

      return res.status(401).json({
        message: "Invalid or token mismatched"
      });
    }

            const {accessToken , refreshToken}= generateTokens(user._id , user.role)


      await userModel.findByIdAndUpdate(id, { refreshToken });

res.cookie("refreshToken", refreshToken, {
  httpOnly: true
})
return res.status(200).json({
    message:"Token refresed successfully" ,

    accessToken
})

        
    } catch (error) {

            return res.status(500).json({ message: "invalid refreshtoken", error: error.message });


    }





}



export const logoutController = async (req , res)=>{

    try {

        const {id} = req.user

         await userModel.findByIdAndUpdate(id , {
            refreshToken :null 
        }) 


    res.clearCookie("refreshToken");

      return res.status(200).json({
        message: "Logout successfully"
    });

        
    } catch (error) {
        
   return res.status(500)
    .json({ message: "invalid refreshtoken", error: error.message });

    }

} 
  

