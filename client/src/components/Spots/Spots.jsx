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
      <div className="grid grid-cols-3 gap-4 p-4">
        {spots.length > 0 &&
          spots.map((spot) => (
            <div key={spot.id} className="relative">
              <img
                src={spot.image}
                alt={spot.altText || "Spot image"}
                className="w-full h-[300px] object-cover"
              />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-xl font-bold text-center px-2">
                  {spot.title}
                </h2>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Spots;