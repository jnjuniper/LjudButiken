import { useState, useEffect } from "react";

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
    <div className="grid grid-cols-3 gap-4">
      {spots.length > 0 &&
        spots.map((spot) => (
          <img
            key={spot.id}
            src={spot.image}
            alt={spot.altText || "Spot image"}
            className="w-full h-[300px] object-cover"
          />
        ))}
    </div>
  </>
);
}

export default Spots;