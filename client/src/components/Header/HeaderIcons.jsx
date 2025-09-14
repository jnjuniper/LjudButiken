import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const HeaderIcons = ({ className = "flex items-center space-x-4" }) => {
  return (
    <div className={className}>
      <Link to="#favorites">
        <Heart className="w-6 h-6 cursor-pointer hover:text-red-500" />
      </Link>
      <Link to="#shopping">
        <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-green-500" />
      </Link>
    </div>
  );
};

export default HeaderIcons;
