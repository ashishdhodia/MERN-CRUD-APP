import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { getUser, logout } from './Helpers';

const Nav = (props) => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-primary bg-light fw-bold rounded-3">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item navbar-brand fs-4">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li class="nav-item navbar-brand fs-4">
                                <Link to="/create" className="nav-link">Create</Link>
                            </li>
                        </ul>

                        {!getUser() && (
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item navbar-brand fs-4">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                            </ul>
                        )}

                        {getUser() && (
                            <ul onClick={() => logout(() => { props.history.push('/') })} class="navbar-nav ms-auto">
                                <li class="nav-item navbar-brand fs-4">
                                <Link className="nav-link">Logout</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );

};

export default withRouter(Nav);