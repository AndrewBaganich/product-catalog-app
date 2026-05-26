import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import "./HomePage.css";

function HomePage() {
  const { products, loading } = useProducts();

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  if (loading) {
    return <p className="status-message">Loading categories...</p>;
  }

  return (
    <section className="home-page">
      <h1 className="home-title">Shop by Category</h1>

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/products?category=${category}`}
            className="category-card"
          >
            {category}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default HomePage;