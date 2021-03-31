import {useState} from 'react';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';
import './styles.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            const { data } = await axios.post('https://strangers-things.herokuapp.com/api/2006-CPU-RM-WEB-PT/users/register', {
                user: {
                    username,
                    password
                }
            });
            console.log('here');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='register-page'>
            <Card className='register-container'>
                <form className='register-form' onSubmit={handleSubmit} >
                    <h2>Welcome to Strangers' Things</h2>
                    <h3>Please Register</h3>
                    { }
                    <input className='register-input' value={username} placeholder="Username" onChange={(e) => { setUsername(e.target.value) }}></input>
                    <input className='register-input' value={password} placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} ></input>
                    <input className='register-input' value={password} placeholder="Reenter Your Password" type="password" onChange={(e) => { setPassword(e.target.value) }} ></input>
                    <Button type='submit'>Register</Button>
                    <Link to='/login'>Already a user? Click Here</Link>
                    <Link to='/'>Return to Homepage</Link>
                </form>
            </Card>
        </div>
    );
}

export default Register;