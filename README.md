For access denied: icacls "users.csv" /grant Everyone:F /T

#Task Management System API

Overview

The Task Management System API is a RESTful API built with Node.js, Express, Sequelize, and PostgreSQL. It allows users to manage tasks, projects, and assignments efficiently.

Features

User authentication (JWT-based login & registration)

CRUD operations for tasks, projects, and users

Task assignment to users

Comments on tasks

Task prioritization and status management

Technologies Used

Node.js (Runtime environment)

Express.js (Backend framework)

Sequelize (ORM for PostgreSQL)

PostgreSQL (Database)

JWT (JSON Web Token) (Authentication)

bcrypt (Password hashing)

Nodemon (Development auto-restart tool)

Installation & Setup

Prerequisites

Node.js & npm installed

PostgreSQL installed and running

Clone Repository

git clone https://github.com/mahbuba18/task-management-system-api.git
cd task-management-system-api

Install Dependencies

npm install

Configure Environment Variables

Create a .env file in the root directory and add:

PORT=5000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=task_management_db
JWT_SECRET=your_jwt_secret

Run Database Migrations

npx sequelize db:migrate

Start the Server

npm start

The API will run on http://localhost:5000

API Endpoints

Authentication Routes

Method

Endpoint

Description

POST

/auth/register

Register a new user

POST

/auth/login

Authenticate user

User Routes

Method

Endpoint

Description

GET

/users

Get all users

GET

/users/:id

Get a single user

PUT

/users/:id

Update user details

DELETE

/users/:id

Delete a user

Project Routes

Method

Endpoint

Description

GET

/projects

Get all projects

POST

/projects

Create a new project

GET

/projects/:id

Get project details

PUT

/projects/:id

Update project

DELETE

/projects/:id

Delete a project

Task Routes

Method

Endpoint

Description

GET

/tasks

Get all tasks

POST

/tasks

Create a new task

GET

/tasks/:id

Get task details

PUT

/tasks/:id

Update task information

DELETE

/tasks/:id

Delete a task

Comment Routes

Method

Endpoint

Description

POST

/tasks/:id/comments

Add comment to task

GET

/tasks/:id/comments

Get all comments

Authentication with JWT

When a user logs in, they receive a JWT token.

This token must be included in the Authorization header as:

Authorization: Bearer <your_token>

Protected routes will deny access without a valid token.

Example Request

Register a User

curl -X POST http://localhost:5000/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'

Create a Task (Authenticated)

curl -X POST http://localhost:5000/tasks \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{"title": "New Task", "description": "Complete API", "project_id": 1, "status_id": 1, "priority_id": 2, "due_date": "2025-02-20"}'

Error Handling

400 Bad Request: Invalid input data

401 Unauthorized: Invalid or missing token

403 Forbidden: No permission to access

404 Not Found: Resource does not exist

500 Internal Server Error: Server issues

Contributors

Mahbuba18 (Owner & Developer)

License

This project is licensed under the MIT License.


