import { useState, useEffect } from "react";
function Hero () {
  const [heroImages, setHeroImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/heroImages")
      .then((response) => response.json())
      .then((data) => setHeroImages(data))
      .catch((error) => {
        console.error("Kunde inte hämta hero-bilder:", error);
        setError("Kunde inte hämta hero-bilder");
      });
  }, []);

  useEffect(() => {
    if (heroImages.length > 1) {
      const timer = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIndex((prevIndex) =>
            prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
          );
          setTimeout(() => setIsTransitioning(false), 50);
        }, 500);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [heroImages]);

  if (error) {
    return <div className="h-64 bg-gray-200 text-red-500">{error}</div>;
  }

  if (heroImages.length === 0) {
    return <div className="h-64 bg-gray-200"></div>;
  }

  const currentImage = heroImages[currentIndex];
  const transitionClass = isTransitioning ? "opacity-0" : "opacity-100";

return (
    <div>
      <div className="sm:hidden">
        <div className="mb-10">
          <div className="h-64 relative overflow-hidden">
            <img
              src={currentImage.image}
              alt={currentImage.altText}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${transitionClass}`}
            />
          </div>
          <div className="p-4 text-center">
            <h1 className="text-3xl font-bold mb-4">
              {currentImage.imageDescription}
            </h1>
            <p className="text-gray-700 mb-4">{currentImage.altText}</p>
          </div>
        </div>
      </div>

      <div className="hidden sm:block lg:hidden">
        <div className="mb-10">
          <div className="h-96 relative overflow-hidden">
            <img
              src={currentImage.image}
              alt={currentImage.altText}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${transitionClass}`}
            />
          </div>
          <div className="p-4 text-center">
            <h1 className="text-3xl font-bold mb-4">
              {currentImage.imageDescription}
            </h1>
            <p className="text-gray-700 mb-4">{currentImage.altText}</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block p-4">
        <div className="mb-10">
          <div className="flex flex-row mb-8">
            <div className="w-1/2 p-8 flex items-center">
              <div>
                <h1 className="text-3xl font-bold mb-4">
                  {currentImage.imageDescription}
                </h1>
                <p className="text-gray-700 mb-4">{currentImage.altText}</p>
              </div>
            </div>

            <div className="w-1/2 h-96 relative overflow-hidden">
              <img
                src={currentImage.image}
                alt={currentImage.altText}
                className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ${transitionClass}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;