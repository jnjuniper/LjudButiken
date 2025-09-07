import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import ProductGrid from "./components/ProductGrid/ProductGrid.jsx";
import BottomIcons from "./components/BottomIcons/BottomIcons.jsx";
import Footer from "./components/Footer/Footer.jsx";


import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import AdminList from "./pages/Admin/AdminList.jsx";
import AddProduct from "./pages/Admin/AdminAdd/AddProduct.jsx";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <ProductGrid />
      <BottomIcons />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<AdminList />} />
        <Route path="products/new" element={<AddProduct />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
