import React, {useState, useEffect} from 'react'
import FormContainer from "../components/formContainer";
import {Button, Form, Row, Col} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../actions/userActions";
import Message from "../components/message";
import Loader from "../components/loader";

function LoginPage(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // 待定 : 看最后是想跳转到 哪个网页上面去 (最终的转换地址)
    const redirect = location.state ? Number(location.state) : '/'
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form>
                <Form.Group controlId='email'>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' onClick={submitHandler} variant='primary'>
                    Sign In
                </Button>
            </Form>

        {/*    注册的部分    */}
            <Row className='py-3'>
                <Col>
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : '/register' }>Register Now</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginPage