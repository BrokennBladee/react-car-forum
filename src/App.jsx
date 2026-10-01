import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import CarDetails from './pages/CarDetails';
import Forum from './pages/Forum';
import PostDetails from './pages/PostDetails';
import Login from './pages/Login';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/car/:id" element={<CarDetails user={user} />} />
        <Route path="/forum" element={<Forum user={user} />} />
        <Route path="/forum/:id" element={<PostDetails user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}