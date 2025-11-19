import { Link } from "react-router-dom";
import '../styles/navbar.css';

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <div className="nav-logo">MyProductSite</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>
    </nav>
  );
};
