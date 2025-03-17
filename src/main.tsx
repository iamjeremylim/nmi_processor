import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyles from "./components/GlobalStyles";
import App from "./App";

const rootElement = document.getElementById("root");

createRoot(rootElement as HTMLElement).render(
  <StrictMode>
    <App />
    <GlobalStyles />
  </StrictMode>
);
