import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PostDetails({ user }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Вземане на конкретния пост
    fetch(`http://localhost:5000/forumPosts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error(err));

    // Вземане на коментарите за този пост
    fetch(`http://localhost:5000/comments?postId=${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentData = {
      postId: id,
      author: user ? user.username : 'Анонимен',
      content: newComment
    };

    const res = await fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    });

    if (res.ok) {
      const savedComment = await res.json();
      setComments([...comments, savedComment]);
      setNewComment('');
    }
  };

  if (!post) return <div style={{ padding: '30px' }}>Зареждане на темата...</div>;

  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/forum" style={{ color: '#3498db', textDecoration: 'none' }}>← Назад към всички теми</Link>
      
      {/* Публикация */}
      <div style={{ border: '1px solid #444', padding: '20px', borderRadius: '8px', marginTop: '20px', backgroundColor: '#1e1e1e' }}>
        <h1 style={{ marginTop: 0 }}>{post.title}</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{post.content}</p>
        <small style={{ color: '#888' }}>Автор: <strong>{post.author}</strong></small>
      </div>

      {/* Секция за коментари */}
      <h3 style={{ marginTop: '30px' }}>Коментари ({comments.length})</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
        {comments.length === 0 ? (
          <p style={{ color: '#888' }}>Все още няма коментари. Бъди първият!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} style={{ border: '1px solid #333', padding: '12px', borderRadius: '6px', backgroundColor: '#2a2a2a' }}>
              <p style={{ margin: '0 0 8px 0' }}>{comment.content}</p>
              <small style={{ color: '#888' }}>От: <strong>{comment.author}</strong></small>
            </div>
          ))
        )}
      </div>

      {/* Форма за нов коментар */}
      <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <textarea
          placeholder={user ? "Напиши коментар..." : "Влезте в профила си, за да коментирате като регистриран потребител."}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: '#fff', height: '80px', boxSizing: 'border-box' }}
        />
        <button type="submit" style={{ alignSelf: 'flex-start', padding: '8px 16px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Добави коментар
        </button>
      </form>
    </div>
  );
}