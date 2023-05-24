import {useState, useEffect} from 'react';
import './styles.css';
import Posts from '../Posts';
import Sidebar from '../Sidebar';
import Login from '../Login'
import Register from '../Register';
import CreatePost from '../CreatePost';
import EditPost from '../EditPost';
import Messages from '../Messages';
import AlertMessage from '../AlertMessage';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import axios from 'axios';


const fetchPosts = async (token) => {
  const { data: {data} } = await axios.get('https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/posts', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return data;
}


const App = () => {
  const [token, setToken] = useState(() => {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token')
    } else {
      return ''
    }
  });
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');


  const handleUser = async () => {
    try {
      const { data: {data} } = await axios.get('https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/users/me', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts(token).then(({posts}) => {
      setPosts([...posts]);
    })
  }, [token]);

  useEffect(() => {
    if(token){
      handleUser();
    } else {
      setUser({})
    }
  }, [token]);

  return (
    <Router>

      <Route exact path='/'>
        <div className="App">
          <Sidebar user={user} token={token} setToken={setToken}/>
          <Posts setUser={setUser} user={user} setAlertMessage={setAlertMessage} posts={posts} setPosts={setPosts} token={token} />
          <AlertMessage setAlertMessage={setAlertMessage} alertMessage={alertMessage} />
        </div>
      </Route>

      <Route exact path='/login'>
        <Login setToken={setToken} setAlertMessage={setAlertMessage}/>
      </Route>

      <Route exact path='/register'>
        <Register setToken={setToken}/>
      </Route>

      <Route exact path='/createpost'>
        <CreatePost setAlertMessage={setAlertMessage} posts={posts} setPosts={setPosts} token={token}/>
      </Route>

      <Route exact path='/editpost/:postid'>
        <EditPost posts={posts} token={token} setPosts={setPosts} setAlertMessage={setAlertMessage}/>
      </Route>

      <Route exact path='/messages'>
        <Messages handleUser={handleUser} user={user} messages={user.messages}/> 
      </Route>

    </Router>
  );
}


export default App;
