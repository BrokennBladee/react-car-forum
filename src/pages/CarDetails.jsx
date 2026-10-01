import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CarDetails({ user }) {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${id}`)
      .then((res) => res.json())
      .then((data) => setCar(data))
      .catch((err) => console.error('Грешка при зареждането:', err));
  }, [id]);

  if (!car) return <div style={{ padding: '30px' }}>Зареждане...</div>;

  const toggleExtra = (extra) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, extra) => sum + extra.price, 0);
  const totalPrice = car.price + extrasTotal;

  return (
    <div style={{ padding: '30px', maxWidth: '850px', margin: '0 auto' }}>
      <h1>{car.name}</h1>
      <img
        src={car.image}
        alt={car.name}
        style={{ width: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'cover' }}
      />
      <p style={{ marginTop: '15px', fontSize: '1.1rem' }}>{car.description}</p>

      <h3>Избор на екстри (Конфигуратор):</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {car.extras?.map((extra) => {
          const isSelected = selectedExtras.some((e) => e.id === extra.id);
          return (
            <label
              key={extra.id}
              style={{
                padding: '12px 15px',
                border: isSelected ? '2px solid #2ecc71' : '1px solid #444',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                backgroundColor: isSelected ? '#1b382b' : '#222',
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleExtra(extra)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                {extra.image && (
                  <img
                    src={extra.image}
                    alt={extra.name}
                    style={{
                      width: '70px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />
                )}
                <span style={{ fontSize: '1.05rem', fontWeight: '500' }}>{extra.name}</span>
              </div>
              <strong style={{ color: '#2ecc71', fontSize: '1.1rem' }}>
                +{extra.price.toLocaleString()} €
              </strong>
            </label>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '8px'
        }}
      >
        <h2>Крайна цена: {totalPrice.toLocaleString()} €</h2>
        <p style={{ color: '#aaa' }}>
          Базова цена: {car.price.toLocaleString()} € + Екстри: {extrasTotal.toLocaleString()} €
        </p>
        {user ? (
          <button
            onClick={() => alert('Конфигурацията е запазена!')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2ecc71',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Запази конфигурацията
          </button>
        ) : (
          <p style={{ color: '#e74c3c' }}>Влезте в профила си, за да запазите тази конфигурация.</p>
        )}
      </div>
    </div>
  );
}