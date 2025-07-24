# todo-assessment

This project is a full-stack todo application with a React front-end and a Node.js back-end.

## Getting Started

To get the application up and running, you will need to clone the repository and set up both the front-end and the back-end services.

### Clone the Repository

```bash
git clone https://github.com/Shoaib-Ashfaq/todo-assessment.git
cd todo-assessment
```

### Prerequisites

- Node.js (version 20+) and npm installed on your machine.
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

## Libraries and Packages Used

### Backend

- **bcryptjs**: For hashing passwords to store them securely.
- **cookie-parser**: To parse cookies attached to the client request object.
- **cors**: To enable Cross-Origin Resource Sharing, allowing the front-end to communicate with the back-end.
- **dotenv**: To load environment variables from a `.env` file.
- **express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **jsonwebtoken**: For creating and verifying JSON Web Tokens (JWT) for authentication.
- **mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
- **nodemon**: A tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

### Frontend

- **@hello-pangea/dnd**: For implementing drag and drop functionality.
- **@tailwindcss/vite**: For integrating the Tailwind CSS framework with Vite.
- **axios**: A promise-based HTTP client for the browser and node.js, used to make requests to the back-end API.
- **lucide-react**: A library of simply designed, beautiful icons.
- **react**: A JavaScript library for building user interfaces.
- **react-dom**: Serves as the entry point to the DOM and server renderers for React.
- **react-router-dom**: For handling routing in the React application.
- **tailwindcss**: A utility-first CSS framework for rapidly building custom user interfaces.
