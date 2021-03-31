import './styles.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const Sidebar = ({
    token,
    setToken,
    user
}) => {

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setToken('');
    }

    return (
        <nav className="sidebar">
            <h1 className='website-title'><Link to='/'>Strangers' Things</Link></h1>
            {!token  && <Link className="sidebar-link" to='/login'>Login</Link>}
            {!token && <Link className="sidebar-link" to='/register'>Register</Link>}
            {token && <h3>Welcome, {user.username}</h3>}
            {token && <Button>Create A Post</Button>}
            {token && <Button>All Posts</Button>}
            {token && <Button>My Posts</Button>}
            {token && <Button>Messages</Button>}
            {token && <Button onClick={handleSignOut}>Sign Out</Button>}
        </nav>
    )
}

export default Sidebar;