# Task Manager - MERN Stack Application

A modern, full-stack Task Manager web application built with the MERN stack (MongoDB, Express, React, Node.js). Features a clean UI with Tailwind CSS, toast notifications, input validation, and comprehensive error handling.

## Features

- ✅ Add new tasks with validation
- ✅ View all tasks in a clean list
- ✅ Delete tasks with confirmation
- ✅ Real-time toast notifications
- ✅ Loading states and error handling
- ✅ Responsive design with Tailwind CSS
- ✅ Input validation (frontend & backend)
- ✅ Modern ES6+ module syntax

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **ES Modules** - Modern JavaScript modules

## Project Structure

```
Task Manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main application component
│   │   ├── main.jsx       # React entry point
│   │   ├── index.css      # Global styles with Tailwind
│   │   └── services/
│   │       └── api.js     # API service layer
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                 # Express backend
│   ├── models/
│   │   └── Task.js        # Task Mongoose model
│   ├── routes/
│   │   └── taskRoutes.js  # Task API routes
│   ├── server.js          # Express server entry point
│   └── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Task Manager"
```

### 2. Backend Setup

1. Navigate to the server directory:
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
MONGODB_URI=mongodb://localhost:27017/taskmanager
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
```

4. Start the backend server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

1. Open a new terminal and navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file in the `client` directory if you need to change the API URL:
```bash
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Tasks
- **Method:** `GET`
- **Endpoint:** `/api/tasks`
- **Description:** Retrieve all tasks
- **Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "task_id",
      "title": "Task title",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### 2. Create a Task
- **Method:** `POST`
- **Endpoint:** `/api/tasks`
- **Description:** Add a new task
- **Request Body:**
```json
{
  "title": "Task title"
}
```
- **Response:**
```json
{
  "success": true,
  "data": {
    "_id": "task_id",
    "title": "Task title",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Task created successfully"
}
```
- **Validation:**
  - Title is required
  - Title must be a non-empty string
  - Title must not exceed 200 characters

#### 3. Delete a Task
- **Method:** `DELETE`
- **Endpoint:** `/api/tasks/:id`
- **Description:** Delete a task by ID
- **Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "_id": "task_id",
    "title": "Task title"
  }
}
```

#### 4. Working Check
- **Method:** `GET`
- **Endpoint:** `/api/working`
- **Description:** Check server status
- **Response:**
```json
{
  "status": "OK",
  "message": "Server is working"
}
```

## Task Schema

```javascript
{
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 200
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
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

### Frontend Deployment (Example: Vercel/Netlify)

1. **Build the application:**
   ```bash
   cd client
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

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (if using local MongoDB)
- Check your `MONGODB_URI` in the `.env` file
- Verify network connectivity for MongoDB Atlas

### CORS Issues
- Backend has CORS enabled for all origins in development
- For production, update CORS settings in `server.js`

### Port Already in Use
- Change the `PORT` in the `.env` file
- Or kill the process using the port

## License

ISC

## Author

Task Manager Application - MERN Stack

