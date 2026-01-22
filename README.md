## About
This project is a final assignment for the User Interface Design (PIU) course. The goal was to build a functional frontend application using **Vanilla JavaScript**, **HTML**, and **CSS**, without relying on frameworks like React or Vue.

The application uses **Node.js (json-server)** as a backend to simulate a real REST API, handling asynchronous data fetching and state updates.

## Tech Stack
* **Frontend:** HTML5, CSS3 (SCSS/BEM), Vanilla JavaScript (ES6+)
* **Backend:** Node.js, json-server (REST API simulation)
* **Tools:** Docker, Git

## Architecture & Patterns
To ensure clean code and scalability, the project implements several software design patterns:
* **Observer Pattern:** Used to notify UI components about state changes without tight coupling.
* **State Management:** A centralized store handles the application state, ensuring data consistency across different views.
* **Component-Based Design:** The UI is broken down into reusable rendering functions/classes.

## How to Run

### Prerequisites
* [Docker](https://www.docker.com/) installed on your machine.

### Installation & Startup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/SebastianPagacz/piu-zaliczenie.git](https://github.com/SebastianPagacz/piu-zaliczenie.git)
    cd piu-zaliczenie
    ```

2.  **Build the Docker image:**
    (This step creates the environment for the backend server)
    ```bash
    docker build -t my-json-server .
    ```

3.  **Run the container:**
    Start the backend server on port 3000.
    ```bash
    docker run -p 3000:3000 -v ${PWD}:/app my-json-server
    ```
    *(Note: On Windows PowerShell, use `${PWD}`, on cmd use `%cd%`, on Linux/Mac use `$(pwd)`)*

4.  **Launch the Application:**
    Simply open the `index.html` file in your preferred browser (or use a simple live-server extension).

## Project Structure
```text
/
├── src/              # Source files (JS components, utils)
├── assets/           # Images and static files
├── styles/           # CSS/SCSS files
├── db.json           # Database simulation file
├── Dockerfile        # Docker configuration
├── index.html        # Main entry point
└── README.md
