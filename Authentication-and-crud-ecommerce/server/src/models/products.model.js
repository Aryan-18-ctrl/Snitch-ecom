
import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title:{
        type:String ,
        required:true ,
        minLength:3
    } ,

    description:{

         type:String ,
        required:true ,
        minLength:10


    } ,

 images: [
    {
    type: [String],
    required: true,
    validate: {
        validator: function (images) {
            return images.length >= 2 && images.length <= 5;
        },
        message: "Product must have between 2 and 5 images"
    }
}  
 ],

prices:{
    
  amount:{
    type:Number ,
    required:true

  },

  currency:{
    type:String,
    required:true,
    default:"INR",
    enum :["INR" , "USD" ]


  }

    

 } ,


sizes: [
    {
        size: {
            type: String,
            enum:["XS" , "S" , "M" , "L" , "XL" , "XXL"] ,
            
            required: true
        },

        stock: {
            type: Number,
            required: true,
            min: 0
        }
    }
] ,


seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
}

,
isPublished :{
    type:Boolean ,
    default:false ,
    required:true
}


})  




const productModel = mongoose.model("products", productSchema)

export  default productModel