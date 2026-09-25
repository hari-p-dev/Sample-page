import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="notfound">
      <h1>404</h1>
      <p>Sorry, that page does not exist.</p>
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
