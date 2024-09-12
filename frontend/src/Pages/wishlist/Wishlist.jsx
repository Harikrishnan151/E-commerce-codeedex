import React, { useEffect, useState } from 'react'
import './Wishlist.css'
import { addToCart, deleteFromWishlist, fetchWishlist } from '../../services/allApi'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple
} from 'mdb-react-ui-kit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';


function Wishlist() {

    const [wishlist, setWishlist] = useState([])
    const navigate=useNavigate()

    const getWishlist = async () => {
        const response = await fetchWishlist()
        console.log(response.data.allWishlist);
        setWishlist(response.data.allWishlist)
    }
    console.log(wishlist);

    //delete product from wishlist
    const deleteWishlistProducts=async(id)=>{
        console.log(id);
        
        try {
            const response=await deleteFromWishlist(id)
            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Product deleted from wishlist.',
                icon: 'success', 
                confirmButtonText: 'OK',
              });
            getWishlist()
              
        } catch (error) {
           alert('Error in deleting product') 
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
                  
                  setTimeout(()=>{
                    navigate('/cart')
                  },3000)
                
    
            } catch (error) {
                alert('error in adding products to cart')
            }
        }


    useEffect(() => {
        getWishlist()
    }, [])
    return (
        <div >
            <Row className='m-4'>
                {
                    wishlist.length > 0 ? wishlist.map((item) => (
                        <Col sm={12} md={6} lg={4} xl={3} className='my-4'>
                            <div>
                                <MDBCard className='card2'>
                                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                        <MDBCardImage style={{ height: '13rem', width: '100%' }} src={item.image} fluid alt='...' />
                                        <a>
                                            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                        </a>
                                    </MDBRipple>
                                    <MDBCardBody className='card-body2' >
                                        <MDBCardTitle>{item.productName}</MDBCardTitle>
                                        <MDBCardText>
                                            {item.description}
                                        </MDBCardText>
                                        <MDBCardTitle style={{ color: 'green' }}>${item.price}</MDBCardTitle>
                                         <div >
                                         <MDBBtn onClick={()=>deleteWishlistProducts(item._id)} className='btnIcon mx-4 mt-2' size='sm' outline rounded  color='danger'>
                                                < DeleteIcon/>
                                            </MDBBtn>

                                       
                                        <MDBBtn onClick={()=>handleToCart(item)} className='mx-4 mt-2' size='sm' rounded outline color='info'>
                                                <AddShoppingCartIcon/>
                                            </MDBBtn>
                                         </div>


                                    </MDBCardBody>
                                </MDBCard>
                            </div>

                        </Col>
                    )) : 
                    <div className="container">
                        <img src="https://cdn.dribbble.com/users/392618/screenshots/2121061/wishlist.gif" alt="" />
                        <br/>
                     <Link to={'/'}><MDBBtn outline rounded color='dark'>
                                Home
                            </MDBBtn> </Link>   
                    </div>
                }
            </Row>

        </div>
    )
}

export default Wishlist