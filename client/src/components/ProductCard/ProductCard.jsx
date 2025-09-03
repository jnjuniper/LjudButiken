import { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const {
    image,
    secondaryImage1,
    productName,
    brand,
    price,
    slug,
  } = product;

  const [hovered, setHovered] = useState(false);


  const src = hovered && secondaryImage1 ? secondaryImage1 : image;

  return (
    <div
      className="group border rounded-xl shadow-sm overflow-hidden bg-white hover:shadow-md transition-shadow duration-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full aspect-[3/4] bg-gray-100">
        {src ? (
          <img
            src={src}
            alt={productName}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Ingen bild
          </div>
        )}

        <button
          type="button"
          aria-label="Lägg till i favoriter"
          className="absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur p-1.5 shadow hover:scale-110 transition"
          onClick={(e) => {
            e.preventDefault(); 
            
          }}
        >
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <Link to={`/product/${slug}`} className="block p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium leading-tight line-clamp-2">
            {productName}
          </h3>
          <span className="shrink-0 text-sm font-semibold">{price} SEK</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">{brand}</p>
      </Link>
    </div>
  );
}
