import { useEffect, useState } from "react";
import type { Product } from "../types/product";

function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://dummyjson.com/products?limit=200");

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();
            setProducts(data.products);

            } catch (error) {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
    };
}

export default useProducts;