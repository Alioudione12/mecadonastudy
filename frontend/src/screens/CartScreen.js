import React,{useEffect} from 'react'
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Card, Button} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen() {
    const params = useParams();
    const navigate = useNavigate()
    const productId = params.id
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    // will check it there is an problem
    
    const dispatch =useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    console.log("cartItems", cartItems)
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    },[dispatch, productId, qty])

    //action remove product on cart
    const removeFromCartHandler =(id)=>{
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = ()=>{
        navigate('/shipping')
    }


  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Panier</h1>
            {cartItems.length ===0 ? (
                <Message variant='warning'> 
                Votre Panier est vide: 
                <Link className='btn btn' to='/'>  Retour Page Accueil </Link>
                </Message>
            ):(
                <ListGroup variant='flush'>
                    {cartItems.map(item =>(
                        <ListGroup.Item key={item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded/>
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>
                                {item.price}€
                            </Col>

                            <Col md={3}>
                                <Form.Control 
                                    as="select"
                                    value={item.qty}
                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    {
                                        [...Array(item.countInStock).keys()].map((x) =>(
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                            </Col>

                            <Col md={1}>
                                <Button 
                                    type='button'
                                    variant='light'
                                    onClick={() => removeFromCartHandler(item.product)}>
                                <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                        </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>

        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h4>({cartItems.reduce((acc, item)=>acc + item.qty,0)}) articles</h4>
                        Sous-total: {cartItems.reduce((acc, item)=>acc + item.qty*item.price,0).toFixed(2)}€
                    </ListGroup.Item>
                </ListGroup>

                <ListGroup.Item className="d-grid gap-1">
                 <Button 
                    type='button'
                    className='btn-block'
                    variant='success'
                    disabled={cartItems.length===0}
                    onClick={checkoutHandler}
                    >
                    Passer la commande
                 </Button>
                </ListGroup.Item>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen
