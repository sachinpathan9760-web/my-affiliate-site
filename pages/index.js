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

  const filteredProducts = products.filter((item) =>
    item.title ? item.title.toLowerCase().includes(searchTerm.toLowerCase()) : false
  );

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto 30px auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '10px' }}>🔥 Top Exclusive Deals</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '24px' }}>Handpicked Amazon deals with real product previews</p>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Search deals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 20px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
          />
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#64748b' }}>Loading latest deals...</p>
      ) : (
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {filteredProducts.map((item, index) => (
            <div key={index} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #e2e8f0' }}>
              <div>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }}
                  />
                )}
                <Link href={`/product/${index}`} style={{ textDecoration: 'none' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '8px', lineHeight: '1.4', height: '2.8em', overflow: 'hidden' }}>
                    {item.title}
                  </h3>
                </Link>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '14px' }}>{item.price}</div>
              </div>
              
              <a 
                href={item.affiliate_url || item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ display: 'block', textAlign: 'center', backgroundColor: '#2563eb', color: '#ffffff', padding: '10px 16px', borderRadius: '6px', fontWeight: '600', textDecoration: 'none' }}
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
