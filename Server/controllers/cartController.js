//import model
const cart=require('../model/cartSchema')

//Logic to add products to cart
exports.addProductToCart=async(req,res)=>{
    console.log('Inside api call to add products to the cart');
    const {id,productName,category,price,image,stockStatus,quantity}=req.body

    try {
        const product=await cart.findOne({id:id})
        if(product){
          product.quantity+=1

          product.grandTotal=product.price*product.quantity

          product.save()
          res.status(200).json({message:'Product details updated'})
        }else{
            const newProduct=new cart({
                id,
                productName,
                category,
                price,
                image,
                stockStatus,
                quantity,
                grandTotal:price

            })
            newProduct.save()
            res.status(201).json({message:"Product added successfully"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')         
    }
}

//Logic to get cart products
exports.getCartProducts=async(req,res)=>{
    console.log('Inside api call to get cart products');
    
    try {
        const allCart=await cart.find()
        res.status(200).json({message:'Cart Fetched',allCart})
        
    } catch (error) {
     console.log(error);
     res.status(500).json('Internal server error')          
    }
}

//Logic to delete product from cart
exports.deleteProductFromCart=async(req,res)=>{
    console.log('Inside api call to delete products from cart');
    const {id}=req.params

    try {
        const removeProduct=await cart.deleteOne({_id:id})
    
    if(removeProduct.deleteCount!=0){
       //get all remaining products from cart
       const allProducts=await cart.find()
       res.status(200).json({message:'Product deleted from cart',allProducts})
    }
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')        
    }
    
}

//Logic to increment cart product count
exports.IncrementCartCount=async(req,res)=>{
   console.log('Inside api call to incremet product count')
   const {id}=req.params

   try {
    const product=await cart.findOne({id})
    if(product){
        product.quantity+=1
        product.grandTotal=product.price*product.quantity
        await product.save()

        const allCart=await cart.find()
        res.status(200).json({message:'Product Count Incremented',allCart})
    }else{
        res.status(401).json({message:'Product not found'})
    }
    
   } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error')    
   }
}

//Logic to cart decrement product count
exports.decremetProduct=async(req,res)=>{
    console.log('Inside api call to decrement product count');
    const {id}=req.params

    try {
        const product=await cart.findOne({id})
        if(product){
            product.quantity-=1
            if(product.quantity==0){
                await cart.deleteOne({id})
                const allCart=await cart.find()
                res.status(200).json(allCart)
            }else{
                product.grandTotal=product.price*product.quantity
                await product.save()
                const allCart=await cart.find()
                res.status(200).json(allCart)
            }
        }else{
            res.status(401).json("product not found")
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')        
    }
    
}