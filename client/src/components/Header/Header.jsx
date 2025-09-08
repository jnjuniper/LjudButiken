import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeaderIcons from "./HeaderIcons.jsx";
import logo from "../../assets/logo.png";

// Slugify identical to server
const slugify = (s = "") =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="p-4 bg-white shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <Link to="/">
            <img className="pl-1 pb-2 h-[100px]" src={logo} alt="" />
          </Link>
        </div>

        <div className="flex items-center w-full md:w-auto md:flex-1 md:ml-6">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full space-x-4"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Sök efter produkter..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500 md:w-80"
            />
            <button type="submit" className="hidden">
              <Search className="w-6 h-6 cursor-pointer hover:text-blue-500" />
            </button>
          </form>

          <div className="flex md:hidden items-center space-x-4 ml-4">
            <HeaderIcons />
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <HeaderIcons />
        </div>
      </div>

      <nav className="mt-4 md:mt-2 flex flex-col md:flex-row md:space-x-6">
        {categories.map((category) => {
          const slug = slugify(category.name);
          return (
            <Link
              key={category.categoryId}
              to={`/categories/${slug}`}
              className="hover:text-blue-600"
            >
              {category.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
