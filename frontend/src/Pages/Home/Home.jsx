import React, { useEffect, useState } from 'react'
import './Home.css'
import Carousel from '../../Components/Carousel'
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { fetchProducts } from '../../services/allApi';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBRipple
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';


function Home() {

    const [data, setData] = useState([])
    const [search,setSearch]=useState('')

    const getProducts = async () => {
        const response = await fetchProducts()
        console.log(response);
        setData(response.data.viewAllProducts
        )

    }
    console.log(data);

    //serach product
    const filter=data.filter(item=>item.productName.toLowerCase().includes(search.toLowerCase()))

    console.log(filter);


    useEffect(() => {
        getProducts()
    }, [])


    return (
        <div>
            <Carousel />
            <div className="container mb-3">
                <MDBInputGroup onChange={e=>setSearch(e.target.value)}>
                    <MDBInput label='Search' />
                    <MDBBtn rippleColor='dark'>
                        <MDBIcon icon='search' />
                    </MDBBtn>
                </MDBInputGroup>
            </div>

            <div>
                <Row className='m-4'>
                    {
                        filter.map((products) => (
                            <Col sm={12} md={6} lg={4} xl={3} className='my-4'>
                                <div>
                                    <MDBCard className='card'>
                                        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                            <MDBCardImage style={{height:'13rem',width:'100%'}} src={products.image} fluid alt='...' />
                                            <a>
                                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                            </a>
                                        </MDBRipple>
                                        <MDBCardBody className='card-body'>
                                            <MDBCardTitle>{products.productName}</MDBCardTitle>
                                            <MDBCardText>
                                               {products.description}
                                            </MDBCardText>
                                            <MDBCardTitle style={{color:'green'}}>${products.price}</MDBCardTitle>
                                            <Link to={`/viewProduct/${products._id}`}>
                                            <MDBBtn >View</MDBBtn>
                                            </Link>
                                           
                                        </MDBCardBody>
                                    </MDBCard>
                                </div>

                            </Col>
                        ))
                    }
                </Row>
            </div>



        </div>
    )
}

export default Home