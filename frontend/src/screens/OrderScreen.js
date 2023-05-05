import React,{useEffect, useState} from 'react'
import {Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { PayPalButton } from "react-paypal-button-v2";
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from "../constants/orderConstants"


function OrderScreen() {
    const params = useParams();
    const orderId = params.id
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [sdkReady, setSdkReady] =useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success :successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading:loadingDeliver, success :successDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item)=> acc + item.price * item.qty,0).toFixed(2)
    }
// paypal payment setting app 
//AbaiM_xVjgC8gNnBrUYZalsT5tEwMXZb15iK2YAGDNv9PKlA7aeJpREgckqBb2va9Nu7xu3VmY2ChuVA
 const addPayPalScript =()=>{
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AbaiM_xVjgC8gNnBrUYZalsT5tEwMXZb15iK2YAGDNv9PKlA7aeJpREgckqBb2va9Nu7xu3VmY2ChuVA'
    script.async = true
    script.onload = ()=>{
        setSdkReady(true)
    }
    document.body.appendChild(script)
 }


    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }
        if(! order || successPay ||order._id !== Number(orderId) || successDeliver){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal)
            addPayPalScript()
        }else{ setSdkReady(true)}

    },[order, orderId, dispatch, successPay, successDeliver,navigate, userInfo])

    const successPaymentHandler = (paymantResult)=>{
        dispatch(payOrder(orderId, paymantResult))

    }

    const deliverHandler = ()=>{
        dispatch(deliverOrder(order))
    }

  return loading ?(
    <Loader/>
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ):(
    <div>
        <h1>Commande ID: {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                {/* shipping detail  */}
                    <ListGroup.Item>
                        <h3>Expédition</h3>
                        <p><strong>Nom: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong>{order.user.email}</p>
                        <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}
                        {' '}
                        {order.shippingAddress.postalCode},
                        {' '}
                        {order.shippingAddress.country}
                        </p>
                        {order.isDelivered? (
                            <Message variant='success'>Livraison le {order.deliveredAt}</Message>
                        ):(
                            <Message variant='warning'>Livraison non effectué</Message>
                        )}

                    </ListGroup.Item>
                    {/* shipping detail  */}
                    <ListGroup.Item>
                        <h3>Mode de payement</h3>
                        <p>
                        <strong>Mode: </strong>
                        {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Reuissir {order.paidAt}</Message>
                        ):(
                            <Message variant='danger'>Votre payement a échoué</Message>
                        )}
                    </ListGroup.Item>

                    {/* cart orders details  */}
                    <ListGroup.Item>
                        <h3>Articles commandés</h3>
                        {order.orderItems.length ===0 ? <Message variant='info'> 
                        Commande vide
                        </Message> :(
                            <ListGroup variant='flush'>
                            {order.orderItems.map((item, index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} X {item.price}€ = {(item.qty * item.price).toFixed(2)}€
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h5>Résumé des commandes</h5>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Articles: </Col>
                                <Col>{order.itemsPrice}€</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Expédition: </Col>
                                <Col>{order.shippingPrice}€</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Taxe: </Col>
                                <Col>{order.taxPrice}€</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col>{order.totalPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader/>}
                                {!sdkReady ? (
                                    <Loader/>
                                ): (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </ListGroup.Item>
                        )}

                    </ListGroup>
                    {loadingDeliver && <Loader/>}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered &&(
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn btn-block'
                                onClick={deliverHandler}>
                                Livraison Terminée
                            </Button>
                        </ListGroup.Item>
                    )}
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen