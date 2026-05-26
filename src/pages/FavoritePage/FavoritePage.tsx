import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import "./FavoritesPage.css";
import useProducts from "../../hooks/useProducts.ts";
import Toast from "../../components/Toast/toast.tsx";
import StatusMessage from "../../components/StatusMessage/statusMessage.tsx";

function FavoritesPage() {
    const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
    const { products, loading, error } = useProducts();
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const savedFavoriteIds: number[] = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
        const filteredFavorites = products.filter((product) =>
            savedFavoriteIds.includes(product.id));

        setFavoriteProducts(filteredFavorites);
    }, [products]);


    function removeFavorite(productId: number) {
        const updatedProducts = favoriteProducts.filter((product) => product.id !== productId);

        setFavoriteProducts(updatedProducts);

        const updatedIds = updatedProducts.map((product) => product.id);

        localStorage.setItem("favoriteProducts",JSON.stringify(updatedIds));

        setToastMessage("Product removed from favorites");

        setTimeout(() => {
            setToastMessage("");
        }, 2000);
    }

    if (loading) {
        return <StatusMessage message="Loading products..." />;
    }

    if (error) {
        return <StatusMessage message={error} isError />;
    }
    
    return (
        <>
        <Toast message={toastMessage} />
        <section className="favorites-page">
            <h1 className="favorites-page-title"> Favorites </h1>

        {favoriteProducts.length === 0 
        ? (<p className="favorites-empty">Your favorites list is empty. </p>) 
        : (
            <div className="favorites-grid">

                {favoriteProducts.map((product) => (
                    <article key={product.id} className="favorite-product-card">

                        <img src={product.thumbnail} alt={product.title} className="favorite-product-image"/>

                        <div className="favorite-product-content">
                            <h2 className="favorite-product-title"> {product.title}</h2>

                            <p className="favorite-product-price"> ${product.price}</p>

                            <button type="button" className="remove-button" 
                            onClick={() => 
                                removeFavorite(product.id)
                            }>
                                Remove from favorites
                            </button>
                        </div>

                    </article>
                ))}
            </div>
        )}
        </section>
        </>
    );
}

export default FavoritesPage;