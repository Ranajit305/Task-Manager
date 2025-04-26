# Task Manager App

A simple Task Manager full-stack application where users can:

1. Create Projects
2. Add Tasks to Projects
3. Update Task Status (Ongoing, Paused, Completed)
4. Delete Tasks
5. Secure Authentication (Login / Register) with JWT
6. Logout functionality
7. Fully working Frontend + Backend
8. Cookies handled securely (cross-origin with SameSite: 'None')

---

## Tech Stack

1. **Frontend:** React (Vite)
2. **Backend:** Node.js + Express
3. **Database:** MongoDB (Mongoose)
4. **Hosting:**
   - Frontend on Vercel
   - Backend on Railway

---

## How to run the project locally

Clone the repository

```bash
git clone https://github.com/Ranajit305/Task-Manager.git
cd Task-Manager

## Setup the Backend
  cd backend
  npm install

Create a .env file inside /backend folder:
  PORT=5000
  MONGO_DB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  FRONTEND_URL=http://localhost:5173
  
Run the backend:
  npm run dev
   The server will run at http://localhost:5000

## Setup the Frontend
  cd frontend
  npm install

VITE_BACKEND_URL=http://localhost:5000

Run the frontend:
  npm run dev
