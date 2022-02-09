import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import renderHTML from 'react-render-html';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const SinglePost = (props) => {

    const [post, setPost] = useState('')

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then((response) => setPost(response.data))
            .catch((err) => alert('Error loading single post'));
    }, [])

    const showSinglePost = () => {
        return (
            <>
                <div className="row">
                    <div className="col-md-8 offset-md-2 pt-3 pb-2">
                        <br />
                        <h1>{post.title}</h1>
                        <div className="lead pt-2">{renderHTML(post.content)}</div>
                        <p>
                            Author <span className="badge bg-secondary"> {post.user} </span> Published on{' '} <span className="badge bg-secondary"> {new Date(post.createdAt).toLocaleString()} </span>
                        </p>
                    </div>
                </div>
            </>
        );

    };

    return (
        <>
            <div className="container p-5">
                <Nav />
                {post && showSinglePost()}
            </div>
        </>
    );
}

export default SinglePost;
