import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav style={{ padding: '15px 30px', background: '#1a1a1a', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>AutoDealer</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Каталог</Link>
        <Link to="/forum" style={{ color: '#fff', textDecoration: 'none' }}>Форум</Link>
        {user ? (
          <>
            <span>Здравей, <strong>{user.username}</strong>!</span>
            <button onClick={onLogout} style={{ padding: '6px 12px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Изход</button>
          </>
        ) : (
          <Link to="/login" style={{ padding: '6px 12px', background: '#3498db', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>Вход / Регистрация</Link>
        )}
      </div>
    </nav>
  );
}