import { Globe, Plane, Shield, Smile } from "lucide-react";

const BottomIcons = () => {

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:place-items-center pt-8">
      <div className="flex items-center justify-start space-x-4 pl-5">
        <Globe className="w-10 h-10 text-gray-800" />
        <p>Gratis frakt och returer</p>
      </div>
      <div className="flex items-center justify-start space-x-4 pl-5">
        <Plane className="w-10 h-10 text-gray-800" />
        <p>Expressfrakt</p>
      </div>
      <div className="flex items-center justify-start space-x-4 pl-5">
        <Shield className="w-10 h-10 text-gray-800" />
        <p>Säkra betalningar</p>
      </div>
      <div className="flex items-center justify-start space-x-4 pl-5">
        <Smile className="w-10 h-10 text-gray-800" />
        <p>Nyheter varje dag</p>
      </div>
    </div>
  );
};

export default BottomIcons;