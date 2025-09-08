import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Kunde inte hämta produkter");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  const deleteProduct = async (id) => {
    if (!id) return;
    const ok = window.confirm("Ta bort produkten? Detta går inte att ångra.");
    if (!ok) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Kunde inte ta bort produkten");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      alert(e.message || "Kunde inte ta bort produkten");
    }
  };

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Produkter</h2>
        <Link
          to="/admin/products/new"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Ny produkt
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="px-4 py-2 w-1/2">Namn</th>
              <th className="px-4 py-2 w-1/4">SKU</th>
              <th className="px-4 py-2 w-1/4">Pris</th>
              <th className="px-4 py-2 text-right">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="px-4 py-3" colSpan={3}>
                  Laddar…
                </td>
              </tr>
            )}
            {err && !loading && (
              <tr>
                <td className="px-4 py-3 text-red-600" colSpan={3}>
                  {err}
                </td>
              </tr>
            )}
            {!loading && !err && products.length === 0 && (
              <tr>
                <td className="px-4 py-3 text-gray-500" colSpan={3}>
                  Inga produkter hittades.
                </td>
              </tr>
            )}
            {!loading &&
              !err &&
              products.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-200 even:bg-gray-50"
                >
                  <td className="px-4 py-3">{p.productName}</td>
                  <td className="px-4 py-3">{p.SKU ?? p.sku}</td>
                  <td className="px-4 py-3">{p.price} kr</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="rounded-md border border-red-300 px-3 py-1 text-sm text-red-700 hover:bg-red-50"
                    >
                      Ta bort
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
