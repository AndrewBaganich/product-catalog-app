import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import "./homePage.css";
import StatusMessage from "../../components/StatusMessage/statusMessage";

function HomePage() {
    const { products, loading } = useProducts();
    
    const categories = Array.from(
        new Set(products.map((product) => product.category))
    );
    
    if (loading) {
        return <StatusMessage message="Loading products..." />;
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