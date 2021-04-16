import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import './styles.css';
import axios from 'axios';

const PostForm = ({
    token,
    setPosts,
    posts,
    setAlertMessage
}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);

    const history = useHistory();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault(); 
            const {data: {data: {post}}} = await axios.post('https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/posts',{
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            },{
            headers: {
                Authorization: `Bearer ${token}`
            }});
            setPosts([...posts, post]);
            history.push('/');
            setAlertMessage('Your Post Was Successfully Posted');


        } catch (error) {
            console.log(error.response);
            console.log();
        }
    }

    return (
        <div className='create-post-page'>
            <Card className='create-post-container'>
                <form className='create-post-form' onSubmit={handleSubmit} >
                    <h2>Create A New Post</h2>
                    <div className='create-post-input-container'>
                        <label>Title</label>
                        <input className='create-post-input' onChange={(e) => { setTitle(e.target.value) }}></input>
                    </div>
                    <div className='create-post-input-container'>
                        <label>Description</label>
                        <input className='create-post-input' onChange={(e) => { setDescription(e.target.value) }}></input>
                    </div>
                    <div className='create-post-input-container'>
                        <label>Price</label>
                        <input className='create-post-input' onChange={(e) => { setPrice(e.target.value) }}></input>
                    </div>
                    <div className='create-post-input-container'>
                        <label>Location</label>
                        <input className='create-post-input' onChange={(e) => { setLocation(e.target.value) }}></input>
                    </div>
                    <div className='create-post-input-container'>
                        <label>Will you deliver this item?</label>
                        <input className='create-post-input' type='checkbox' onChange={(e) => { setWillDeliver(e.target.value) }}></input>
                    </div>
                    <Button type='submit'>Submit</Button>
                    <Link to='/'>Return to Homepage</Link>
                </form>
            </Card>
        </div>
    );

}

export default PostForm;