//import mongoose
const mongoose=require('mongoose')

//schema
const cartSchema=new mongoose.Schema({

    id:{
        type:Number,
        required:true,
        unique:true
    },
    productName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    stockStatus:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true   
    },
    grandTotal:{
        type:Number,
        required:true
    }
})

//create model
const carts=new mongoose.model('carts',cartSchema)

//export module
module.exports=carts