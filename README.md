# React 19 useActionState 3D Visualization

![demo](https://github.com/user-attachments/assets/412c1461-97a1-45ba-854c-f06e9599bc7f)

This project is an advanced educational application designed to demonstrate the new **React 19 `useActionState` hook**. It features a beautiful, interactive 3D visualization that reacts to the state of a simulated server action.

## Features

-   **React 19 `useActionState`**: Learn how to manage form state, pending status, and server responses using the new hook.
-   **Interactive 3D Visuals**: A stunning 3D processor (built with Three.js and React Three Fiber) that changes color, size, and animation speed based on the action's status (`idle`, `pending`, `success`, `error`).
-   **Glassmorphism UI**: A modern, premium user interface with backdrop blur and smooth transitions.
-   **Simulated Server Action**: A mock server action that simulates network delay and random success/failure outcomes to demonstrate different states.

## Tech Stack

-   **React 19** (RC/Canary)
-   **TypeScript**
-   **Vite**
-   **React Three Fiber / Drei** (3D Graphics)
-   **Tailwind CSS** (Styling)
-   **Lucide React** (Icons)

## Getting Started

### Prerequisites

-   Node.js (v18 or higher recommended)
-   npm

### Installation

1.  Clone the repository (if applicable) or navigate to the project directory.
2.  Install dependencies:

    ```bash
    npm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

## How to Use

1.  **Enter Data**: Type any text into the "Input Payload" field in the form.
2.  **Submit**: Click "Submit Transaction".
3.  **Observe**:
    *   **Pending**: The 3D ring turns yellow/orange and spins faster. The core shrinks.
    *   **Success**: If the action succeeds (random chance), the ring turns green, expands, and returns to normal speed.
    *   **Error**: If the action fails (random chance or empty input), the ring turns red and stops rotating.
4.  **Review State**: The form displays the returned message and timestamp from the "server".

## Project Structure

-   `src/App.tsx`: Main application component combining the 3D scene and UI.
-   `src/actions.ts`: Contains the simulated server action (`processData`) and type definitions.
-   `src/components/ActionForm.tsx`: The form component utilizing `useActionState`.
-   `src/components/Processor3D.tsx`: The 3D scene component that visualizes the state.
