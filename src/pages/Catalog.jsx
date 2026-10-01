import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/cars')
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error('Грешка при зареждането на колите:', err));
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>Налични автомобили</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {cars.map((car) => (
          <div key={car.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <img src={car.image} alt={car.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <h3>{car.name}</h3>
              <p>{car.description}</p>
              <p><strong>Базова цена:</strong> {car.price?.toLocaleString()} €</p>
              <Link to={`/car/${car.id}`} style={{ display: 'inline-block', padding: '8px 16px', background: '#e67e22', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
                Конфигурирай
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}