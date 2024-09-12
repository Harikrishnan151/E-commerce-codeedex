//import wishlist model
const wishlist=require('../model/wishlistSchema')


//Logic to add products to wishlist
exports.addToWishlist=async(req,res)=>{
    console.log('Inside api call to add products to wishlist');
    const {id,productName,category,price,image,stockStatus}=req.body

    try {
        const item=await wishlist.findOne({id:id})
        if(item){
            res.status(403).json({message:'Product already available in the wishlist'})
        }else{
            const newProduct=new wishlist({
                id,
                productName,
                category,
                price,
                image,
                stockStatus
            })
            await newProduct.save()
            res.status(200).json({message:"Product added to the wishlist",newProduct})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')        
    }
    
}

//Logic to get all wishlist products
exports.getAllWishlist=async(req,res)=>{
    console.log('Inside api call to get all wishlist products');
    
    try {
        const allWishlist=await wishlist.find()
       res.status(200).json({message:'Wishlist fetched',allWishlist})
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error') 
        
    }
    
}

//Logic to delete product from wishlist
exports.deleteFromWishlist=async(req,res)=>{
    console.log('Inside api call to delete product from wishlist');
    const {id}=req.params

    try {
        const deleteWishlist=await wishlist.deleteOne({_id:id})
        if(deleteWishlist){
            const allItems=await wishlist.find()
            res.status(200).json({message:"Product deleted from wishlist",allItems})
         } 

        
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')         
    }
    
}