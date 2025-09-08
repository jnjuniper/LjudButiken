import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const nav = useNavigate();

  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState(null);

  const [selectedFileName, setSelectedFileName] = useState("");

  const [form, setForm] = useState({
    productName: "",
    productDescription: "",
    image: "",
    brand: "",
    SKU: "",
    price: "",
    categoryId: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Kunde inte hämta kategorier");
        const data = await res.json();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    })();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onFilePick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErr(null);
    setUploading(true);
    setSelectedFileName(file.name);

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Uppladdning misslyckades");
      }
      const data = await res.json();
      setForm((f) => ({ ...f, image: data.url }));
    } catch (e) {
      setErr(e.message || "Uppladdning misslyckades");
      setForm((f) => ({ ...f, image: "" }));
      setSelectedFileName("");
    } finally {
      setUploading(false);

      e.target.value = "";
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    if (!form.productName || form.productName.length > 25) {
      setErr("Namn är obligatoriskt och max 25 tecken.");
      return;
    }
    if (!form.SKU || !form.price || !form.categoryId) {
      setErr("SKU, Pris och Kategori är obligatoriska.");
      return;
    }
    if (uploading) {
      setErr("Vänta tills uppladdningen är klar.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: form.productName.trim(),
          productDescription: form.productDescription?.trim() || "",
          image: form.image?.trim() || "",
          brand: form.brand?.trim() || "",
          SKU: form.SKU.trim(),
          price: Number(form.price),
          categoryId: Number(form.categoryId),
        }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || "Kunde inte spara produkten");
      }

      nav("/admin/products");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-3xl">
      <h2 className="mb-6 text-2xl font-semibold">Ny produkt</h2>

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm">
            Namn <span className="text-red-600">*</span>
          </span>
          <input
            name="productName"
            value={form.productName}
            onChange={(e) => {
              if (e.target.value.length <= 25) onChange(e);
            }}
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Ange namn"
            required
          />
          <span className="text-xs text-gray-500">
            {form.productName.length}/25 tecken
          </span>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Beskrivning</span>
          <textarea
            name="productDescription"
            rows={5}
            value={form.productDescription}
            onChange={onChange}
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Ange beskrivning"
          />
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-sm">Bild</span>
          <div className="flex items-center gap-3">
            <label className="inline-flex w-fit cursor-pointer items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100">
              Välj bild
              <input
                type="file"
                accept="image/*"
                onChange={onFilePick}
                className="hidden"
              />
            </label>

            <div className="text-sm" aria-live="polite">
              {uploading ? (
                <span>laddar upp…</span>
              ) : form.image ? (
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block rounded-full border border-green-600 px-2 py-0.5 text-xs text-green-700">
                    upplagd
                  </span>
                  <span
                    className="text-gray-700 truncate max-w-[220px]"
                    title={selectedFileName || form.image}
                  >
                    {selectedFileName || form.image}
                  </span>
                </span>
              ) : (
                <span className="text-gray-500">Ingen bild vald</span>
              )}
            </div>
          </div>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-sm">Märke</span>
          <input
            name="brand"
            value={form.brand}
            onChange={onChange}
            className="rounded border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">
            SKU <span className="text-red-600">*</span>
          </span>
          <input
            name="SKU"
            value={form.SKU}
            onChange={onChange}
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="Ange SKU"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">
            Pris (kr) <span className="text-red-600">*</span>
          </span>
          <input
            name="price"
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={onChange}
            className="rounded border border-gray-300 px-3 py-2"
            placeholder="0"
            required
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm">
            Kategori <span className="text-red-600">*</span>
          </span>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={onChange}
            className="rounded border border-gray-300 bg-white px-3 py-2"
            required
          >
            <option value="">Välj kategori</option>
            {categories.map((c) => (
              <option key={c.categoryId ?? c.id} value={c.categoryId ?? c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        {err && <p className="text-sm text-red-600">{err}</p>}

        <div className="mt-2 flex gap-3">
          <button
            type="submit"
            disabled={saving || uploading}
            className="rounded-md bg-gray-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Lägger till…" : "Lägg till"}
          </button>
          <button
            type="button"
            onClick={() => nav("/admin/products")}
            className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100"
          >
            Avbryt
          </button>
        </div>
      </form>
    </section>
  );
}
