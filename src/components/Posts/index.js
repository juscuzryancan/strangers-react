import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import './styles.css';
import Button from '@material-ui/core/Button'
import {default as SearchBar} from '../SearchBar'

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
    setAlertMessage
}) => {

    //derived state
    createdAt = new Date(createdAt).toLocaleDateString();
    updatedAt = new Date(updatedAt).toLocaleDateString();

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
                {(token && !isAuthor) && <Button className="message-button">Message {username}</Button>}
                {(token && isAuthor) && <Button>Edit Post</Button>}
                {(token && isAuthor) && <Button onClick={handleDelete}>Delete Post</Button>}
            </CardActions>
        </Card>
    );
}

const Posts = ({
    token, 
    posts,
    setPosts,
    setAlertMessage
}) => {


    return (
        <div>
            <SearchBar posts={posts} setPosts={setPosts} />
            <div className="posts">
                {posts.map((post) => {
                    return (
                        <Post 
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