import { useState } from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import './styles.css';
import axios from 'axios';
import PostForm from '../PostForm';

const EditForm = ({
  token,
  setPosts,
  posts,
  setAlertMessage,
}) => {
  const {postid: id} = useParams();
  const post = posts.find(post => post._id === id);

  const history = useHistory();

  const onSubmit = async (post) => {
    try {
      const {data: {data: {post: newPost}}} = await axios.patch(`https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/posts/${post._id}`,{
        post
      },{
          headers: {
            Authorization: `Bearer ${token}`
          }});
      const filteredPosts = posts.filter(p => p._id !== id);
      setPosts([...filteredPosts, newPost]);
      history.push('/');
      setAlertMessage('Your Post Was Successfully Edited');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='edit-post-page'>
      <Card className='edit-post-container'>
        <h2>Edit your Post</h2>
        <PostForm post={post} onSubmit={onSubmit}/>
      </Card>
    </div>
  );
}

export default EditForm;
