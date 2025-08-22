import { Heart, ShoppingBag } from "lucide-react";

const HeaderIcons = ({
    className = "flex items-center space-x-4",
}) => {
    return (
        <div className={className}>
            <a href="#favorites">
                <Heart className="w-6 h-6 cursor-pointer hover:text-red-500" />
                </a>
                <a href="#shopping">
                    <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-green-500" />
                </a>
        </div>
    );
};

export default HeaderIcons;