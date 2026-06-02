import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.tsx";

import { AppProvider } from "./context/AppContext.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";

import "./index.css";
import "leaflet/dist/leaflet.css";

// Service Base URLs

export const authService = "";
export const restaurantService = "";
export const utilsService = "";
export const realtimeService = "";
export const riderService = "";
export const adminService = "";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
