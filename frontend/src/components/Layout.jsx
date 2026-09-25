import { NavLink, Outlet } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/contact', label: 'Contact' },
];

function Layout() {
  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-inner">
          <span className="brand">Sample Page</span>
          <div className="navbar-actions">
            <nav>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    isActive ? 'nav-link active' : 'nav-link'
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Built with React (Vite) + Node.js
          (Express) &middot; Sample project
        </p>
      </footer>
    </div>
  );
}

export default Layout;
