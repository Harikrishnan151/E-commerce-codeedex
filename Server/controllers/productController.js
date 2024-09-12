//import model
const products = require('../model/productSchema')

//Logic to add products
exports.addProducts = async (req, res) => {
    console.log('Inside api call to add-products');
    const { id,productName, description, category, price, image, stockStatus } = req.body
    try {
        if (!id || !productName || !description || !category || !price || !image || !stockStatus) {
            res.status(400).json({ message: "Missing in feilds" })
        } else {
            const newProduct = new products({
                id,
                productName,
                description,
                category,
                price,
                image,
                stockStatus
            })
            await newProduct.save()
            res.status(200).json({ message: 'Product Added' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }

}

//Logic to get all products
exports.getAllProducts=async(req,res)=>{
    console.log('Inside api call to get all products');

    try {
        const viewAllProducts=await products.find()
        res.status(200).json({message:"Fetched all Products",viewAllProducts})
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')  
    }
    
}

//Logic to get single product
exports.getSingleProduct=async(req,res)=>{
    console.log('Inside api call to get single product');
    const {id}=req.params

    try {
        const product=await products.findOne({_id:id})
        if(product){
            res.status(200).json({message:'Product Fetched',product})
        }else{
            res.status(404).json({message:'Product not found'})
        }
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error') 
    }
    
    
}

//Logic to update product details
exports.updateProductDetails=async(req,res)=>{
    console.log('Inside api call to edit product details');

   try {
    const updateProduct=await products.findByIdAndUpdate(
        req.params.id,

        {
            $set: {
                productName: req.body.productName,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                stockStatus: req.body.stockStatus
              },
        },
        { new: true }
    );
    res.status(200).json({message:'Product details Updated',updateProduct})
    
   } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error') 
   }
    
}

//Logic to delete product
exports.deleteProduct=async(req,res)=>{
    console.log('Inside api call to delete product')
    const {id}=req.params

    try {
        const deleteProduct=await products.deleteOne({_id:id})
        if(!deleteProduct){
            res.status(400).json({message:'Product not found'})
        }else{
            res.status(200).json({message:'Product deleted'})           
        }
        
    } catch (error) {
     console.log(error);
     res.status(500).json('Internal server error')    
    }
}