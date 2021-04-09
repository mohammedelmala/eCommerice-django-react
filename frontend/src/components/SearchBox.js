import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const SearchBox = () => {

    const history = useHistory();
    const [keyword, setKweyord] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(keyword);
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        }
        else {
            history.push(history.location.pathname)
        }
    }

    return (
        <Form inline onSubmit={submitHandler}>
            <Form.Group controlId="search">
                <Form.Control
                    type="text"
                    placeholder=""
                    className="mr-sm-2 ml-sm-5"
                    name="q"
                    onChange={e => setKweyord(e.target.value)}
                >

                </Form.Control>

                <Button
                    type="submit"
                    variant="outline-success"
                    className="p-2"
                >
                    Submit
                </Button>
            </Form.Group>
        </Form>
    )
}

export default SearchBox;
