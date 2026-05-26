export type Product={
    id: number;
    title: string;
    brand?: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    thumbnail: string;
}

export type ProductCardProps = {
    product: Product;

    favoriteIds: number[];
    compareIds: number[];

    toggleFavorite: (productId: number) => void;
    toggleCompare: (productId: number) => void;
};

export type GetFilteredProductsParams = {
    products: Product[];
    searchQuery: string;
    selectedCategory: string;
    onlyInStock: boolean;
    onlyDiscounted: boolean;
    sortBy: string;
};