import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";

import axios from "axios";

import { fetchProductDetails, updateProduct } from "../actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../constants/ProductConstants";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";




const ProductEditScreen = ({ history, match }) => {

    const productId = match.params.id;
    const [name, setName] = useState('');
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch();

    const selectedProduct = useSelector(state => state.selectedProduct);
    const { loading, product, success, error } = selectedProduct;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate, product: productUpdated } = productUpdate;

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;





    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: PRODUCT_UPDATE_RESET
            })

            history.push('/admin/productlist')
        }
        else {
            if (!product || product._id != Number(productId)) {
                dispatch(fetchProductDetails(productId));
            }
            else {
                setName(product.name);
                setImage(product.image);
                setPrice(product.price);
                setBrand(product.brand);
                setCountInStock(product.countInStock);
                setCategory(product.category);
                setDescription(product.description);
            }
        }


        return () => {

        }

    }, [product, productId, dispatch, successUpdate])


    // handle back button
    const backHandler = (e) => {
        e.preventDefault();
        history.push("/admin/productlist");
    }


    //handle on submit button
    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateProduct({
            _id: productId,
            name,
            image,
            price,
            brand,
            countInStock,
            category,
            description
        }));
    }

    const [uploading, setUploading] = useState(false);

    const uploadFileHandler = async (e) => {
        setUploading(true);

        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("image", file);
            formData.append("product_id", productId);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.post("/api/products/upload/image/",
                formData,
                config);

            setImage(data);
            setUploading(false)

            console.log(file);


        } catch (error) {
            setUploading(false);
            console.log("ERROR >>>>>>>>>>>>>>>>>>>>>");
            console.log(error);
        }
    }


    return (
        <div>
            <h2>Edit Product {productId}</h2>
            <Button variant="light" onClick={backHandler}>
                Go Back
            </Button>
            <FormContainer>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controllid="name">
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Plase enter product name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controllid="price">
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Please enter price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controllid="image">
                        <Form.Label>
                            Image
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Please enter image"
                            value={image}
                            onChange={e => setImage(e.target.value)}
                        />
                        <Form.File
                            id="fileUpload"
                            label="Choose File"
                            custom
                            onChange={uploadFileHandler}
                        >

                        </Form.File>
                        {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controllid="brand">
                        <Form.Label>
                            Brand
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Please enter brand"
                            value={brand}
                            onChange={e => setBrand(e.target.value)}

                        />
                    </Form.Group>

                    <Form.Group controllid="countInStock">
                        <Form.Label>
                            Count In Stock
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Please enter count in stock"
                            value={countInStock}
                            onChange={e => setCountInStock(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controllid="category">
                        <Form.Label>
                            Category
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Please enter category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group controllid="description">
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control
                            type="description"
                            placeholder="Please enter description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />

                    </Form.Group>


                    <Button type="submit" variant="primary">
                        Save
                    </Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default ProductEditScreen
