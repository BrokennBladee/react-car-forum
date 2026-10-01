import { useEffect, useState } from 'react';

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
    if (!title || !content) return;

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

      <form onSubmit={handleCreatePost} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Нова тема</h3>
        <input 
          type="text" 
          placeholder="Заглавие" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <textarea 
          placeholder="Съдържание..." 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          style={{ width: '100%', padding: '8px', height: '80px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#2980b9', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Публикувай
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '6px', background: '#fafafa', color: '#000' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small style={{ color: '#777' }}>Автор: {post.author}</small>
          </div>
        ))}
      </div>
    </div>
  );
}