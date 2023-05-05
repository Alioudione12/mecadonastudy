import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
//import axios from 'axios'
import { listProductDetails} from '../actions/productActions'


function ProductScreen(props) {
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const params = useParams();
    //const [product, setProduct] = useState([])
    const dispatch= useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails


    useEffect(()=>{
        dispatch(listProductDetails(params.id))
/*
        async function fetchProduct(){
        const {data} = await axios.get(`/api/products/${params.id}`)
        setProduct(data)

        }
    fetchProduct()*/

  },[params.id, dispatch])

  const addToCartHandler = () =>{
    navigate(`/cart/${params.id}?qty=${qty}`)
  }
    //const params = useParams();
    //const product = products.find((p)=>p._id === params.id)
 
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Retour</Link>
      {
        loading ?
            <Loader/>
            : error
            ? <Message variant='danger'>{error}</Message>
            :(
                <div>           
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>
                    {/* produts details  */}
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fbc531'}/>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Prix: {product.price}€
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>


                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Prix:</Col>
                                        <Col>
                                            <strong>{product.price}€</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {/* condition check if the product is available */}
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'En stock' : 'En rupture'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form.Control 
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) =>(
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }
                                                

                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCartHandler} 
                                        className='btn-block rounded'
                                        variant='success' 
                                        disabled={product.countInStock ===0} 
                                        type='button'>Ajouter au panier
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                </div> 
            )
      }

    </div>
  )
}

export default ProductScreen
