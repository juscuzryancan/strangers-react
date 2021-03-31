import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import './styles.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Login = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const history = useHistory();

    useEffect(() => {

        return () => {
            setError('');
            setUsername('');
            setPassword('');
        };
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { data: {data: {token}} } = await axios.post('https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/users/login', {
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
            setPassword('');
        }
    }

    return (
        <div className='login-page'>
            <Card className='login-container'>
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Welcome to Strangers' Things</h2>
                    <h3>Please Login</h3>
                    {error && <h3 className='login-error'>{error}</h3>}
                    <input className='login-input' value={username} placeholder="Username" onChange={(e) => { setUsername(e.target.value) }}></input>
                    <input className='login-input' value={password} type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"></input>
                    <Button type='submit'>Login</Button>
                    <Link to='/register'>Not registered? Click Here</Link>
                    <Link to='/'>Return to Homepage</Link>
                </form>
            </Card>
        </div>
    );
}

export default Login;
