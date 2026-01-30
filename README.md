Secure Rate-Limited Task Management API
A secure and scalable RESTful API for task management, built with Node.js, Express, Sequelize, and MySQL.
This project emphasizes security-first design, clean architecture, and full auditability—aligned with real-world backend best practices.
________________________________________
🚀 Features
•	JWT-based authentication (Access & Refresh Tokens)
•	Role-based authorization (USER )
•	Rate limiting (5 requests per minute per IP)
•	Secure CRUD operations for tasks
•	Centralized logging system for auditing user actions
•	Strong input validation and sanitization
•	Protection against SQL Injection and common security vulnerabilities
________________________________________
🛠 Tech Stack
•	Node.js
•	Express.js
•	Sequelize ORM
•	MySQL
•	JWT (jsonwebtoken)
•	Joi (Validation)
•	bcrypt
•	express-rate-limit
________________________________________
📂 Database Schema Overview
Users
•	id
•	name
•	email (unique)
•	password (hashed)
•	role (ENUM: USER, ADMIN)
•	isVerified
•	createdAt / updatedAt
Tasks
•	id
•	title
•	description
•	status (ENUM: pending, in_progress, completed)
•	dueDate
•	user_id (FK → Users)
•	createdAt / updatedAt
Logs
•	id
•	action (CREATE_TASK, UPDATE_TASK, DELETE_TASK, USER_LOGIN, etc.)
•	description
•	targetType (task, login, etc.)
•	targetId (ID of affected entity)
•	user_id (FK → Users)
•	task_id (FK → Tasks, nullable)
•	createdAt / updatedAt
The Logs table is designed for auditability and traceability, even after related tasks are deleted.
________________________________________
🔐 Authentication & Authorization
•	JWT-based authentication using Access Token and Refresh Token
•	Protected routes require a valid access token
•	Role-based authorization middleware restricts access based on user role
Roles: - USER → Manage own tasks
________________________________________
⏱ Rate Limiting
To protect the API from abuse and brute-force attacks:
•	Limit: 5 requests per minute per IP
•	Implemented using express-rate-limit
•	Exceeding the limit returns a friendly error message
{
  "message": "Too many requests, please try again later"
}
The rate limiter rejects requests after the limit is exceeded and does not permanently block users.
________________________________________
🛡 Security Measures
•	Input Validation: Joi schemas validate all incoming requests
•	Input Sanitization: Trimmed and sanitized string inputs
•	SQL Injection Protection: Sequelize ORM with parameterized queries
•	Password Security: bcrypt hashing with salt
•	Generic Error Messages: Prevent sensitive information leakage
•	Audit Logging: All critical actions are logged
Example sanitization:
Joi.string().trim().escape()
________________________________________
📌 API Endpoints Overview
Auth
•	POST /auth-user/signup
•	POST /auth-user/signin
Tasks
•	POST /tasks → Create task
•	GET /tasks → Get all user tasks
•	GET /tasks/:id → Get single task
•	PUT /tasks/:id → Update task
•	DELETE /tasks/:id → Delete task
________________________________________
🧪 API Testing
All APIs were tested using Postman with different scenarios: - Valid requests - Unauthorized access - Rate limit exceeded - Invalid input validation
________________________________________
📝 Logging Example
When a user creates a task, a log is automatically generated:
{
  "action": "CREATE_TASK",
  "targetType": "task",
  "targetId": 4,
  "user_id": 2
}
________________________________________
📦 Installation & Setup
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
Create a .env file:
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=

JWT_ACCESS_TOKEN_SECRETKEY_LOGIN=
JWT_REFRESH_TOKEN_SECRETKEY_LOGIN=
JWT_ACCESS_TOKEN_EXP_LOGIN=
JWT_REFRESH_TOKEN_EXP_LOGIN=

SALT=10
Run the project:
npm run dev
________________________________________
🧠 Design Decisions
•	ORM-based queries were chosen to prevent SQL injection
•	Logs table ensures traceability and audit readiness
•	Rate limiting mitigates abuse and brute-force attacks
•	Incremental commits reflect a real-world development workflow
________________________________________
🔍 Security Considerations
This API was designed with security-first principles, including strict validation, sanitization, controlled access, rate limiting, and audit logging.
________________________________________
👨‍💻 Author
Developed by Ahmed shaban
Backend Developer
________________________________________
✅ Notes for Reviewers
•	The project was developed incrementally with a clear and meaningful commit history
•	Focused on security, validation, and clean architecture
•	Designed to reflect production-ready backend systems
