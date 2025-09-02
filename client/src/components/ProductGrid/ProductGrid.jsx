import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch((err) => {
        console.error("Fel vid hämtning av produkter:", err);
        setProducts([]);
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-xl font-bold mb-6">Produkter</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {products === null
          ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="border rounded-xl overflow-hidden bg-white"
              >
                <div className="w-full aspect-[3/4] bg-gray-100 animate-pulse" />
                <div className="p-3">
                  <div className="h-4 w-3/5 bg-gray-100 rounded animate-pulse mb-2" />
                  <div className="h-3 w-2/5 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))
          : products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
