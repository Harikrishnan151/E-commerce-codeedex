import React, { useEffect, useState } from 'react'
import '../productView/ProductView.css'
import { Link, useParams } from 'react-router-dom'
import { addToCart, addToWishlist, fetchSingleProduct } from '../../services/allApi';
import { MDBRipple } from 'mdb-react-ui-kit';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';



function ProductView() {

    const { id } = useParams()
    console.log(id);

    const [productDetails, setProductDetails] = useState([])

    const getSingleProduct = async () => {
        const response = await fetchSingleProduct(id)
        console.log(response.data.product);
        setProductDetails(response.data.product)
    }
    console.log(productDetails);

    //add to wishlist
    const handleToWishlist=async(productDetails)=>{
      
        try {
            const wistListItem={
                id:productDetails.id,
                productName:productDetails.productName,
                category:productDetails.category,
                price:productDetails.price,
                image:productDetails.image,
                stockStatus:productDetails.stockStatus
            }
            const response=await addToWishlist(wistListItem)
            console.log(response);
            
            if(response.status===200){
                Swal.fire({
                    title: 'Success!',
                    text: 'Product added to Wishlist.',
                    icon: 'success', 
                    confirmButtonText: 'OK',
                  });
            }else{
                Swal.fire({
                    title: 'Success!',
                    text: 'Product already exist in wishlist.',
                    icon: 'info', 
                    confirmButtonText: 'OK',
                  });
            }
            
            
        } catch (error) {
            alert('Error in adding product to wishlist')
        }

    }

    //add to cart
    const handleToCart=async(productDetails)=>{
        try {
            const quantity=1;
            const grandTotal=productDetails.price*quantity
            
            const cartItem={
                id:productDetails.id,
                productName:productDetails.productName,
                category:productDetails.category,
                price:productDetails.price,
                image:productDetails.image,
                stockStatus:productDetails.stockStatus,
                quantity,
                grandTotal

            }
            const response=await addToCart(cartItem)
            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Product added to cart.',
                icon: 'success', 
                confirmButtonText: 'OK',
              });
            

        } catch (error) {
            alert('error in adding products to cart')
        }
    }

    useEffect(() => {
        getSingleProduct()
    }, [])



    return (
        <>
            <div className="container">
            
                <div className="row m-4 my-4">
                    <div className="col-md-6 col-sm-12 col-12 mt-3">
                        <MDBRipple
                            // className='bg-image hover-overlay shadow-1-strong rounded'
                            // rippleTag='div'
                            // rippleColor='light'
                        >
                            <div className='box'>
                            <img src={productDetails.image} style={{transition: '0.5s',}} className='imga w-100'
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                            </div>
        
                            {/* <a href='#!'>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }}></div>
                            </a> */}
                        </MDBRipple>


                    </div>
                    <div className="col-md-6 col-sm-12 col-12 mt-2">
                        <MDBListGroup style={{ minWidth: '15rem' }} light>
                            <MDBListGroupItem active noBorders aria-current='true' className='px-3'>
                               <h5 style={{ color:"black"}}> {productDetails.productName}</h5>
                            </MDBListGroupItem>
                            <MDBListGroupItem noBorders className='px-3'>
                                Description: {productDetails.description}
                            </MDBListGroupItem>
                            <MDBListGroupItem noBorders className='px-3'>
                                Category: {productDetails.category}
                            </MDBListGroupItem>
                            <MDBListGroupItem style={{ color: 'green' }} noBorders className='px-3'>
                                Stock Status: {productDetails.stockStatus}
                            </MDBListGroupItem>
                            <MDBListGroupItem style={{ color: 'black' }} noBorders className='px-3'>
                                <h4><span>Price: </span>${productDetails.price}</h4>
                            </MDBListGroupItem>
                            <div className='btns'>
                                
                                <MDBBtn onClick={()=>handleToWishlist(productDetails)} className='me-2 ' color='danger'>
                                    Add to Wishlist
                                </MDBBtn>
                                <MDBBtn onClick={()=>handleToCart(productDetails)} className='me-2' color='success'>
                                    Add to cart
                                </MDBBtn>
                            </div>
                        </MDBListGroup>

                    </div>
                    
                </div>



                
            </div>
        </>
    )
}

export default ProductView