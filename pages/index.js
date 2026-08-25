import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 40px auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '10px' }}>🔥 Top Exclusive Deals</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Best handpicked deals updated in real-time</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#64748b' }}>Loading latest deals...</p>
      ) : (
        /* Product Grid */
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {products.map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              transition: 'transform 0.2s ease',
              border: '1px solid #e2e8f0'
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '12px', lineHeight: '1.4', height: '2.8em', overflow: 'hidden' }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '16px' }}>
                  {item.price}
                </div>
              </div>
              
              <a 
                href={item.affiliate_url || item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{
                  display: 'block',
                  textAlign: 'center',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '0.95rem'
                }}
              >
                Grab Deal ➔
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
