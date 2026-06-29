// src/lib/axios.ts

import axios from "axios";
import type { Clerk } from "@clerk/clerk-react"; // Import Clerk's type for better type safety

// Declare a variable to hold the Clerk instance. It will be initialized later.
let clerkInstance: Clerk | null = null;

// This function will be called once your ClerkProvider has loaded the Clerk object.
// It allows us to "inject" the live Clerk instance into our axios setup.
export const initializeAxiosWithClerk = (clerk: Clerk) => {
    clerkInstance = clerk;
};

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" 
		? "http://localhost:5001/api" 
		: "https://spotiplay-backend.onrender.com/api", 
});

// Add a request interceptor to axiosInstance
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            // Check if Clerk instance is available and loaded, and if a user is signed in
            if (clerkInstance && clerkInstance.loaded && clerkInstance.user) {
                // Get the JWT token from the active Clerk session.
                // The 'template' parameter should match any custom JWT templates
                // you've configured in your Clerk dashboard for your backend.
                // If you haven't set up custom templates, 'session' is the default.
                const token = await clerkInstance.session?.getToken({ template: 'session' });

                if (token) {
                    // Attach the token to the Authorization header
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        } catch (error) {
            console.error("Error retrieving Clerk token for Axios request:", error);
            // Optionally, handle the error here, e.g., redirect to login if token fetching fails
        }
        return config; // Always return the config, even if no token was added
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);