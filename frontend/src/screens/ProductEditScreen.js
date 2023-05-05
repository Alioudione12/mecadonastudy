import React,{useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails, updateProduct} from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'
import axios from 'axios'




function ProductEditScreen() {
    const params = useParams();
    const productId = params.id

    const [name, setName]= useState('')
    const [price, setPrice]= useState(0)
    const [image, setImage]= useState('')
    const [brand, setBrand]= useState('')
    const [category, setCategory]= useState('')
    const [countInStock, setCountInStock]= useState(0)
    const [description, setDescription]= useState('')
    const [uploading, setUploading]= useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate();


    const productDetails = useSelector(state =>state.productDetails)
    const {error, loading, product} = productDetails

    const productUpdate = useSelector(state =>state.productUpdate)
    const {error:errorUpdate, loading:loadingUpdate, success:successUpdate} = productUpdate


    useEffect(()=>{
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate('/admin/productlist')
        }else{
            if(!product.name || product._id !== Number(productId)){
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    },[product, productId, dispatch, navigate, successUpdate])

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }))

    }

    const uploadFileHandler= async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try{
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/products/upload/', formData, config)
            setImage(data)
            setUploading(false)

        }catch(error){
            setUploading(false)
        }
    }



  return (
    <div>
        <Link className='btn btn-light' to='/admin/productlist'>Retour</Link>
        <FormContainer>
            <h1>Modifier produit </h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}


            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>:(
                <Form onSubmit={submitHandler}>
                {/* name form */}
                <Form.Group controlId='name'>
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                {/* price form */}
                <Form.Group controlId='price'>
                    <Form.Label>Prix</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter Price'
                        value={price}
                        onChange={(e)=> setPrice(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                {/* image form */}
                <Form.Group controlId='image'>
                    <Form.Label>Image article</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image'
                        value={image}
                        onChange={(e)=> setImage(e.target.value)}
                        >
                    </Form.Control>

                    <Form.Control 
                        id='image-file'
                        type="file"
                        size="sm"
                        label='Ajouter image'
                        custom
                        onChange={uploadFileHandler}
                        >
                    </Form.Control>
                    {uploading && <Loader/>}
                </Form.Group>

                {/* brand form */}
                <Form.Group controlId='brand'>
                    <Form.Label>Marque</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter brand'
                        value={brand}
                        onChange={(e)=> setBrand(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                {/* countInStock form */}
                <Form.Group controlId='countinstock'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter stock'
                        value={countInStock}
                        onChange={(e)=> setCountInStock(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                {/* category form */}
                <Form.Group controlId='category'>
                    <Form.Label>Categorie</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter category'
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>

                {/* description form */}
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        >
                    </Form.Control>
                </Form.Group>
                

                {/* button update */}
                <Button className='mt-2 rounded' type='submit' variant='success'>Modifier</Button>
            </Form>

            )}
        </FormContainer>
    </div>
  )
}

export default ProductEditScreen
