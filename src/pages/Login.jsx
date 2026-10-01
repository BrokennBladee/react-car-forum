import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Моля, попълнете всички полета.');
      return;
    }

    if (isRegistering) {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const newUser = await res.json();
        onLogin(newUser);
        navigate('/');
      }
    } else {
      const res = await fetch(`http://localhost:5000/users?username=${username}&password=${password}`);
      const users = await res.json();
      if (users.length > 0) {
        onLogin(users[0]);
        navigate('/');
      } else {
        setError('Грешно потребителско име или парола.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Потребителско име" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ padding: '8px' }}
        />
        <input 
          type="password" 
          placeholder="Парола" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isRegistering ? 'Регистрирай се' : 'Влез'}
        </button>
      </form>
      <button 
        onClick={() => { setIsRegistering(!isRegistering); setError(''); }} 
        style={{ marginTop: '15px', background: 'none', border: 'none', color: '#3498db', cursor: 'pointer' }}
      >
        {isRegistering ? 'Вече имаш акаунт? Влез тук.' : 'Нямаш акаунт? Регистрирай се.'}
      </button>
    </div>
  );
}