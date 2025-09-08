import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Heart } from "lucide-react";

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${slug}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProduct(data);
        document.title = `${data.productName} - LjudButiken`;
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      }
    };

    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(`/api/similar-products/${slug}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setSimilarProducts(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching similar products:", error);
        setError(error.message);
      }
    };

    fetchProduct();
    fetchSimilarProducts();
    return () => {
      document.title = "LjudButiken";
    };
  }, [slug]);

  if (error)
    return <div className="text-center py-10 text-red-500">Fel: {error}</div>;
  if (!product) return <div className="text-center py-10">Laddar...</div>;

  const handleProductClick = (productSlug) => {
    navigate(`/products/${productSlug}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-auto max-w-xs md:max-w-md"
          />
          <Heart className="sm:hidden cursor-pointer transition-transform duration-200 hover:scale-125 mb-1 ml-auto w-11 h-11" />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
          <p className="text-gray-600 mb-2">{product.brand}</p>
          <p className="text-gray-700 mb-4">
            {product.productDescription || "Ingen beskrivning"}
          </p>
          <p className="text-xl font-semibold mb-4">{product.price} SEK</p>
          <button className="bg-black text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-800 w-full sm:w-auto">
            Lägg i varukorg
          </button>
        </div>
      </div>

      <div className="mt-10 hidden sm:block">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Liknande produkter
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {similarProducts.map((similarProduct) => (
            <div
              key={similarProduct.slug}
              className="text-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
              onClick={() => handleProductClick(similarProduct.slug)}
            >
              <img
                src={similarProduct.image}
                alt={similarProduct.productName}
                className="w-full h-auto max-w-xs mx-auto"
              />
              <h3 className="text-lg font-medium mt-2 text-left">
                {similarProduct.productName}
              </h3>
              <p className="text-gray-800 font-semibold mt-1 text-right">
                {similarProduct.price} SEK
              </p>
              <p className="text-gray-600 text-left">{similarProduct.brand}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
