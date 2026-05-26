
import type { ProductCardProps } from "../../types/product";
import "./ProductCard.css";


function ProductCard({ product,favoriteIds,compareIds,toggleFavorite,toggleCompare,}: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">

        <div className="product-actions">

          <button
            type="button"
            className="compare-icon"
            onClick={() => toggleCompare(product.id)}
          >
            <img
              src={
                compareIds.includes(product.id)
                  ? "./compareFilled.png"
                  : "./compareOutline.png"
              }
              alt="Compare icon"
              className="compare-icon-image"
            />
          </button>

          <button
            type="button"
            className="favorite-icon"
            onClick={() => toggleFavorite(product.id)}
          >
            <img
              src={
                favoriteIds.includes(product.id)
                  ? "./heart-filled.png"
                  : "./heart-outline.png"
              }
              alt="Favorite icon"
              className="favorite-icon-image"
            />
          </button>
        </div>

        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-content">
        <h2 className="product-title">
          {product.title}
        </h2>

        {product.brand && (
          <p className="product-text">
            <strong>Brand:</strong> {product.brand}
          </p>
        )}

        <p className="product-text">
          <strong>Category:</strong> {product.category}
        </p>

        <div className="price-row">
          {product.discountPercentage > 0 && (
            <span className="old-price">
              $
              {Math.round(
                product.price /
                (1 - product.discountPercentage / 100)
              )}
            </span>
          )}

          <span className="product-price">
            ${product.price}
          </span>
        </div>

        <p className="product-text">
          Discount: {product.discountPercentage}%
        </p>

        <p className="product-text">
          Rating: ⭐ {product.rating}
        </p>

        <p
          className={
            product.stock > 0
              ? "stock-status in-stock"
              : "stock-status out-stock"
          }
        >
          {product.stock > 0
            ? "In stock"
            : "Out of stock"}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;