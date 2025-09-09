import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import ProductGrid from "./components/ProductGrid/ProductGrid.jsx";
import ProductDetails from "./pages/ClientView/ProductDetails/ProductDetails.jsx";
import CategoryPage from "./pages/ClientView/CategoryPage/CategoryPage.jsx";
import BottomIcons from "./components/BottomIcons/BottomIcons.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SearchPage from "./pages/ClientView/SearchPage/SearchPage.jsx";
import AddProduct from "./pages/Admin/AdminAdd/AddProduct.jsx";

import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import AdminList from "./pages/Admin/AdminList.jsx";
import AdminCategory from "./pages/Admin/Categories/AdminCategory.jsx";
import AddCategory from "./pages/Admin/Categories/Add/AddCategory.jsx";

function HomePage() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Header />}

      {!isAdminPage && location.pathname === "/" && <Hero />}
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<ProductGrid />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/categories/:slug" element={<CategoryPage />} />
        </Routes>
      </main>

      {!isAdminPage && (
        <>
          <BottomIcons />
          <Footer />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<HomePage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<AdminList />} />
        <Route path="products/new" element={<AddProduct />} />
        <Route path="categories" element={<AdminCategory />} />
        <Route path="categories/new" element={<AddCategory />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
