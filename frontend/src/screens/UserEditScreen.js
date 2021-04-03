import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { getDetails, updateUser } from "../actions/UserActions";
import { USER_UPDATE_RESET, USER_DETAILS_RESET } from "../constants/UserConstants";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";


const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const userDetails = useSelector(state => state.userDetails)
    const { loading, user, error } = userDetails;
    const dispatch = useDispatch()

    const userUpdate = useSelector(state => state.userUpdate)

    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdate;




    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch({ type: USER_DETAILS_RESET });
            history.push("/admin/userlist")
        }
        else {
            if (!user.name || Number(userId) !== user.id) {
                dispatch(getDetails(userId))
            }
            else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }


    }, [user, userId, user.id, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            id: user.id,
            username: email,
            name,
            email,
            isAdmin
        }))
        console.log(`Edit user ${userId} ${name} ${email} ${isAdmin}`);
    }

    const backHandler = (e) => {
        console.log("Back");
        dispatch({
            type: USER_UPDATE_RESET
        })
        history.push("/admin/userlist")
    }

    return (
        <div>
            {/* to="/admin/userlist/" */}
            <Link onClick={backHandler}>
                Go Back
            </Link>

            <FormContainer>
                <h2>Edit User {userId}</h2>
                {
                    loadingUpdate ? <Loader /> :
                        errorUpdate ? <Message variant="danger">errorUpdate</Message> :
                            loading ? <Loader /> :
                                error ? <Message variant="danger">error</Message> : (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text"
                                                placeholder="Please enter name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email"
                                                placeholder="Please enter email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId="isAdmin">
                                            <Form.Check type="checkbox"
                                                label="Is Admin"
                                                checked={isAdmin}
                                                onChange={(e) => setIsAdmin(e.target.checked)}
                                            />
                                        </Form.Group>
                                        <Button type="submit" variant="primary">
                                            Update
                                        </Button>
                                    </Form>
                                )

                }

            </FormContainer >
        </div >
    )
}

export default UserEditScreen
