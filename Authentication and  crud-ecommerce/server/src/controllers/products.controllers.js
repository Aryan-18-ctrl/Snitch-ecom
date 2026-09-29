import productModel from "../models/products.model.js"
import uploadFiles from "../services/imagekit.config.js"

export const createProductController =  async (req ,res) =>{


try {
    const imageUrls = await Promise.all(req.files?.map(async (item) => {
    const upload = await uploadFiles(item.buffer, item.originalname)
    return upload.url
  }))


  const product = await productModel.create({
    title:req.body.title ,
    description : req.body.description
    , 
images:imageUrls ,
    prices: {
        amount:req.body.prices?.amount ,
        currency : req.body.prices?.currency
    } ,

    sizes:req.body.sizes ,

    seller:req.user.id

  })

return res.status(201).json({

    message:"Product created successfully" ,
    product

})

    
} catch (error) {

     return res.status(500).json({
        message:"Internal server error",
        error:error.message
    })
    
}
 

}


export const singleProductController  = async (req,res) =>{

try {

        const {id} = req.params 

        const product  = await productModel.findById(id) 
  if(!product){
    return res.status(404).json({
        message:"Product not found"
    })
  }

  return res.status(200).json({
    message:"Product fetched successfully" ,
    product

  })

    
} catch (error) {

    return res.status(500).json({
        message:"Internal server error" ,
        error:error.message
    })
    
}



}


export const  getProductControllers = async ( req, res)=>{

try {
        const products = await productModel.find()

        return res.status(200).json({
            message:"Products fetched successfully" , 
            products
        })

    
} catch (error) {

    return res.status(500).json({
        message:"Internal server error",
        error:error.message
    })
    
}


}


export const getPublishedProducts  = async ( req, res)=>{

try {
        const products = await productModel.find({isPublished:true})

 

        return res.status(200).json({
            message:"Products fetched successfully" , 
            products
        })

    
} catch (error) {

    return res.status(500).json({
        message:"Internal server error",
        error:error.message
    })
    
}


}


export const setPublishedProducts= async (req,res)=>{

 try {
       const {id} = req.params

const product = await productModel.findOneAndUpdate(
  {
    _id: id,
  },
  {
    isPublished: true
  },
  {
    returnDocument: "after",
    runValidators: true
  }
)
            if (!product) {
    return res.status(404).json({
      message: "Product not found"
    })
  }

    return res.status(200).json({
        message:"Product published successfully" ,
        product
    })
    
 } catch (error) {

    return res.status(500).json({
        message:"Internal server error"
    })
    
 }

}


export const setUnPublishedProducts= async (req,res)=>{

 try {
       const {id} = req.params

const product = await productModel.findOneAndUpdate(
  {
    _id: id,
  },
  {
    isPublished: false
  },
  {
    returnDocument: "after",
    runValidators: true
  }
)
            if (!product) {
    return res.status(404).json({
      message: "Product not found"
    })
  }

    return res.status(200).json({
        message:"Product published successfully" ,
        product
    })
    
 } catch (error) {

    return res.status(500).json({
        message:"Internal server error"
    })
    
 }

}




export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true
      }
    )

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      })
    }

    return res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct
    })

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    })
  }
}



export const deleteProductController = async (req ,res) =>{
    try {

        const {id} = req.params 

  const product = await productModel.findOneAndDelete({
  _id: id,
}) 

        if(!product){
            return res.status(404).json({

                message:"Product not found"
            })
        }

        return res.status(200).json({
            message:"Product deleted successfuly" ,
        })

        
    } catch (error) {

        return res.status(500).json({
      message: "Internal server error",
      error: error.message
    })

        
    }

}



