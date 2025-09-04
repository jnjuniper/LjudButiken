import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Spots(){
    const [spots, setSpots] = useState([]);
    const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/spots")
      .then((response) => response.json())
      .then((data) => setSpots(data))
      .catch((error) => {
        console.error("Kunde inte hämta spots:", error);
        setError("Kunde inte hämta spots");
      });
  }, []);

  return (
    <>
      {error && (
        <div className="text-red-500 bg-gray-200 p-4 mb-4">
          {error}
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 p-4">
        {spots.length > 0 &&
          spots.map((spot) => (
            <Link key={spot.id} to={spot.link || "#"} className="relative group block">
              <img
                src={spot.image}
                alt={spot.altText || "Spot image"}
                className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75" // Add hover effects: scale and brightness
              />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-90 transition-opacity duration-300"> {/* Add opacity transition */}
                <h2 className="text-white text-xl font-bold text-center px-2 drop-shadow-lg">
                  {spot.title}
                </h2>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default Spots;