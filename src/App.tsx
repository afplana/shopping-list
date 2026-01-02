import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import FastList from './pages/FastList';
import About from './pages/About';
import Privacy from './pages/Privacy';
import { I18nProvider } from './i18n';

const App: React.FC = () => (
  <I18nProvider>
    <NavBar />
    <Routes>
      <Route path="/" element={<FastList />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<FastList />} />
    </Routes>
  </I18nProvider>
);
export default App;
