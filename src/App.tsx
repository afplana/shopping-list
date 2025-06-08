import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import FastList from './pages/FastList';
import About from './pages/About';
import Privacy from './pages/Privacy';

const App: React.FC = () => (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fast-list" element={<FastList />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  </>
);
export default App;