import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root");

createRoot(rootElement as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
