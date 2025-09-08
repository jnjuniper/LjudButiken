import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const load = () => {
    setLoading(true);
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("Kunde inte hämta kategorier");
        return res.json();
      })
      .then((data) => setCategories(data))
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    const ok = window.confirm(
      "Ta bort kategori? Den får inte vara kopplad till produkter."
    );
    if (!ok) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || "Kunde inte ta bort kategori");
      }
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Kategorier</h2>
        <Link
          to="/admin/categories/new"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Ny kategori
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="px-4 py-2">Bild</th>
              <th className="px-4 py-2">Namn</th>
              <th className="px-4 py-2 text-right">Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="px-4 py-3" colSpan={2}>
                  Laddar…
                </td>
              </tr>
            )}
            {err && !loading && (
              <tr>
                <td className="px-4 py-3 text-red-600" colSpan={2}>
                  {err}
                </td>
              </tr>
            )}
            {!loading && !err && categories.length === 0 && (
              <tr>
                <td className="px-4 py-3 text-gray-500" colSpan={2}>
                  Inga kategorier hittades.
                </td>
              </tr>
            )}
            {!loading &&
              !err &&
              categories.map((c) => (
                <tr
                  key={c.categoryId}
                  className="border-t border-gray-200 even:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={c.name}
                        className="h-10 w-10 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => remove(c.categoryId)}
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
