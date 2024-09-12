//import mongoose
const mongoose=require('mongoose')

//schema
const wishlistSchema=new mongoose.Schema({
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
    }


})

//create model
const wishlists=new mongoose.model('wishlists',wishlistSchema)

//export module
module.exports=wishlists