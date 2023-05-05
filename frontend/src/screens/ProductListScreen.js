/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React,{useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts, deleteProduct, createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

function ProductListScreen() {
    const params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const productList= useSelector(state => state.productList)
    const {loading, error, products} = productList

    const productDelete= useSelector(state => state.productDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete

    const productCreate= useSelector(state => state.productCreate)
    const {loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct} = productCreate

    const userLogin= useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    


    useEffect (()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
            navigate('/login')    
        }

        if(successCreate){
            navigate(`/admin/product/${createdProduct._id}/edit`) 
        } else{
            dispatch(listProducts())
        }
        

    },[dispatch,navigate, userInfo, successDelete, successCreate, createProduct])

    const deleteHandler = (id)=>{
        if(window.confirm(" Etes-vous sure: supprimer ce produit")){
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler = ()=>{
        dispatch(createProduct())
    }

    return (
        <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Liste des produits</h1>
            </Col>

            <Col className='text-right'>
                <Button variant="outline-success" 
                    className='my-3 rounded' 
                    onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Creer produit
                </Button>
            </Col>

        </Row>

        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loadingCreate && <Loader/>}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}


        {loading ? (<Loader/>):error 
                ? (<Message variant='danger'>{error}</Message>)
                : (
                    <Table variant='light' striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOM ARTICLE</th>
                                <th>PRIX</th>
                                <th>CATEGORIE</th>
                                <th>MARQUE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>(
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}€</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant="success" className='btn-sm m-2 rounded'>
                                            Modifier
                                            </Button>
                                        </LinkContainer>
                                            <Button variant="danger" className='btn-sm m-2 rounded' 
                                                onClick={()=>deleteHandler(product._id)}>
                                            Supprimer
                                            </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
        </div>
  )
}

export default ProductListScreen