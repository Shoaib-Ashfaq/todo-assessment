# todo-assessment

This project is a full-stack todo application with a React front-end and a Node.js back-end.

## Getting Started

To get the application up and running, you will need to clone the repository and set up both the front-end and the back-end services.

### Clone the Repository

```bash
git clone git@github.com:Shoaib-Ashfaq/todo-assessment.git
cd todo-assessment
```

### Prerequisites

- Node.js and npm installed on your machine.
- A MongoDB database instance (local or cloud).

### Backend Setup

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Duplicate the `env.example` file and rename it to `.env`.
    ```bash
    cp env.example .env
    ```

4.  **Configure environment variables:**
    Open the `.env` file and add the necessary environment variables, such as your MongoDB connection string and a JWT secret.
    ```
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    ```

5.  **Start the server:**
    For development with auto-reloading:
    ```bash
    npm run dev
    ```
    To run in production mode:
    ```bash
    npm start
    ```
    The back-end server will be running on the port specified in your `.env` file (e.g., `http://localhost:5000`).

### Frontend Setup

1.  **Navigate to the front-end directory:**
    ```bash
    cd front-end
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Duplicate the `env.exapmle` file and rename it to `.env`.
    ```bash
    cp env.exapmle .env
    ```

4.  **Configure environment variables:**
    Open the `.env` file and add the necessary environment variables.
    ```
    VITE_BACKEND_URL=<your_backend_url>
    ```

5.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The front-end application will be running on `http://localhost:5173` by default (check your terminal output for the exact URL).

---