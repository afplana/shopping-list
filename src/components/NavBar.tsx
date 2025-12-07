import { Link } from 'react-router-dom';

const NavBar: React.FC = () => (
    <nav className="top-nav">
        <div className="nav-links">
            <Link to="/">List</Link>
            <Link to="/home">Info</Link>
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy Policy</Link>
        </div>
    </nav>
);
export default NavBar;
