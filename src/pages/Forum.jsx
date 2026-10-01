import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Forum({ user }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/forumPosts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Грешка при зареждането на форума:', err));
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      author: user ? user.username : 'Анонимен',
      title,
      content
    };

    const res = await fetch('http://localhost:5000/forumPosts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });

    if (res.ok) {
      const createdPost = await res.json();
      setPosts([createdPost, ...posts]);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Форум за автоманиаци</h1>

      <form onSubmit={handleCreatePost} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #444', borderRadius: '8px', backgroundColor: '#1e1e1e' }}>
        <h3>Нова тема</h3>
        <input 
          type="text" 
          placeholder="Заглавие на темата" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: '#fff', boxSizing: 'border-box' }}
        />
        <textarea 
          placeholder="Съдържание..." 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          style={{ width: '100%', padding: '10px', height: '100px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: '#fff', boxSizing: 'border-box' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Публикувай тема
        </button>
      </form>

      <h3>Всички теми</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #333', padding: '15px', borderRadius: '8px', backgroundColor: '#2a2a2a' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>
              <Link to={`/forum/${post.id}`} style={{ color: '#3498db', textDecoration: 'none' }}>
                {post.title}
              </Link>
            </h3>
            <p style={{ color: '#ccc', margin: '0 0 10px 0' }}>
              {post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <small style={{ color: '#888' }}>Автор: {post.author}</small>
              <Link to={`/forum/${post.id}`} style={{ color: '#2ecc71', fontSize: '0.9rem', textDecoration: 'none' }}>
                Виж темата и коментарите →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}