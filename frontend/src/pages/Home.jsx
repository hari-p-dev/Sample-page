import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [message, setMessage] = useState('Loading...');
  const [error, setError] = useState(null);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch('/api/message')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => setError(err.message));
  }, []);

  // ISSUE 1 (React hooks): fetch runs on EVERY render because there is no
  // dependency array — causes an infinite request loop.
  // ISSUE 2 (error handling): no .catch and res.ok is never checked, so a
  // failed request rejects silently / can crash on .json().
  useEffect(() => {
    fetch('http://localhost:3001/api/products') // ISSUE 3: hardcoded URL bypasses the Vite proxy
      .then((res) => res.json())
      .then((data) => setFeatured(data.products));
  });

  return (
    <section>
      <div className="hero">
        <h1>Welcome to Sample Page</h1>
        <p>
          A full-stack sample built with React (Vite) on the frontend and
          Node.js (Express) on the backend.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" to="/products">
            View Products
          </Link>
          <Link className="btn btn-secondary" to="/contact">
            Get in Touch
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>Live message from the backend</h2>
        {error ? (
          <p className="error">Error: {error}</p>
        ) : (
          <p className="message">{message}</p>
        )}
      </div>

      <div className="feature-grid">
        {/* ISSUE 4 (React key): using array index as key; also no key at all
            on some items would warn — index keys are an anti-pattern here. */}
        {featured.map((product, index) => (
          <div className="feature" key={index}>
            <h3>{product.name}</h3>
            {/* ISSUE 5 (a11y): clickable div with no button semantics,
                no role, not keyboard-accessible. */}
            <div
              className="btn btn-primary"
              onClick={() => alert('Selected ' + product.name)}
            >
              Select
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Home;
