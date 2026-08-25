import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  // Search ke basis par products filter karne ke liye
  const filteredProducts = products.filter((item) =>
    item.title ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : false
  );

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 30px auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '10px' }}>🔥 Top Exclusive Deals</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '24px' }}>
          Best handpicked deals updated in real-time
        </p>

        {/* Real-time Search Box */}
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Search deals or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Loading State & Product Count */}
      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#64748b' }}>Loading latest deals...</p>
      ) : (
        <>
          <div style={{ maxWidth: '1200px', margin: '0 auto 16px auto', color: '#64748b', fontSize: '0.95rem' }}>
            Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> deals
          </div>

          {/* Product Grid */}
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <div key={index} style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    {/* Dynamic Detail Page Link Added Here */}
                    <Link href={`/product/${index}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '12px', lineHeight: '1.4', height: '2.8em', overflow: 'hidden', cursor: 'pointer' }}>
                        {item.title}
                      </h3>
                    </Link>
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
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#94a3b8', fontSize: '1.1rem', marginTop: '20px' }}>
                No deals found matching "{searchTerm}"
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
