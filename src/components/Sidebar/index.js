import './styles.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const Sidebar = ({
    token
}) => {

    return (
        <nav className="sidebar">
            <h1 className='website-title'><Link to='/'>Strangers' Things</Link></h1>
            <Link className="sidebar-link" to='/login'>Login</Link>
            <Link className="sidebar-link" to='/register'>Register</Link>
        </nav>
    )
}

export default Sidebar;