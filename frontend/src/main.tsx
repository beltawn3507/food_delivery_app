import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.tsx";

import { AppProvider } from "./context/AppContext.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";

import "./index.css";
import "leaflet/dist/leaflet.css";

// Service Base URLs
export const authService = "https://food-dev.duckdns.org";
export const restaurantService = "https://food-dev.duckdns.org";
export const utilsService = "https://food-dev.duckdns.org";
export const realtimeService = "https://food-dev.duckdns.org";
export const riderService = "https://food-dev.duckdns.org";
export const adminService = "https://food-dev.duckdns.org";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* use google auth provider for the auth client */}
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    >
      <AppProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AppProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
