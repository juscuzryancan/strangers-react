import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@material-ui/core';
import './Posts.css'

const Post = (props) => {
    const { post } = props;

    return (
        <Card>
            <header>{post.title}</header>
            <main>
                <p>Description: {post.description} </p>
                <p>Sold By: {post.author.username}</p>
                <p>Price: {post.price}</p>
            </main>
        </Card>
    );
}

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const handlePosts = async () => {
        const { data: {data} } = await axios.get('http://strangers-things.herokuapp.com/api/2010-CPU-WEB-RM-PT/posts');
        console.log(data);
        setPosts(data.posts);
    }

    useEffect(() => {
        handlePosts();
    }, [])

    return (
        <div className="posts">
            {posts && posts.map((post) => {
                return (
                    <Post key={post._id} post={post}/>
                )
            })}
        </div>
    )
}

export default Posts;