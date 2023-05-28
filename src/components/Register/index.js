import {useState, useEffect} from 'react';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import './styles.css';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';

const Register = ({setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifiedPassword, setVerifiedPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(() => {
    return () => {
      setError('');
      setUsername('');
      setPassword('');
    };
  }, [])

  //todo error handling
  const handleSubmit = async (e) => {
    try{
      e.preventDefault();

      if(password !== verifiedPassword){
        setError('Reentered password does not match');
        return;
      }

      const { data: {data: {token}} } = await axios.post('https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/users/register', {
        user: {
          username,
          password
        }
      });
      setToken(token);
      localStorage.setItem('token', token);
      history.push('/');
    } catch ({response: {data: {error: {name, message}}}}) {
      setError(message);
    }
  }

  return (
    <div className='register-page'>
      <Card className='register-container'>
        <form className='register-form' onSubmit={handleSubmit} >
          <h2>Welcome to Strangers' Things</h2>
          <h3>Please Register</h3>
          {error && <div className='register-error'>{error}</div>}
          <input className='register-input' value={username} placeholder="Username" onChange={(e) => { setUsername(e.target.value) }}></input>
          <input className='register-input' value={password} placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} ></input>
          <input className='register-input' value={verifiedPassword} placeholder="Reenter Your Password" type="password" onChange={(e) => { setVerifiedPassword(e.target.value) }} ></input>
          <Button type='submit'>Register</Button>
          <Link to='/login'>Already a user? Click Here</Link>
          <Link to='/'>Return to Homepage</Link>
        </form>
      </Card>
    </div>
  );
}

export default Register;
