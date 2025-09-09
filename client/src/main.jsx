import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import logo from "./assets/logo.png";

// Ensure favicon always uses our logo (works on deep links too)
const favicon = document.querySelector("link[rel='icon']");
if (favicon) {
  favicon.setAttribute("href", logo);
  favicon.setAttribute("type", "image/png");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
