import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // API se Scraped Data fetch kar rahe hain
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Deals & Affiliate Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{item.title}</h3>
            <p><strong>Price:</strong> {item.price}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'none' }}>
              Buy Now / View Deal
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
