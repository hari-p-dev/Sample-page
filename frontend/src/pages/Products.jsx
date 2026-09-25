import { useEffect, useState } from 'react';

function Products() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setStatus('done');
      })
      .catch((err) => {
        setError(err.message);
        setStatus('error');
      });
  }, []);

  return (
    <section>
      <h1>Products</h1>
      <p>Sample catalog loaded from the Express API.</p>

      {status === 'loading' && <p>Loading products...</p>}
      {status === 'error' && <p className="error">Error: {error}</p>}

      {status === 'done' && (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="price">${product.price}/mo</p>
              <p>{product.description}</p>
              <button className="btn btn-primary" type="button">
                Choose {product.name}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
