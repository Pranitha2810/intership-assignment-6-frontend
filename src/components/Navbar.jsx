import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <div className="nav-logo">MyProductSite</div>

      <div className="nav-links">
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && (
          <>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

