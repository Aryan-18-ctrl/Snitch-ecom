import {json, Router} from "express"
import { createProductController, getProductControllers , setPublishedProducts ,
    getPublishedProducts , updateProductController, singleProductController, 
    deleteProductController , setUnPublishedProducts} from "../controllers/products.controllers.js"

import { authenticate } from "../middleware/auth.middleware.js"
import { uploads } from "../config/multer.config.js"
import { productValidator , validateProductId , updateProductValidator} from "../validator/product.validator.js"

const router  = Router()


//@post  /api/products

router.post("/" , authenticate , (req, res ,next)=>{

    if(req.user.role !=="seller"){
        return res.status(403).json({
            message:"only seller is authorized to perfom this action"
        })
    }
    next()

} ,


uploads.array("images" ,  5) ,

(req, res ,next)=>{
   req.body.prices && (req.body.prices = JSON.parse(req.body.prices))
      req.body.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

next()
} ,

productValidator

, createProductController)

// get all products 

router.get("/" , getProductControllers)


// get single product


router.get("/:id",validateProductId, singleProductController)

//  get  published

router.get("/all/published", getPublishedProducts)

// update products

//@put /api/products/:id


router.put("/:id" ,authenticate , (req, res ,next)=>{

    if(req.user.role !=="seller"){
        return res.status(403).json({
            message:"only seller is authorized to perfom this action"
        })
    }
    next()

} ,  uploads.array("images" ,5) ,  (req, res ,next)=>{

   req.body.prices && (req.body.prices = JSON.parse(req.body.prices))
      req.body.sizes && (req.body.sizes = JSON.parse(req.body.sizes))

next()
},

updateProductValidator

, updateProductController  )



// publish products

router.patch("/publish/:id" , authenticate ,  (req, res ,next)=>{

    if(req.user.role !=="seller"){
        return res.status(403).json({
            message:"only seller is authorized to perfom this action"
        })
    }
    next()

} , validateProductId , setPublishedProducts)


// unpublish 

router.patch("/unpublish/:id" , authenticate ,  (req, res ,next)=>{

    if(req.user.role !=="seller"){
        return res.status(403).json({
            message:"only seller is authorized to perfom this action"
        })
    }
    next()

} , validateProductId , setUnPublishedProducts)


//  delete products 

//delete  /api/products/:id

router.delete("/:id" , authenticate , (req, res ,next)=>{

    if(req.user.role !=="seller"){
        return res.status(403).json({
            message:"only seller is authorized to perfom this action"
        })
    }
    next()

} , validateProductId,  deleteProductController)

export default router