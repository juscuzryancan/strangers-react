import {useState, useEffect} from 'react';
import './styles.css';
import {default as Posts} from '../Posts';
import {default as Sidebar} from '../Sidebar';
import {default as Login} from '../Login'
import {default as Register} from '../Register';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import axios from 'axios';


const App = () => {
  const [token, setToken] = useState(() => {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token')
    } else {
      return ''
    }
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    if(token){
     (async ()=> {
       try {
         const { data: {data} } = await axios.get('https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/users/me', {
           headers: {
             "Authorization": `Bearer ${token}`
           }
         });
         setUser(data);
       } catch (error) {
        console.error();
       }
       
     })();
    } else {
      setUser({})
    }
  }, [token]);

  return (
    <Router>

      <Route exact path='/'>
        <div className="App">
          <Sidebar user={user} token={token} setToken={setToken}/>
          <Posts token={token} />
        </div>
      </Route>

      <Route exact path='/login'>
        <Login setToken={setToken}/>
      </Route>

      <Route exact path='/register'>
        <Register setToken={setToken}/>
      </Route>

    </Router>
  );
}


export default App;