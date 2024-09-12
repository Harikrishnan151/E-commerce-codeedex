import BASEURL from './baseUrl'
import { commonRequest } from './commonReq'

//Api call to fetch all products
export const fetchProducts=async()=>{
    return commonRequest("GET",`${BASEURL}products/getAllProducts`)
}

//Api call to fectch single product
export const fetchSingleProduct=async(id)=>{
    return commonRequest("GET",`${BASEURL}products/singleProduct/${id}`)
}

//Api call to fetch wishlist 
export const fetchWishlist=async()=>{
    return commonRequest("GET",`${BASEURL}products/wishlist`)
}

//Api call to add product to wishlist
export const addToWishlist=async(wistListItem)=>{
    return commonRequest("POST",`${BASEURL}product/addToWishlist`,wistListItem)
}

//Api call to delete product from wishlist
export const deleteFromWishlist=async(id)=>{
    return commonRequest("DELETE",`${BASEURL}products/deleteWishListProduct/${id}`)
}

//Api call to add product to the cart
export const addToCart=async(cartItem)=>{
    return commonRequest("POST",`${BASEURL}products/addTocart`,cartItem)
}

//Api call to get cart products
export const fetchCart=async()=>{
    return commonRequest("GET",`${BASEURL}products/cartProducts`)
}

//Api to delete product from cart
export const deleteFromCart=async(id)=>{
    return commonRequest("DELETE",`${BASEURL}products/deleteCartProduct/${id}`)
}

//Api call to inncrement product counnt
export const incrementProduct=async(id)=>{
    return commonRequest("GET",`${BASEURL}products/incrementProduct/${id}`)
}

//Api call to decrement product count
export const decrementProduct=async(id)=>{
    return commonRequest("GET",`${BASEURL}products/decremetProduct/${id}`)
}

//Api call for signup user
export const signUp=async(userData)=>{
    return commonRequest("POST",`${BASEURL}user/userRegisteration`,userData)
}

//Api call for signIn user
export const signIn=async(userData)=>{
      return commonRequest("POST",`${BASEURL}user/userLogin`,userData)
}