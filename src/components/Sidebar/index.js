import './styles.css';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from 'react-router-dom';

// const props = {token, setToken, user, setPosts}

const Sidebar = ({
    token,
    setToken,
    user,
    setPosts
}) => {
    const history = useHistory();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setToken('');
    }

    return (
        <nav className="sidebar">
            <h1 className='website-title'><Link to='/'>Strangers' Things</Link></h1>
            {!token  && <Button onClick={() => history.push('/login')}>Login</Button>}
            {!token  && <Button onClick={() => history.push('/register')}>Register</Button>}
            {token && <h3>Welcome, {user.username}</h3>}
            {token && <Button onClick={() => history.push('/createpost')}>Create A Post</Button>}
            {token && <Button onClick={() => console.log()}>All Posts</Button>}
            {token && <Button onClick={() => console.log()}>My Posts</Button>}
            {token && <Button onClick={() => history.push('/messages')}>Messages</Button>}
            {token && <Button onClick={handleSignOut}>Sign Out</Button>}
        </nav>
    )
}

export default Sidebar;