import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductGrid from "../../../components/ProductGrid/ProductGrid";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query") || "";

    if (query) {
      fetchProducts(query);
    } else {
      setProducts([]);
    }
  }, [location.search]);

  const fetchProducts = async (term) => {
    try {
      const response = await fetch(
        `/api/products?search=${encodeURIComponent(term)}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  return (
    <div className="search-page flex-grow">
      <ProductGrid
        products={products}
        title={`Sökresultat${
          products.length > 0 ? ` (${products.length})` : ""
        }`}
        noResultsMessage="Inga produkter hittades för din sökning"
      />
    </div>
  );
};

export default SearchPage;
