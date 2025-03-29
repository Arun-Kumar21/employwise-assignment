# Assignment: CRUD Operation with Reqres API

## Overview
This project is a simple React application that demonstrates CRUD (Create, Read, Update, Delete) operations using the Reqres API.

## Features
- Localstorage-based authentication.
- Fetch and display a list of users.
- Update personal profile.
- Delete user.

## Installation Guide

Follow these steps to set up the project locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/Arun-Kumar21/employwise-assignment.git
   ```
2. Navigate to the project directory:
   ```sh
   cd employwise-assignment
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add:
   ```sh
   VITE_SERVER_URL=https://reqres.in
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```
6. Open `http://localhost:5173/` in your browser.

## Note
Updating the current user profile and deleting user details rely on global state management. Refreshing the page will reload the actual data from the Reqres API.

## Tech Used
- ReactJS
- Tailwind CSS
- ShadCN
- Zustand
- Axios


