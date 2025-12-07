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
      <Route path="/" element={<FastList />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<FastList />} />
    </Routes>
  </>
);
export default App;
