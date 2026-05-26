import type {GetFilteredProductsParams } from "../types/product";

export function getFilteredProducts({
  products,
  searchQuery,
  selectedCategory,
  onlyInStock,
  onlyDiscounted,
  sortBy,
}: GetFilteredProductsParams) {
  return products
    .filter((product) => {
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        product.title.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const matchesStock = !onlyInStock || product.stock > 0;

      const matchesDiscount =
        !onlyDiscounted || product.discountPercentage > 0;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock &&
        matchesDiscount
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "title":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
}