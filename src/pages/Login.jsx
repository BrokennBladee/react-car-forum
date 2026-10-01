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
    setError('');

    if (isRegistering) {
      try {
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
      } catch (err) {
        setError('Грешка при регистрация.');
      }
    } else {
      try {
        // Вземаме всички потребители и филтрираме директно в JS
        const res = await fetch('http://localhost:5000/users');
        const users = await res.json();

        const foundUser = users.find(
          (u) => u.username === username && u.password === password
        );

        if (foundUser) {
          onLogin(foundUser);
          navigate('/');
        } else {
          setError('Грешно потребителско име или парола.');
        }
      } catch (err) {
        setError('Грешка при връзката със сървъра (json-server).');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #444', borderRadius: '8px', textAlign: 'center' }}>
      <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>
      {error && <p style={{ color: '#e74c3c' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Потребителско име" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }}
        />
        <input 
          type="password" 
          placeholder="Парола" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          {isRegistering ? 'Регистрирай се' : 'Влез'}
        </button>
      </form>
      <p style={{ marginTop: '15px', cursor: 'pointer', color: '#3498db' }} onClick={() => { setIsRegistering(!isRegistering); setError(''); }}>
        {isRegistering ? 'Вече имаш акаунт? Влез тук.' : 'Нямаш акаунт? Регистрирай се.'}
      </p>
    </div>
  );
}