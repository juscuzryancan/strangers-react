import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import PostForm from "../PostForm";
import "./styles.css"

const CreatePost = ({
  token,
  setPosts,
  posts,
  setAlertMessage
}) => {
  const history = useHistory();

  const onSubmit = async (post) => {
    try {
      const {data: {data: {post: newPost}}} = await axios.post('https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/posts',{
        post
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts([...posts, newPost]);
      history.push('/');
      setAlertMessage('Your Post Was Successfully Posted');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='create-post-page'>
      <Card className='create-post-container'>
        <h2>Create a Post</h2>
        <PostForm onSubmit={onSubmit}/>
      </Card>
    </div>
  );

}

export default CreatePost;
