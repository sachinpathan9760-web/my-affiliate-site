import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => {
        const item = data[parseInt(id)];
        setProduct(item);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>Loading deal details...</div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>Product not found!</div>;

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
          ← Back to All Deals
        </Link>
        <h1 style={{ fontSize: '1.8rem', color: '#0f172a', margin: '20px 0 10px 0' }}>{product.title}</h1>
        <div style={{ fontSize: '2rem', color: '#2563eb', fontWeight: 'bold', marginBottom: '24px' }}>{product.price}</div>
        
        <a 
          href={product.affiliate_url || product.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{
            display: 'block',
            textAlign: 'center',
            backgroundColor: '#16a34a',
            color: '#fff',
            padding: '14px 20px',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            textDecoration: 'none'
          }}
        >
          Buy Now / View Offer ➔
        </a>
      </div>
    </div>
  );
}
