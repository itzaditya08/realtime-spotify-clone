import { StrictMode, useEffect } from "react"; 
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider, useClerk } from "@clerk/clerk-react"; 
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.tsx";

// Import the new initialization function for Axios
import { initializeAxiosWithClerk } from "./lib/axios.ts";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

// A helper component to get the Clerk instance and pass it to Axios
// This component needs to be rendered *inside* ClerkProvider
function ClerkAxiosInitializer() {
    const { loaded, clerk } = useClerk(); // Get the Clerk instance and its loading status

    useEffect(() => {
        if (loaded && clerk) {
            // Once Clerk is loaded and the instance is available, initialize Axios with it
            initializeAxiosWithClerk(clerk);
            console.log("Axios instance initialized with Clerk."); // Optional: for debugging
        }
    }, [loaded, clerk]); // Re-run when loaded status or clerk instance changes

    return null; // This component doesn't render any UI
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
            {/* Render the initializer component inside ClerkProvider */}
            <ClerkAxiosInitializer />

            <AuthProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </ClerkProvider>
    </StrictMode>
);