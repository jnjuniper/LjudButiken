import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  HeaderIcons  from  "./HeaderIcons.jsx";
import logo from "../../assets/logo.png";


const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
};

const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchTerm.trim()){
        navigate(`search?query=${encodeURIComponent(searchTerm)}`);
        setSearchTerm("");
    } 
};

return (
    <header className="p-4 bg-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <a href="/">
                <img
                className="pl-1 pb-2 h-[50px]"
                src={logo}
                alt=""
                />
                </a>
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
            <div className="hidden md:flex items-center space-x-4" >
                <HeaderIcons />
            </div>
        </div>

        <nav className="mt-4 md:mt-2 flex flex-col md:flex-row md:space-x-6">
            <a href= "#" className="hover:text-blue-600">
                Nyheter
            </a>
            <a href= "#" className="hover:text-blue-600">
                Topplistan
            </a>
            <a href= "#" className="hover:text-blue-600">
                Rea
            </a>
            <a href= "#" className="hover:text-blue-600">
                Kampanjer
            </a>
        </nav>
    </header>
);
};

export default Header;