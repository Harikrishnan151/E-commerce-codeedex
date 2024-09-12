import React, { useEffect, useState } from 'react'
import './Cart.css'
import { decrementProduct, deleteFromCart, fetchCart, incrementProduct } from '../../services/allApi'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import Swal from 'sweetalert2';

function Cart() {

    const [cartProducts, setCartProducts] = useState([])
    const [total,setTotal]=useState([])

    //fetch cart products
    const getCart = async () => {
        const response = await fetchCart()
        console.log(response.data.allCart)
        setCartProducts(response.data.allCart)
    }
    console.log(cartProducts);


    //delete product from cart
    const deleteProductFromCart = async (id) => {
        console.log(id);

        const response = await deleteFromCart(id)
        console.log(response);
        Swal.fire({
            title: 'Success!',
            text: 'Product deleted from cart.',
            icon: 'success',
            confirmButtonText: 'OK',
        });
        getCart()

    }
 
    //grand total
    const getCartTotal = () => {
        const totalPrice = cartProducts.reduce((acc, item) => {
          return acc + item.price * item.quantity; // Multiply price by quantity
        }, 0);
        
        setTotal(totalPrice); // Update total
      };

    //increment product count
    const incrementProductCount=async(id)=>{
        try {
            const response=await incrementProduct(id)
            console.log(response);
            getCart()
            getCartTotal()
        } catch (error) {
            alert('Error in incrementing product')
        }
    }

    //decrement product
    const decrementProductCount=async(id)=>{
        try {
           const response=await decrementProduct(id)
           console.log(response);
           getCart()
           getCartTotal()
            
        } catch (error) {
            alert('Error in decrementing product') 
        }
    }


    useEffect(() => {
        getCart()
    }, [])

    useEffect(()=>{
        getCartTotal()
    },[cartProducts])

    return (
        <div className='conatainer my-3'>
            {
                cartProducts.length > 0 ?
                    <MDBTable responsive hover>
                        <MDBTableHead>
                            <tr>
                                <th style={{fontWeight:'bolder'}} scope='col'>#</th>
                                <th style={{fontWeight:'bolder'}} scope='col'>Product Name</th>
                                <th style={{fontWeight:'bolder'}} scope='col'>Image</th>
                                <th style={{fontWeight:'bolder'}} scope='col'>Delete</th>
                                <th style={{fontWeight:'bolder'}} scope='col'>Quantity</th>
                                <th style={{fontWeight:'bolder'}} scope='col'>Price</th>

                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {cartProducts.map((item, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{item.productName}</td>
                                    <td><img style={{ width: '110px', height: '100px' }} src={item.image} alt="" /></td>

                                    <td onClick={() => deleteProductFromCart(item._id)} style={{ cursor: 'pointer' }} ><i className="fa-solid fa-trash text-danger"></i></td>
                                    <td>
                                        <div class=" d-flex">
                                            <button onClick={() => incrementProductCount(item.id)} class="btn">+</button>
                                            <input style={{ width: "40px" }} type="text" readOnly value={item.quantity} />
                                            <button onClick={()=>decrementProductCount(item.id)} class="btn">-</button>
                                        </div>
                                    </td>
                                    <td><h5 style={{ color: 'green' }}>$ {item.price}</h5></td>

                                </tr>
                            ))}
                        </MDBTableBody>

                    </MDBTable>
                    
                    :
                    <div className='text-center'>
                        <img style={{ height: '26rem', width: "auto" }} src="https://cdn.dribbble.com/users/530801/screenshots/2357094/present.gif" alt="" />
                        <h1 className='m-2'>Your Cart is Empty...!</h1>
                        <Link to={'/'}>
                            {/* <button className='btn btn-primary m-4'>Back to Home</button> */}
                            <MDBBtn outline rounded color='dark'>
                                Home
                            </MDBBtn>
                        </Link>
                    </div>
            }
            <div>
                {
                    cartProducts.length>0?
                    <div className="container">
                    <h1 className='text-center m-4' style={{fontWeight:'bolder'}}>Cart Summary</h1>
                    <h3 className='text-center'>Total Number of products : {cartProducts.length} </h3>
                    <h2 className='text-center'>Total : <span style={{color:'green'}}>${total}</span>   </h2>
                    <div className='text-center m-4'>
                        <button className='btn btn-success'>Check Out</button>
                    </div>
                </div>:''
                }
            </div>



        </div>
    )
}

export default Cart