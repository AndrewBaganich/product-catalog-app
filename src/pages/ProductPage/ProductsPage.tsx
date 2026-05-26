import { useEffect, useState } from "react";
import "./ProductsPage.css";
import Toast from "../../components/Toast/toast";
import useProducts from "../../hooks/useProducts.ts";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProdactCard.tsx";
import { getFilteredProducts } from "../../utils/getFilteredProducts.ts";
import StatusMessage from "../../components/StatusMessage/statusMessage.tsx";


function ProductsPage() {
    const { products, loading, error } = useProducts();

    const [searchQuery, setSearchQuery] = useState("");

    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get("category");
    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "all");

    const [onlyInStock, setOnlyInStock] = useState(false);
    const [onlyDiscounted, setOnlyDiscounted] = useState(false);

    const [sortBy, setSortBy] = useState("default");

    const [favoriteMessage, setFavoriteMessage] = useState("");
    const [favoriteIds, setFavoriteIds] = useState<number[]>(() => {
        const savedFavorites = localStorage.getItem("favoriteProducts");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const [compareIds, setCompareIds] = useState<number[]>(() => {
        const savedCompare = localStorage.getItem("compareProducts");
        return savedCompare ? JSON.parse(savedCompare) : [];
    });
    const [compareMessage, setCompareMessage] = useState("");

    

    useEffect(() => {
        localStorage.setItem("favoriteProducts", JSON.stringify(favoriteIds));
    }, [favoriteIds]);


    useEffect(() => {
        localStorage.setItem("compareProducts", JSON.stringify(compareIds));
    }, [compareIds]);


    if (loading) {
        return <StatusMessage message="Loading products..." />;
    }

    if (error) {
        return <StatusMessage message={error} isError />;
    }

    const filteredProducts = getFilteredProducts({
        products,
        searchQuery,
        selectedCategory,
        onlyInStock,
        onlyDiscounted,
        sortBy
    });

    const categories = Array.from(new Set(products.map((product) => product.category)));


    function toggleFavorite(productId: number) {
        const isFavorite = favoriteIds.includes(productId);

        setFavoriteIds((prevFavoriteIds) => {
            if (isFavorite) {
                return prevFavoriteIds.filter((id) => id !== productId);
            }

            return [...prevFavoriteIds, productId];
        });

        setFavoriteMessage(
            isFavorite
            ? "Product removed from favorites"
            : "Product added to favorites"
        );

        setTimeout(() => {
            setFavoriteMessage("");
        }, 2000);
    }

    function toggleCompare(productId: number) {
        const isSelected = compareIds.includes(productId);
        
        if (isSelected) {
            setCompareIds((prevIds) =>
                prevIds.filter((id) => id !== productId));

            setCompareMessage("Product removed from comparison");
        } else {
            
            if (compareIds.length >= 3) {
                setCompareMessage("You can compare up to 3 products only");

                setTimeout(() => {
                    setCompareMessage("");
                }, 2000);

                return;
            }

            setCompareIds((prevIds) => [...prevIds, productId]);
            setCompareMessage("Product added to comparison");
        }

        setTimeout(() => {
            setCompareMessage("");
        }, 2000);
    }

    function resetFilters() {
        setSearchQuery("");
        setSelectedCategory("all");
        setOnlyInStock(false);
        setOnlyDiscounted(false);
        setSortBy("default");
    }

    return (
    <>
    <Toast message={favoriteMessage || compareMessage} />

        <section className="products-page">
            <aside className="products-sidebar">
                <h2 className="sidebar-title">Filters</h2>

                <div className="filter-group">
                    <label htmlFor="search" className="filter-label">
                    Search products
                    </label>

                    <input
                    id="search"
                    type="text"
                    className="filter-input"
                    placeholder="Title, brand, category..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <label htmlFor="category" className="filter-label">
                    Category
                    </label>

                    <select
                    id="category"
                    className="filter-input"
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    >
                    <option value="all">All categories</option>

                    {categories.map((category) => (
                        <option key={category} value={category}>
                        {category}
                        </option>
                    ))}
                    </select>
                </div>

                <label className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(event) => setOnlyInStock(event.target.checked)}
                    />

                    <span>Only in-stock products</span>
                </label>

                <label className="checkbox-label">
                    <input
                    type="checkbox"
                    checked={onlyDiscounted}
                    onChange={(event) => setOnlyDiscounted(event.target.checked)}
                    />

                    <span>Only discounted products</span>
                </label>

                <div className="filter-group">
                    <label htmlFor="sort" className="filter-label">
                        Sort by
                    </label>

                    <select id="sort" className="filter-input" value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Rating: High to Low</option>
                        <option value="title">Title: A-Z</option>
                        <option value="title-desc">Title: Z-A</option>
                    </select>
                </div>

                <button type="button" className="reset-filters-button" onClick={resetFilters}>
                    Reset filters
                </button>

            </aside>

            <div className="products-content">
                <h1 className="products-title">Products</h1>

                <p className="products-count">
                    Showing {filteredProducts.length} products
                </p>

                {filteredProducts.length === 0 && (
                    <p className="empty-message">
                        No products match your search.
                    </p>
                )}

                {filteredProducts.length > 0 && (
                    <div className="products-grid">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}

                                product={product}

                                favoriteIds={favoriteIds}
                                compareIds={compareIds}

                                toggleFavorite={toggleFavorite}
                                toggleCompare={toggleCompare}
                            />
                            ))
                        }
                    </div>
                )}
            </div>
        </section>
    </>
    );
}

export default ProductsPage;