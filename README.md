# Spotify Clone WebApp

## 🎶 Overview

Welcome to the Spotify Clone WebApp – a full-stack music streaming platform designed to offer a rich audio experience coupled with real-time user interaction. This application allows users to stream a curated music library, with an administrative interface for seamless content management. Beyond just listening, users can connect and chat with fellow music enthusiasts in real-time, fostering a vibrant community.

## ✨ Features

* **Comprehensive Music Streaming:** Enjoy seamless playback of songs, organized by albums and artists.
* **User Authentication & Authorization (Clerk):** Secure user management with distinct roles:
    * **Admin Users:** Gain exclusive access to an administrative dashboard to effortlessly add, update, and manage the music library.
    * **Standard Users:** Access all music streaming features and the chat interface.
* **Real-time Chat Interface (Socket.io):** Engage with other users currently on the site through an integrated live chat feature, enhancing the social aspect of music discovery.
* **Dynamic Album & Song Management:** Admins can easily upload new audio files and their corresponding artwork, manage song metadata (title, artist, duration), and organize tracks into albums.
* **Responsive User Interface (Tailwind CSS):** A modern, intuitive, and responsive design ensures a consistent experience across various devices.
* **Cloud Storage for Media (Cloudinary):** Efficient and scalable storage solution for all audio and image files, ensuring fast delivery and robust media management.

## 🚀 Tech Stack

This application is built using a robust and modern technology stack:

**Frontend:**
* **React:** A declarative, component-based JavaScript library for building interactive user interfaces.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs with speed and efficiency.
* **Zustand:** A small, fast, and scalable bear-necessities state-management solution for React.
* **Clerk:** Powerful user authentication and authorization solution for React applications, providing secure sign-up, sign-in, and user management capabilities.

**Backend:**
* **Node.js (Express):** A fast, unopinionated, minimalist web framework for building robust APIs.
* **MongoDB:** A flexible NoSQL document database used for storing application data (user information, song metadata, album details, chat messages).
* **Mongoose:** An elegant MongoDB object modeling tool for Node.js, providing a straightforward, schema-based solution to model your application data.
* **Socket.io:** A real-time, bidirectional, event-based communication library enabling the live chat functionality.
* **Clerk (Node.js SDK):** Integrates with the frontend Clerk instance for secure backend API protection and user management.
* **Cloudinary:** Cloud-based media management platform used for storing and serving audio and image assets.
* **`express-fileupload`:** Middleware for Express to handle file uploads (used for audio and image files).
* **`node-cron`:** A simple cron-like job scheduler for Node.js (used for temp file cleanup).

## 🛠️ Setup and Installation

To get a copy of the project up and running on your local machine, follow these steps:

### Prerequisites

* Node.js (LTS version recommended)
* MongoDB Atlas account (or local MongoDB instance)
* Clerk.com account
* Cloudinary account

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-link>
    cd <your-repo-name>/backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Create a `.env` file** in the `backend` directory and add your environment variables:
    ```env
    PORT=5001
    MONGO_URI=<Your MongoDB Connection String>
    CLERK_SECRET_KEY=<Your Clerk Secret Key (sk_live_...)>
    ADMIN_EMAIL=your.admin.email@example.com # Email of the user who should have admin privileges
    CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
    CLOUDINARY_API_KEY=<Your Cloudinary API Key>
    CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
    NODE_ENV=development # or production
    ```
    * **MongoDB URI:** Get this from your MongoDB Atlas dashboard (or local setup).
    * **Clerk Keys:** Obtain from your Clerk Dashboard.
    * **Admin Email:** Set this to the email of the Clerk user you want to designate as an administrator.
    * **Cloudinary Credentials:** Get these from your Cloudinary Dashboard.
4.  **Run the backend server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The server will start on the `PORT` specified in your `.env` file (e.g., `http://localhost:5001`).

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend # If you are in the backend directory
    # or
    cd <your-repo-name>/frontend # If you are in the root directory
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Create a `.env` file** in the `frontend` directory and add your environment variables:
    ```env
    VITE_CLERK_PUBLISHABLE_KEY=<Your Clerk Publishable Key (pk_live_...)>
    ```
    * **Clerk Publishable Key:** Obtain from your Clerk Dashboard.
4.  **Run the frontend development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The app will typically open in your browser at `http://localhost:3000`.