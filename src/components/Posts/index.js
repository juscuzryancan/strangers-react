import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import './styles.css';
import Button from '@material-ui/core/Button'
import {default as SearchBar} from '../SearchBar'
import {useState} from 'react';
import {useHistory} from 'react-router-dom'

const Post = ({ 
  post: {
    _id,
    title,
    isAuthor,
    price,
    description,
    location,
    willDeliver,
    createdAt,
    updatedAt,
    author: { username }
  },
  token,
  posts,
  setPosts,
  setAlertMessage,
  setUser,
  user
}) => {
  const [isMessageClicked, setIsMessageClicked] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();

  //derived state
  createdAt = new Date(createdAt).toLocaleDateString();
  updatedAt = new Date(updatedAt).toLocaleDateString();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data: {data :{message: messageObject}}} = await axios.post(`https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/posts/${_id}/messages`, {
        message: {
          content: message
        }
      }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      // update the message array within the users state
      setAlertMessage('Your Message Was Successfully Sent');
    } catch (e) {
      console.error(e);
    } finally {
      setMessage("");
      setIsMessageClicked(false);
    }

  }

  const handleDelete = async () => {
    try {
      await axios.delete(`https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/posts/${_id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      let filteredPosts = posts.filter((post) => post._id !== _id);
      setPosts(filteredPosts);
      setAlertMessage('Your Post Was Successfully Deleted');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="post">
      <CardContent>
        <h3>Title: {title}</h3>
        <h4> Price: {price} </h4>
        <div>Description: {description}</div>
        <div>Location: {location}</div>
        <div>Will Deliver: {willDeliver ? "Yes" : "No"}</div>
        <div>Created On: {createdAt}</div>
        <div>Last Updated On: {updatedAt}</div> 
        <div>User: {username}</div>
      </CardContent>
      <CardActions>
        {(token && !isAuthor) && <Button onClick={() => setIsMessageClicked(!isMessageClicked)} className="message-button">{(!isMessageClicked) ? `Message ${username}` : `Hide Message Form`}</Button>}
        {(token && isAuthor) && <Button onClick={() => {history.push(`/editpost/${_id}`)}}>Edit Post</Button>}
        {(token && isAuthor) && <Button onClick={handleDelete}>Delete Post</Button>}
      </CardActions>
      {isMessageClicked && 
        <form onSubmit={handleSubmit} 
          className="message-form">
          <label>Message: </label>
          <textarea onChange={(e) => {setMessage(e.target.value)}} value={message} name="message"></textarea>
          <Button type="submit">Send Message</Button>
        </form>}
    </Card>
  );
}

const Posts = ({
  token, 
  posts,
  setPosts,
  setAlertMessage,
  user,
  setUser
}) => {

  const [searchValue, setSearchValue] = useState('');
  const filteredPosts = posts.filter(({ title, author: { username }, description, location }) => {
    return (
      title.toLowerCase().includes(searchValue.toLowerCase()) ||
        username.toLowerCase().includes(searchValue.toLowerCase()) ||
        description.toLowerCase().includes(searchValue.toLowerCase()) ||
        location.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <div>
      <SearchBar setSearchValue={setSearchValue} />
      <div className="posts">
        {filteredPosts.map((post) => {
          return (
            <Post 
              /*key*/setUser={/*value*/setUser}
              user={user}
              token={token} 
              key={post._id} 
              post={post} 
              posts={posts} 
              setPosts={setPosts} 
              setAlertMessage={setAlertMessage} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
