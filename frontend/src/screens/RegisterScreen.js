import React,{useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'



function RegisterScreen() {
    const [name, setName]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [confirmPassword, setConfirmPassword]= useState('')
    const [message, setMessage]= useState('')

    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state =>state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler =(e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('password do not match')
        }else{
            dispatch(register(name, email, password))
        }
    }



  return (
    <FormContainer>
        {message && <Message variant='danger'>{message}</Message> }
        <h1>Créer un compte </h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            {/* name form */}
            <Form.Group controlId='name'>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    >
                </Form.Control>
            </Form.Group>

           {/* email form */}
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    >
                </Form.Control>
            </Form.Group>
            
            {/*password form */}
                <Form.Group controlId='password'>
                <Form.Label>Mot de pass</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    >
                </Form.Control>
            </Form.Group>

            {/*confirmPassword form */}
            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    >
                </Form.Control>
            </Form.Group>
            {/* button register */}
            <Button className='mt-2 rounded' type='submit' variant='success'>S'inscrire</Button>
        </Form>
{/* sign in redirect link */}
            <Row className='py-3'>
                <Col>Avoir un compte ?
                    <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Se connecter
                    </Link>
                </Col>
            </Row>
    </FormContainer>
  )
}

export default RegisterScreen
