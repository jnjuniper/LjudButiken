import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({ 
  products: externalProducts, 
  title = "Produkter", 
  noResultsMessage = "Inga produkter hittades" 
}) {
  const [internalProducts, setInternalProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use external products if provided, otherwise fetch all
  const products = externalProducts !== undefined ? externalProducts : internalProducts;

  useEffect(() => {
    if (externalProducts !== undefined) {
      // If external products are provided, no need to fetch
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/api/products")
      .then((r) => r.json())
      .then(setInternalProducts)
      .catch((err) => {
        console.error("Fel vid hämtning av produkter:", err);
        setInternalProducts([]);
      })
      .finally(() => setLoading(false));
  }, [externalProducts]);

  return (
    <section className="w-full">
      <div className="w-full px-4 sm:px-4 lg:px-4 py-10">
        <h2 className="text-xl font-bold mb-6">{title}</h2>

        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border rounded-xl overflow-hidden bg-white">
                  <div className="w-full aspect-[3/4] bg-gray-100 animate-pulse" />
                  <div className="p-3">
                    <div className="h-4 w-3/5 bg-gray-100 rounded animate-pulse mb-2" />
                    <div className="h-3 w-2/5 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              ))
            : products && products.length > 0
            ? products.map((p) => <ProductCard key={p.id} product={p} />)
            : (
                <div className="col-span-full text-center text-gray-500 py-10">
                  {noResultsMessage}
                </div>
              )}
        </div>
      </div>
    </section>
  );
}
