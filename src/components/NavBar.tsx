import { Link } from 'react-router-dom';

const NavBar: React.FC = () => (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/fast-list" style={{ marginRight: '1rem' }}>List App</Link>
        <Link to="/about" style={{ marginRight: '1rem' }}>About</Link>
        <Link to="/privacy">Privacy Policy</Link>
    </nav>
);
export default NavBar;