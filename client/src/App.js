import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { getUser, getToken } from './Helpers';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const [posts, setPosts] = useState([])

  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then((response) => {
        // console.log(response)
        setPosts(response.data)
      })
      .catch((error) => alert("Error fetching posts"));
  };


  useEffect(() => {
    fetchPosts()
  }, []);

  const deleteConfirm = (slug) => {
    let answer = window.confirm('Are you sure you want to delete this post?')
    if (answer) {
      deletePost(slug)
    }
  };

  const deletePost = (slug) => {
    // console.log('deleted');
    axios
      .delete(`${process.env.REACT_APP_API}/post/${slug}`, { headers: { authorization: `Bearer ${getToken()}` }})
      .then((response) => {
        // alert(response.data.message)
        fetchPosts()
      })
      .catch(error => {
        alert('Error deleting post')
      });
  };

  return (
    <>
      <div className="container p-5">
        <Nav />
        <hr />
        <h1>MERN CRUD</h1>
        <hr />

        {posts.map((post, i) => {
          return (
            <div className="row" key={post._id} style={{ borderBottom: '1px solid silver' }}>
              <div className="col pt-3 pb-3">
                <div className="row">
                  <div className="col-md-10">
                    <Link to={`/post/${post.slug}`}>
                      <h2>{post.title}</h2>
                    </Link>
                    <div className="lead pt-2">
                      {renderHTML(post.content.substring(0, 100))}
                    </div>
                    <p>
                      Author <span className="badge bg-secondary"> {post.user} </span> Published on{' '} <span className="badge bg-secondary"> {new Date(post.createdAt).toLocaleString()} </span>
                    </p>
                  </div>

                  {getUser() && (
                    <div className="col-md-2">
                      <Link to={`/post/update/${post.slug}`} className="btn btn-sm btn-outline-warning m-1">
                        Update
                      </Link>
                      <button
                        onClick={() => deleteConfirm(post.slug)}
                        className="btn btn-sm btn-outline-danger m-1">
                        Delete
                      </button>
                    </div>
                  )}


                </div>
              </div>
            </div>
          )
        })}

      </div>
    </>
  );
}

export default App;
