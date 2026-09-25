import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [message, setMessage] = useState('Loading...');
  const [error, setError] = useState(null);

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
        <div className="feature">
          <h3>Fast</h3>
          <p>Vite-powered dev server with instant hot module replacement.</p>
        </div>
        <div className="feature">
          <h3>Full-stack</h3>
          <p>React frontend talking to an Express REST API.</p>
        </div>
        <div className="feature">
          <h3>Quality-checked</h3>
          <p>ESLint, Prettier, Husky, and PR-Agent wired in from day one.</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
