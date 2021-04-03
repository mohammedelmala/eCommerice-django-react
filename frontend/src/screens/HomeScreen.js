import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { fetchProducts } from "../actions/ProductActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";

const HomeScreen = () => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const { loading, products, error } = useSelector(state => state.products);


    return (

        <div>
            { loading ? <Loader /> :
                error ? <Message variant="danger">{error}</Message> : (
                    <Row>
                        {
                            products.map((product) => {
                                return (
                                    <Col key={product._id} md={4} className="my-3">
                                        <Product product={product} />
                                    </Col>
                                );
                            })
                        }
                    </Row>
                )
            }
        </div>
    )
}

export default HomeScreen
