import React, {useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/product';
import Loader from "../components/loader";
import Message from "../components/message";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

function HomePage(props) {

    // 上本部分 相当于是加载内容和函数
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    },[dispatch])

    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList


    return (
        <div>
            <h1>Latest Products</h1>

            {/*创造 最终的加载的效果*/}

            {
                loading ? <Loader/>
                    : error ? <Message variant='danger'>{error}</Message>
                    : <Row>
                        { products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
            }


        </div>
    );
}

export default HomePage;