import React, {useEffect} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../actions/cartActions";
import Message from "../components/message";
import {Button, Card, Form, Image, ListGroup} from "react-bootstrap";
import {Row, Col} from 'react-bootstrap';
import {Link} from "react-router-dom";

//一些思考: React將數據暫時儲存在前端 (會更方便數據操作)

function CartPage() {

    console.log("Here is all the information");

    let {id} = useParams();

    console.log("Test 1")

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const qty = Number(searchParams.get("qty"));

    const dispatch = useDispatch();

    console.log("Test 2")

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    console.log('cartItems',cartItems);

    console.log("Test 3")

    useEffect(() => {
        if(id){
            dispatch(addToCart(id,qty))
        }
    },[dispatch, id, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    console.log("Test 4")

    let navigate = useNavigate();

    // 最終對數據進行了傳遞
    const checkOutHandler = () => {
        navigate(`/shipping`)
    }

    console.log("Test 5")

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to ='/'>Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>

                                        <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={3}>
                                            <Form.Control
                                               as="select"
                                               value={item.qty}
                                               onChange={(e)=>dispatch((addToCart(item.product,Number(e.target.value))))}
                                            >
                                               {
                                                   [...Array(item.countInStock).keys()].map((x)=>(
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
                                                onClick={()=>removeFromCartHandler(item.product)}
                                            >
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
                            <h2>Subtotal Values Of The Carts</h2>
                            {cartItems.reduce((acc, item) => acc + item.qty * item.price,0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkOutHandler}
                        >
                            Proceed to Checkout
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    );
}

export default CartPage;