import React, {useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button, Card,  Form} from "react-bootstrap";
import Rating from "../components/rating";
import Loader from "../components/loader";
import Message from "../components/message";

import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../actions/productActions";

function ProductPage() {

    //1. 注意这个 ID 在后续很有可能是个坑
    let {id} = useParams();

   const [qty, setQty] = useState(1)


    const dispatch = useDispatch()
   const productDetails = useSelector(state => state.productDetails)
   const {loading, error, product} = productDetails

   //Navigate 单独整理
   let navigate = useNavigate();

    // 注意是这个界面对数据进行了传递
   const addToCartHandler = () => {
       navigate(`/cart/${id}?qty=${qty}`);
   }


   useEffect(()=>{
       dispatch(listProductDetails(id));
   },[])


   return (
        <div>
           <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Loader/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                        : <Row>
               <Col md={6}>
                   <Image src={product.image} alt={product.name} />
               </Col>

               <Col md={3}>
                   <ListGroup variant="flush">
                       <ListGroup.Item>
                           <h3>{product.name}</h3>
                       </ListGroup.Item>

                       <ListGroup.Item>
                           <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                       </ListGroup.Item>

                       <ListGroup.Item>
                           Price: ${product.price}
                       </ListGroup.Item>

                       <ListGroup.Item>
                           Description:{product.description}
                       </ListGroup.Item>
                   </ListGroup>
               </Col>

               <Col md={3}>
                   <Card>
                       <ListGroup variant='flush'>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Price:</Col>
                                   <Col>
                                       <strong>${product.price}</strong>
                                   </Col>
                               </Row>
                           </ListGroup.Item>

                           <ListGroup.Item>
                               <Row>
                                   <Col>Status:</Col>
                                   <Col>
                                       {product.countInStock > 0 ? 'In Stock':'Out of stock'}
                                   </Col>
                               </Row>
                           </ListGroup.Item>

                           {
                               product.countInStock > 0 && (
                                   <ListGroup.Item>
                                       <Row>
                                           <Col>Qty</Col>
                                           <Col xs='auto' className='my-1'>
                                               <Form.Control
                                                   as="select"
                                                   value={qty}
                                                   onChange={(e)=>setQty(e.target.value)}
                                               >
                                                   {
                                                       [...Array(product.countInStock).keys()].map((x)=>(
                                                           <option key={x+1} value={x+1}>
                                                               {x+1}
                                                           </option>
                                                       ))
                                                   }
                                               </Form.Control>
                                           </Col>
                                       </Row>
                                   </ListGroup.Item>
                               )
                           }
                           <ListGroup.Item>
                               <Button
                                   onClick={addToCartHandler}
                                   className='btn-block'
                                   disabled={product.countInStock === 0}>Add Cart</Button>
                           </ListGroup.Item>
                       </ListGroup>
                   </Card>
               </Col>
           </Row>
            }
        </div>
   );
}

export default ProductPage;