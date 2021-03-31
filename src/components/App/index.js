import './styles.css';
import {default as Posts} from '../Posts';
import {default as Sidebar} from '../Sidebar';
import {default as Login} from '../Login'
import {default as Register} from '../Register';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>

      <Route exact path='/'>
        <div className="App">
          <Sidebar />
          <Posts />
        </div>
      </Route>

      <Route exact path='/login'>
        <Login />
      </Route>

      <Route exact path='/register'>
        <Register />
      </Route>

    </Router>
  );
}


export default App;