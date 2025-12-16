# Task Manager - MERN Stack

## Project Description

The Task Manager is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to manage their tasks efficiently by providing features such as creating, updating, deleting, and viewing tasks.

## Deployment Link: 
https://task-manager-frontend-omega-ten.vercel.app

## Tech Stack

- **Frontend**: React, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Features

- User-friendly interface for managing tasks
- Create, update, delete, and view tasks
- RESTful API for backend operations
- Responsive design

## How to Run the Project

### Prerequisites

- Node.js installed on your system
- MongoDB installed and running locally or a MongoDB Atlas account

**How to Clone the Repository**:

To clone this project from GitHub, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following command:
   ```bash
   git clone <repository-url>
   ```
   Replace `<repository-url>` with the actual URL of the GitHub repository.

For example:

```bash
git clone https://github.com/username/task-manager.git
```

### Backend Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server` directory:
```bash
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory and add the following:

   ```env
   VITE_API_URL=http://localhost:5000/api

   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Access the Application

- Frontend: Open your browser and go to `http://localhost:3000`
- Backend: The server runs on `http://localhost:5000`

4. Navigate into the cloned project directory:
   ```bash
   cd task-manager
   ```

## JSON API Examples

### Get All Tasks

**Endpoint**: `GET /api/tasks`

**Response**:

```json
[
  {
    "_id": "12345",
    "title": "Sample Task",
    "description": "This is a sample task",
    "completed": false
  }
]
```

### Create a Task

**Endpoint**: `POST /api/tasks`

**Request Body**:

```json
{
  "title": "New Task",
  "description": "Details about the task"
}
```

**Response**:

```json
{
  "_id": "67890",
  "title": "New Task",
  "description": "Details about the task",
  "completed": false
}
```

### Delete a Task

**Endpoint**: `DELETE /api/tasks/:id`

**Response**:

```json
{
  "message": "Task deleted successfully"
}
```

## Folder Structure

The project is organized as follows:

```
Task-Manager/
├── client/                 # Frontend code
│   ├── index.html          # Main HTML file
│   ├── package.json        # Frontend dependencies
│   ├── postcss.config.js   # PostCSS configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── vite.config.js      # Vite configuration
│   └── src/                # React application source code
│       ├── App.jsx         # Main React component
│       ├── index.css       # Global CSS styles
│       ├── main.jsx        # React entry point
│       └── services/       # API service files
│           └── api.js      # API configuration
├── server/                 # Backend code
│   ├── package.json        # Backend dependencies
│   ├── server.js           # Main server file
│   ├── config/             # Configuration files
│   │   └── db.js           # Database connection
│   ├── models/             # Mongoose models
│   │   └── Task.js         # Task model
│   └── routes/             # API routes
│       └── taskRoutes.js   # Task-related routes
└── README.md               # Project documentation
```

## Deployment

### Backend Deployment (Example: Heroku/Railway/Render)

1. **Set Environment Variables:**
   - `PORT` (usually auto-assigned by platform)
   - `MONGODB_URI` (your MongoDB connection string)
   - `NODE_ENV=production`

2. **Build Command:** (if needed)
   ```bash
   npm install
   ```

3. **Start Command:**
   ```bash
   npm start
   ```

### Frontend Deployment

1. Choose a hosting service for your frontend, such as Vercel.
2. Build the frontend for production:
   ```bash
   npm run build
   ```

2. **Set Environment Variables:**
   - `VITE_API_URL` - Your backend API URL (e.g., `https://your-api.herokuapp.com/api`)

3. **Deploy the `dist` folder** to your hosting platform

### MongoDB Atlas Setup (Cloud Database)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs in development)
5. Get your connection string and update `MONGODB_URI` in your `.env` file

## Development

### Running in Development Mode

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm run dev
```

### Building for Production

**Frontend:**
```bash
cd client
npm run build
```

The production build will be in the `client/dist` directory.

## Features Implementation

### Input Validation
- **Frontend:** Real-time validation with character count and error messages
- **Backend:** Server-side validation with proper error responses

### Toast Notifications
- Success notifications for task creation and deletion
- Error notifications for failed operations
- Auto-dismiss after 3 seconds

### Loading States
- Loading spinner when fetching tasks
- Disabled buttons during operations
- "Adding..." and "Deleting..." states

### Error Handling
- Comprehensive error messages
- Network error handling
- Validation error display
- User-friendly error messages

