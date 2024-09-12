//import express
const express=require('express')


//import controllers
const productController=require('../controllers/productController')
const wishlistController=require('../controllers/wishlistController')
const cartController=require('../controllers/cartController')
const userController=require('../controllers/userController')
//create router
const router=new express.Router()

//Api calls

//Api call to create product
router.post('/products/addProducts',productController.addProducts)

//Api call to get all product
router.get('/products/getAllProducts',productController.getAllProducts)

//Api call to get singel product
router.get('/products/singleProduct/:id',productController.getSingleProduct)

//Api call to update product details
router.post('/products/editProducts/:id',productController.updateProductDetails)

//Api call to delete product
router.delete('/products/deleteProduct/:id',productController.deleteProduct)

//Api call to add product to wishlist
router.post('/product/addToWishlist',wishlistController.addToWishlist)

//Api call to get wishlist products
router.get('/products/wishlist',wishlistController.getAllWishlist)

//Api call to wishlist products
router.delete('/products/deleteWishListProduct/:id',wishlistController.deleteFromWishlist)

//Api call to add product to cart
router.post('/products/addTocart',cartController.addProductToCart)

//Api call to get cart products
router.get('/products/cartProducts',cartController.getCartProducts)

//Api call to delete product from the cart
router.delete('/products/deleteCartProduct/:id',cartController.deleteProductFromCart)

//Api call to Increment product count
router.get('/products/incrementProduct/:id',cartController.IncrementCartCount)

//Api call to decrement product count
router.get('/products/decremetProduct/:id',cartController.decremetProduct)

//Api call to user registeration
router.post('/user/userRegisteration',userController.registerUser)

//Api call for user login
router.post('/user/userLogin',userController.loginUser)

//export router
module.exports=router
