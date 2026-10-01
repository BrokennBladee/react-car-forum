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
    <div style={{ padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{car.name}</h1>
      <img src={car.image} alt={car.name} style={{ width: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'cover' }} />
      <p style={{ marginTop: '15px' }}>{car.description}</p>
      
      <h3>Избор на екстри (Конфигуратор):</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {car.extras?.map((extra) => {
          const isSelected = selectedExtras.some((e) => e.id === extra.id);
          return (
            <label key={extra.id} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span>
                <input 
                  type="checkbox" 
                  checked={isSelected} 
                  onChange={() => toggleExtra(extra)}
                  style={{ marginRight: '10px' }}
                />
                {extra.name}
              </span>
              <strong>+{extra.price.toLocaleString()} €</strong>
            </label>
          );
        })}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px', color: '#000' }}>
        <h2>Крайна цена: {totalPrice.toLocaleString()} €</h2>
        <p>Базова цена: {car.price.toLocaleString()} € + Екстри: {extrasTotal.toLocaleString()} €</p>
        {user ? (
          <button onClick={() => alert('Конфигурацията е запазена!')} style={{ padding: '10px 20px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Запази конфигурацията
          </button>
        ) : (
          <p style={{ color: '#e74c3c' }}>Влезте в профила си, за да запазите тази конфигурация.</p>
        )}
      </div>
    </div>
  );
}