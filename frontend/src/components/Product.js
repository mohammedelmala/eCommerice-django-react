import React from 'react';

import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded" >

            <LinkContainer to={`/products/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </LinkContainer>

            <Card.Body>
                <LinkContainer to={`/products/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </LinkContainer>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={parseFloat(product.rating)} numOfReviews={parseInt(product.numReviews)} />
                    </div>
                </Card.Text>
                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>


            </Card.Body>


        </Card>
    )
}

export default Product
