# PokeWeb - Pokémon Explorer

PokeWeb is a simple React application that utilizes the public PokeAPI to display a list of Pokémon, detailed information about each Pokémon, and allows users to add their favorite Pokémon to a favorites list (stored locally using browser storage).

## Features

- **Browse Pokémon**: Explore a list of Pokémon retrieved directly from PokeAPI.
- **Search Pokémon**: Search for specific Pokémon by name.
- **Filter by Type**: Filter Pokémon based on their type.
- **View Details**: Click on any Pokémon to view detailed information, such as height, weight, abilities, and stats.
- **Add to Favorites**: Save your favorite Pokémon locally in your browser for easy access.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: React components for faster and easier web development with a consistent design.
- **PokeAPI**: A free-to-use API providing detailed information about Pokémon.
- **Local Storage**: Favorites are saved locally using the browser’s Local Storage.

## Getting Started

### Prerequisites

To run this application, you need to have the following installed:

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (Node Package Manager) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/pokeweb.git
    ```

2. Navigate to the project directory:

    ```bash
    cd pokeweb
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

2. Open your browser and go to `http://localhost:3000` to see the app in action.

## How It Works

- **Public API**: The app communicates directly with the PokeAPI to fetch real-time data about Pokémon, including images, abilities, and stats.
- **Favorites Management**: Pokémon added to your favorites are stored in the browser's local storage, so they persist between sessions.
- **No Backend**: This application runs entirely on the frontend, and no server-side backend is needed.

## Learning Purpose

This project was fully generated and built using AI-assisted code generation. The purpose of this project is to improve my skills in software engineering, particularly in prompting and guiding AI tools to create functional, production-ready code.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
