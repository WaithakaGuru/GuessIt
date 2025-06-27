import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Guess from "./Guess.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Guess />
  </StrictMode>,
);
