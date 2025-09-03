import "./App.css";
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import ProductGrid from "./components/ProductGrid/ProductGrid.jsx";
import BottomIcons from "./components/BottomIcons/BottomIcons.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <ProductGrid />
      <BottomIcons />
      <Footer />
    </div>
  );
}

export default App;
