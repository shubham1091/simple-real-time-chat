# Real-Time Chat Application

This is a real-time chat application built using Appwrite, TypeScript, React, and Tailwind CSS.

## Features

-   **User Authentication**: Users can sign up, log in, and log out.
-   **Real-Time Messaging**: Messages are displayed in real-time using Appwrite's real-time database feature.

## Technologies Used

-   **Appwrite**: Appwrite is a secure end-to-end backend server for Web, Mobile, and Flutter developers that is packaged as a set of Docker containers for easy deployment.
-   **TypeScript**: TypeScript is a superset of JavaScript that adds static typing and other features to the language.
-   **React**: React is a JavaScript library for building user interfaces.
-   **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework for building custom designs quickly.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/shubham1091/simple-real-time-chat.git
    ```

2. Install dependencies:

    ```bash
    cd simple-real-time-chat
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open your browser and visit `http://localhost:5173` to view the application.

## Configuration

Make sure to configure the following environment variables:

-   `VITE_PROJECT_ID`: Your Appwrite project ID.
-   `VITE_DATABASE_ID`: Your Appwrite database ID.
-   `VITE_COLLECTION_ID`: Your Appwrite collection ID.

## Usage

-   Sign up for an account or log in with existing credentials.
-   Enter a chat room and start messaging in real-time.
-   Click on the trash icon next to your messages to delete them.

