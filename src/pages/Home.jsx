import "../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home-container">

      <section className="hero">
        <h1>Welcome to My Product Platform</h1>
        <p>Browse products, filter, search and add new products easily.</p>

        <Link to="/products">
          <button className="hero-btn">Go to Products</button>
        </Link>
      </section>

      <section className="products-preview">
        <h2>Featured Products</h2>

        <div className="product-grid">
          <div className="product-card floating">
            <img src="https://img.freepik.com/free-psd/smartphone-16-pro-discount-sale-banner-social-media-design-template_47987-25305.jpg?semt=ais_incoming&w=740&q=80" alt="p1" />
            <p>Smartphone</p>
          </div>

          <div className="product-card floating">
            <img src="https://pickurneeds.in/cdn/shop/files/T-40White1.3.jpg?v=1727266386" alt="p2" />
            <p>Headphones</p>
          </div>

          <div className="product-card floating">
            <img src="https://sm.ign.com/ign_in/screenshot/default/o202501071803324499-1_r7c3.jpg" alt="p3" />
            <p>Laptop</p>
          </div>
        </div>
      </section>

    </div>
  );
};
