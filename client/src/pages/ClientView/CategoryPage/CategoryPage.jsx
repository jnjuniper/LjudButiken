import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../../../components/ProductGrid/ProductGrid";

const slugify = (s = "") =>
  s
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "-och-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch(`/api/categories/${slug}/products`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load category products");
        return r.json();
      })
      .then((data) => {
        if (!active) return;
        setProducts(data.products || []);
        const name = data.category?.name || slug.replace(/-/g, " ");
        setTitle(name.charAt(0).toUpperCase() + name.slice(1));
      })
      .catch(() => {
        if (!active) return;
        setProducts([]);
        setTitle(slugify(slug).replace(/-/g, " "));
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [slug]);

  return (
    <div className="flex-grow">
      <ProductGrid
        products={products}
        title={title || "Kategori"}
        noResultsMessage="Inga produkter i denna kategori"
      />
    </div>
  );
}
