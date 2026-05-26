import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import useProducts from "../../hooks/useProducts";
import "./comparePage.css";
import StatusMessage from "../../components/StatusMessage/statusMessage";

function ComparePage() {
    const { products, loading, error } = useProducts();
    const [compareProducts, setCompareProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        const savedCompareIds: number[] = JSON.parse(localStorage.getItem("compareProducts") || "[]");
        const filteredCompareProducts = products.filter((product) =>savedCompareIds.includes(product.id));
        setCompareProducts(filteredCompareProducts);
  }, [products]);
    

    if (loading) {
        return <StatusMessage message="Loading products..." />;
    }

    if (error) {
        return <StatusMessage message={error} isError />;
    }


    function removeCompare(productId: number) {
        const updatedProducts = compareProducts.filter(
            (product) => product.id !== productId
        );

        setCompareProducts(updatedProducts);

        const updatedIds = updatedProducts.map((product) => product.id);

        localStorage.setItem("compareProducts",JSON.stringify(updatedIds));
    }

  return (
    <section className="compare-page">
        <h1 className="compare-title">Compare Products</h1>
        
        {compareProducts.length === 0 
        ? (
            <p className="empty-message"> Your compare list is empty.</p>) 
        : (
            <div className="compare-table-wrapper">
                <table className="compare-table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            {compareProducts.map((product) => (
                            <th key={product.id}>{product.title}</th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Image</td>

                            {compareProducts.map((product) => (
                                <td key={product.id}>
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="compare-product-image"
                                />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td>Price</td>
                            {compareProducts.map((product) => (
                            <td key={product.id}>${product.price}</td>
                            ))}
                        </tr>

                        <tr>
                            <td>Rating</td>
                            {compareProducts.map((product) => (
                            <td key={product.id}>⭐ {product.rating}</td>
                            ))}
                        </tr>

                        <tr>
                            <td>Stock</td>
                            {compareProducts.map((product) => (
                            <td key={product.id}>
                                {product.stock > 0 ? "In stock" : "Out of stock"}
                            </td>
                            ))}
                        </tr>

                        <tr>
                            <td>Category</td>
                            {compareProducts.map((product) => (
                            <td key={product.id}>{product.category}</td>
                            ))}
                        </tr>

                        <tr>
                            <td>Discount</td>
                            {compareProducts.map((product) => (
                            <td key={product.id}>
                                {product.discountPercentage}%
                            </td>
                            ))}
                        </tr>

                        <tr>
                            <td>Actions</td>

                            {compareProducts.map((product) => (
                                <td key={product.id}>
                                    <button
                                        type="button"
                                        className="remove-compare-button"
                                        onClick={() => removeCompare(product.id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        )}
        </section>
  );
}

export default ComparePage;