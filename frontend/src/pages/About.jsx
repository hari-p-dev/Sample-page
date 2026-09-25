function About() {
  return (
    <section>
      <h1>About</h1>
      <p>
        This is a sample multi-page web application demonstrating a typical
        full-stack setup. It is intended as a starting point you can extend.
      </p>

      <div className="card">
        <h2>Tech stack</h2>
        <ul className="list">
          <li>React 18 with React Router for client-side routing</li>
          <li>Vite for the dev server and production build</li>
          <li>Node.js + Express for the REST API</li>
          <li>ESLint + Prettier for code quality and formatting</li>
          <li>Husky + lint-staged for pre-commit checks</li>
          <li>PR-Agent for automated pull-request reviews</li>
        </ul>
      </div>

      <div className="card">
        <h2>Pages</h2>
        <ul className="list">
          <li>
            <strong>Home</strong> — hero section and a live message from the API
          </li>
          <li>
            <strong>Products</strong> — a catalog fetched from the backend
          </li>
          <li>
            <strong>Contact</strong> — a form that posts to the backend
          </li>
        </ul>
      </div>
    </section>
  );
}

export default About;
