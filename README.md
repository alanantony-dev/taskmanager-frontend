Task Manager API (Node.js + Express + MongoDB)

A simple and secure Task Manager REST API built using Node.js, Express, MongoDB, and JWT authentication.
This API allows users to sign up, log in, and manage tasks (CRUD operations).

🚀 Live API Base URL
https://taskmanager-backend-i6lw.onrender.com

📌 Features
User Signup & Login (JWT Authentication)
Create Tasks
Read Tasks (User-specific)
Update Tasks
Delete Tasks
MongoDB Atlas Integration
Secure Password Hashing (bcrypt)

🛠️ Tech Stack
Node.js
Express.js
MongoDB Atlas
Mongoose
JSON Web Token (JWT)
bcryptjs
Render (Deployment)

API endpoints
Auth
| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | `/api/auth/signup` | Register a new user   |
| POST   | `/api/auth/login`  | Login & get JWT token |

Tasks
| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | Get all tasks     |
| POST   | `/api/tasks`     | Create a new task |
| PUT    | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |

🔐 Environment Variables
create a .env file
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

▶️ Run Locally
npm install
npm run dev

API runs at:
http://localhost:5000

📁Project Structure
src/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── middlewares/
 ├── config/
server.js

🌐 Deployment
Backend hosted on Render (free tier).
Auto-deploys on every git push.
