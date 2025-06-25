# Plan My Plate

## Overview

Plan My Plate is a meal planning application that helps users organize recipes, generate shopping lists, and manage ingredients efficiently. It features a React-based frontend and an Express/Supabase backend.

## Features

- Recipe selection and serving size adjustment.
- Ingredient aggregation and shopping list generation.
- LocalStorage integration for saving and retrieving shopping lists.
- Supabase integration for database and authentication services.

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v7 or higher)
- Supabase account and instance

## Running the Frontend (Vite/React)

To run the frontend application:

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will typically be available at `http://localhost:5173`.

## Running the Backend (Express/Supabase)

To run the backend application:

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the server:

   ```bash
   npm start
   ```

   The application will typically be available at `http://localhost:8080`.

   **Note:** Ensure your Supabase instance is configured and running if the backend relies on it for database and authentication services. Refer to Supabase documentation for setup.

## Environment Variables

Required environment variables for the backend:

```env
PORT=8080
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Project Structure

```
planMyPlate/
├── backend/                # Backend code (Express/Supabase)
│   ├── public/            # Static assets
│   ├── src/               # Application source code
│   ├── package.json       # Backend dependencies
│   └── README.md          # Backend-specific instructions
├── frontend/               # Frontend code (React/Vite)
│   ├── public/            # Static assets
│   ├── src/               # Application source code
│   ├── package.json       # Frontend dependencies
│   └── README.md          # Frontend-specific instructions
├── README.md               # Project-level instructions
└── notes.md                # Additional notes
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/planMyPlate.git
   ```
2. Navigate to the project directory:
   ```bash
   cd planMyPlate
   ```
3. Follow the instructions for running the frontend and backend.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
