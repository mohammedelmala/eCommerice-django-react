import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";

import { fetchProducts } from "../actions/ProductActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ history }) => {

    const dispatch = useDispatch();

    let keyword = history.location.search;

    useEffect(() => {
        console.log(keyword);
        dispatch(fetchProducts(keyword))
    }, [dispatch, keyword])
    const productList = useSelector(state => state.products);
    const { loading, products, error, pages, page } = productList;


    return (

        <div>
            {
                !keyword && <ProductCarousel />
            }
            { loading ? <Loader /> :
                error ? <Message variant="danger">{error}</Message> : (
                    <div>

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
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
                )
            }
        </div>
    )
}

export default HomeScreen
