import {useState, useEffect} from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import './styles.css';
import Button from '@material-ui/core/Button'

const fetchPosts = async () => {
    const { data: {data} } = await axios.get('https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/posts');
    return data;
}

const Post = ({ 
    post: {
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
    token
}) => {

    createdAt = new Date(createdAt).toLocaleDateString();
    updatedAt = new Date(updatedAt).toLocaleDateString();

    return(

        <Card className="post">
            <CardContent>
            {/* <h3> Title: ${title}${(isAuthor && isLoggedIn()) 
            ? `<img src="more.svg" id='more-image'>
            <div class='more-menu'>
                <button id='edit'>Edit</button>
                <button id='delete'>Delete</button>
            </div>` : ''}</h3>  */}
            <h3>Title: {title}</h3>
            <h4> Price: {price} </h4>
            <div>Description: {description}</div>
            <div>Location: {location}</div>
            <div>Will Deliver: {willDeliver ? "Yes" : "No"}</div>
            <div>Created On: {createdAt}</div>
            <div>Last Updated On: {updatedAt}</div> 
            <div>User: {username}</div>
            {/* <footer>User: {username} {(!isAuthor && isLoggedIn()) ?  `<img src="message.svg" id='message-image'>`: ''} </footer> */}
            </CardContent>
            <CardActions>
                {token && <Button>Im a button</Button>}
            </CardActions>
        </Card>
    );
}

const Posts = ({token}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts().then(({posts}) => {
            setPosts([...posts]);
        })

    }, []);


    return (

        <div className="posts">
            {posts.map((post) => {
                return (
                    <Post token={token} key={post._id} post={post} />
                );
            })}
        </div>
    );
}

export default Posts;