import { useEffect, useState } from 'react';

function App() {
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
    <main className="container">
      <h1>Sample Page</h1>
      <p>A full-stack sample built with React (Vite) and Node.js (Express).</p>
      <div className="card">
        <h2>Message from the backend:</h2>
        {error ? (
          <p className="error">Error: {error}</p>
        ) : (
          <p className="message">{message}</p>
        )}
      </div>
    </main>
  );
}

export default App;
