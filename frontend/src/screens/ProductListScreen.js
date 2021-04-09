import React, { useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Col, Button } from "react-bootstrap";

import { fetchProducts, deleteProduct } from "../actions/ProductActions";

import Loader from "../components/Loader";
import Message from "../components/Message";



const ProductListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const products = useSelector(state => state.products);
    const { loading, products: productList, error } = products;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;


    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(fetchProducts());
        }
        else {
            history.push('/login');

        }

    }, [dispatch, history, userInfo, successDelete]);


    const deleteHandler = (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.name}`)) {
            dispatch(deleteProduct(product._id));
        }
    }

    return (
        <div>
            <Row>
                <Col className="align-items-center">
                    <h2>Product List</h2>
                </Col>
                <Col className="text-right">
                    <Button className="my-3">
                        <i className="fas fa-plus"></i>Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {
                loading ? <Loader /> :
                    error ? <Message variant="danger">{error}</Message> :
                        (
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>

                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productList.map(product => (
                                            <tr key={product._id}>
                                                <td>{product._id}</td>
                                                <td>{product.name}</td>
                                                <td>${product.price}</td>
                                                <td>{product.category}</td>
                                                <td>{product.brand}</td>
                                                <td>
                                                    <LinkContainer to={`/admin/product/${product._id}/edit`} >
                                                        <Button variant="light" className="btn-sm" >
                                                            <i className="fas fa-edit"></i>
                                                        </Button>
                                                    </LinkContainer>


                                                    <Button variant="danger" className="btn-sm mx-3" onClick={(e) => deleteHandler(product)}>
                                                        <i className="fas fa-trash"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                        )
                                    }
                                </tbody>
                            </Table>
                        )
            }
        </div >
    )
}

export default ProductListScreen
