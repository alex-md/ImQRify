import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import App from "./app.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HeroUIProvider>
            <main className="min-h-screen bg-white text-black">
                <App />
            </main>
        </HeroUIProvider>
    </React.StrictMode>
);
