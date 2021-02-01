import {default as Posts} from './Posts';
import {default as Nav} from './Nav';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css'

const App = () => {
  return (
    <Router>
      <Nav />
      <Route exact path='/'>

      </Route>
      <Route exact path='/posts'>
        <div className="App">
          <Posts />
        </div>
      </Route>
    </Router>
  );
}

export default App;
