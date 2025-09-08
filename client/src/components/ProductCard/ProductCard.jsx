import { useState, useMemo } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product = {}, onFavorite = () => {} }) {
  const {
    image,
    secondaryImage1,
    productName,
    //productDescription,
    brand,
    sku,
    price,
    slug,
  } = product;

  const [hovered, setHovered] = useState(false);
  const imgSrc = hovered && secondaryImage1 ? secondaryImage1 : image;

  const priceText = useMemo(() => {
    if (price == null || price === "") return "—";
    try {
      return `${Number(price).toLocaleString("sv-SE")} SEK`;
    } catch {
      return `${price} SEK`;
    }
  }, [price]);

  const linkTo = slug ? `/products/${slug}` : "#";

  return (
    <div
      className="group border rounded-xl shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Bild */}
      <Link to={linkTo} className="relative block w-full">
        {/* Fast ratio så alla kort blir lika höga */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={productName || "Produktbild"}
              className="absolute inset-0 w-full h-full object-contain p-2" // ⬅️ contain + padding
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
              Ingen bild
            </div>
          )}

          {/* Hjärtat – nere höger, ovanpå bilden */}
          <button
            type="button"
            aria-label="Lägg till i favoriter"
            className="absolute bottom-2 right-2 rounded-full bg-white/90 backdrop-blur p-1.5 shadow hover:scale-110 transition"
            onClick={(e) => {
              e.preventDefault();
              onFavorite(product);
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Textblock */}
      <Link to={linkTo} className="block p-3">
        {/* Vänster: titel/teaser — Höger: pris */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-medium leading-snug line-clamp-1">
              {productName || "Namnlös produkt"}
            </h3>
          </div>

          <span className="shrink-0 text-sm font-semibold text-right leading-5">
            {priceText}
          </span>
        </div>

        {/* Märke (egen rad under) */}
        {(brand || sku) && (
          <p className="mt-1 text-xs text-gray-500">
            {brand && (
              <span className="font-medium text-gray-700">{brand}</span>
            )}
          </p>
        )}
      </Link>
    </div>
  );
}
