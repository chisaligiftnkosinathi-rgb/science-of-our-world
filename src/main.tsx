import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LearnerProvider } from "./context/LearnerContext.tsx";

// Register Service Worker for Offline PWA execution
if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("Offline PWA ServiceWorker active with scope:", reg.scope);
      })
      .catch((err) => {
        console.warn("ServiceWorker registration error:", err);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LearnerProvider>
      <App />
    </LearnerProvider>
  </StrictMode>
);
