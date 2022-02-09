import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { link, withRouter } from 'react-router-dom';
import Nav from './Nav';
import { authenticate, getUser } from './Helpers';

const Login = (props) => {

    // create a state
    const [state, setState] = useState({
        name: '',
        password: ''
    })

    const { name, password } = state; // destructure values from state

    useEffect(() => {
        getUser() && props.history.push('/');
    }, [])

    // onChange event handler
    const handleChange = (field) => (event) => {
        // console.log(name);
        setState({ ...state, [field]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.table({ name, password });


        axios
            .post(`${process.env.REACT_APP_API}/login`, { name, password })
            .then((response) => {
                console.log(response);
                // response will contain token and name
                authenticate(response, () => { props.history.push('/create') });
                // redirect to creat page

            })
            .catch((error) => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <>
            <div className="container p-5">
                <Nav />
                <br />
                <h1>LOG IN</h1>

                <br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <label className="text-muted mb-2">Name</label>
                        <input
                            onChange={handleChange('name')}
                            value={name}
                            type="text"
                            className="form-control mb-2"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="form-group mb-2">
                        <label className="text-muted mb-2">Password</label>
                        <input
                            onChange={handleChange('password')}
                            value={password}
                            type="password"
                            className="form-control mb-3"
                            placeholder="Your Password"
                            required
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary mb-2">Login</button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default withRouter(Login);