import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

//border="light"
function Product({product}) {
  return (
    <Card className='my-3 p-2 rounded' >
    {/* image product*/}
        <Link to={`/product/${product._id}`} >
            <Card.Img src={product.image}/>
        </Link>
    {/* products details */}
        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
                <Card.Text as='div' >
                    <div>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#fbc531'}/>
                    </div>
                </Card.Text>
                    {product.price}€
                <Card.Text as='h3'>

                </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product
