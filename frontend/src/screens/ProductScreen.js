import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { fetchProductDetails, createProductReview } from "../actions/ProductActions";

import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/ProductConstants";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";


const ProductScreen = ({ match, history }) => {

    const id = match.params.id;
    const dispatch = useDispatch();
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState('');

    const { loading, product, error } = useSelector(state => state.selectedProduct);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(state => state.productCreateReview);
    const {
        loading: loadingProductReview,
        success: successProductReview,
        error: errorProductReview
    } = productReviewCreate;




    // addToCard used when press add to card button
    const addToCart = (e) => {
        history.push(`/cart/${id}?qty=${qty}`)
    }


    const submitRaingHandler = (e) => {
        e.preventDefault();
        console.log(rating);
        console.log(comments);
        dispatch(createProductReview(
            id, {
            rating,
            comments
        }
        ))
    }

    useEffect(() => {
        if (successProductReview) {
            setRating(0);
            setComments('');
            dispatch({
                type: PRODUCT_REVIEW_CREATE_RESET
            })
        }
        dispatch(fetchProductDetails(id));
    }, [dispatch, id, successProductReview])



    if (!product) {
        return null;
    }



    return (
        <>
            <Link to="/" className="btn btn-light" >Back to Home</Link>
            {loadingProductReview && <Loader />}
            {   loading ? <Loader /> :
                error ? <Message variant="danger">{error}</Message> :
                    (
                        <div>
                            <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid />
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating value={parseFloat(product.rating)} numOfReviews={parseInt(product.numReviews)} />
                                        </ListGroup.Item>
                                        <ListGroup.Item >
                                            Price:<strong className="p-2">${product.price}</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item >
                                            Description:{product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price</Col>
                                                    <Col>${product.price}</Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status:</Col>
                                                    <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 &&
                                                (<ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty:</Col>
                                                        <Col sm="auto">
                                                            <Form.Control as="select"
                                                                value={qty}
                                                                onChange={(e) => {
                                                                    console.log(e.target);
                                                                    setQty(e.target.value)
                                                                }
                                                                }
                                                            >

                                                                {
                                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>)


                                            }


                                            <ListGroup.Item>
                                                <Button className="btn-block" type="button" disabled={product.countInStock <= 0} onClick={addToCart}>
                                                    Add To Cart
                                                 </Button>
                                            </ListGroup.Item>



                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="py-3">
                                <Col md={6}>
                                    <h4>Reviews</h4>
                                    {
                                        product.reviews && product.reviews.length === 0 && <Message variant="info">No Reviews</Message>
                                    }

                                    <ListGroup variant="flush">
                                        {product.reviews &&
                                            product.reviews.map(review => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{review.name}</strong>
                                                    <Rating value={review.rating} color="#f8e825" />
                                                    <p>{review.createdAt.substr(0, 19).replace('T', ' ')}</p>
                                                    <p>{review.comments}</p>
                                                </ListGroup.Item>

                                            ))
                                        }
                                        <ListGroup.Item>
                                            <h4>Write Review</h4>
                                            {loadingProductReview && <Loader />}
                                            {successProductReview && <Message variant="success">Review submitted</Message>}
                                            {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                                            <Form onSubmit={submitRaingHandler}>
                                                <Form.Group controlId="raing">
                                                    <Form.Label>
                                                        Rating
                                                    </Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}>
                                                        <option value="">Select Rating</option>
                                                        <option value="1">1 -Poor</option>
                                                        <option value="2">2 -Fair</option>
                                                        <option value="3">3 -Good</option>
                                                        <option value="4">4 -Very Good</option>
                                                        <option value="5">5 -Excelent</option>

                                                    </Form.Control>

                                                </Form.Group>

                                                <Form.Group controlId="comment">
                                                    <Form.Label>
                                                        Review
                                                    </Form.Label>
                                                    <Form.Control as="textarea"
                                                        row="5"
                                                        value={comments}
                                                        onChange={(e) => setComments(e.target.value)}
                                                        placeholder="Please enter your review"
                                                    >

                                                    </Form.Control>
                                                </Form.Group>
                                                <Button
                                                    type="Submit"
                                                    disable={loadingProductReview}
                                                    variant="primary"
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        </ListGroup.Item>
                                    </ListGroup>


                                </Col>
                            </Row>
                        </div>
                    )
            }
        </>
    )
}

export default ProductScreen;