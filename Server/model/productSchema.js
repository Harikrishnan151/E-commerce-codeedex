// import mongoose
const mongoose=require('mongoose')

//schema
const productSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    productName:{
        type:String,
        required:true
    },
    description:{
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
})

//create model
const products=new mongoose.model('products',productSchema)

//export model
module.exports=products
