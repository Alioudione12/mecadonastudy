import React,{useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


function LoginScreen(){
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state =>state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <FormContainer>
            <h1>S'identifier</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                {/* email form */}
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
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
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                {/* button */}
                <Button className='mt-2 btn-md m-2 rounded' type='submit' variant='success'> se Connecter</Button>
            </Form>
{/* register redirect link */}
            <Row className='py-3'>
                <Col>Nouveau client? 
                    <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                         Créer un compte
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
