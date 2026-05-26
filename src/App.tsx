import AppLayout from "./AppLayout";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductPage/ProductsPage";
import FavoritesPage from "./pages/FavoritePage/FavoritePage";
import ComparePage from "./pages/ComparePage/ComparePage";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/About/About";

function NotFoundPage() {
  return <h1>404 Page</h1>;
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/favorites" element={<FavoritesPage/>} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
