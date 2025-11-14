import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ isAuthenticated, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Nombre */}
        <Link to="/" className="navbar-brand">
          Mi app
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarSupportedContent"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarSupportedContent"
        >
            {/* si esta autenticado */}
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0 align-items-center">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tasks" className="nav-link">
                    Tasks
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    onClick={onLogout}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
               {/* si no esta autenticado */}
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};