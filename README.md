# Nodemy: Edtech Course Platform

**Live API:** [Nodemy 📚](https://nodemy-3j53.onrender.com)  
**Status:** Production-Ready 

## 🚀 Project Overview
Nodemy is a high-performance backend system for an Edtech platform. It demonstrates **Role-Based Access Control (RBAC)** and a secure **Asynchronous Payment Workflow**. Built with the **PEN Stack** (PostgreSQL, Express, Node.js), it focuses on architectural soundness, data integrity, and production-oriented security.

## 🛠️ Tech Stack
* **Language:** Node.js (JavaScript/ES6+)
* **Framework:** Express.js
* **Database:** PostgreSQL (Relational)
* **Authentication:** JWT (Stateless)
* **Security:** Bcrypt (Hashing), Express-Validator (Sanitization)

## 📡 API Documentation
To ensure ease of testing, I have provided a complete Postman Documentation link. This includes pre-configured environment variables and request examples for all roles (Student, Instructor, Admin).

**[📄 API Documentation](https://documenter.getpostman.com/view/48552920/2sBXiesDwA)**

## 🏗️ Database Architecture
The system uses a relational PostgreSQL schema designed for strict data integrity. Key features include:

* **ENUM Types:** Used for `user_role` (`student`, `instructor`, `admin`) and `transaction_status` (`pending`, `completed`, `failed`) to prevent invalid states at the database level.
* **Relational Mapping:** Clean separation between `app_users`, `courses`, `enrollments` (Join table), and `transactions`.

## 🛡️ Role-Based Access Control (RBAC) Logic
The security architecture follows a **Double-Gatekeeper** strategy:

1. **Authentication Middleware:** Verifies the user's "Passport" (JWT).
2. **Authorization Middleware:** A higher-order function `authorize(['roles'])` that checks if the user's role has the "Clearance" required for a specific route.
   * *Example:* Only an `instructor` can access the `/courses/upload` endpoint.

## 💳 Payment Workflow (Asynchronous Simulation)
The checkout process is built as a **State Machine** to reflect real-world banking delays and failure scenarios:

1. **Pending State:** A transaction record is immediately created to ensure idempotency.
2. **Simulation:** An asynchronous `Promise` simulates network latency (3 seconds).
3. **Atomic Resolution:** Using PostgreSQL Transactions (`BEGIN`/`COMMIT`), the system either confirms the payment and grants course access simultaneously or performs a `ROLLBACK` on failure.

## ⚙️ Setup & Installation

**1. Clone & Install:**
```bash
git clone https://github.com/Abdullah-Aakukara/Nodemy.git
cd nodemy
npm install
```

**2. Environment Setup:**
Create a .env file in the root directory with the following variables:
```bash
PORT=3000
DB_USER=postgresUser
DB_PASSWORD=databasePassword
DB_NAME=databaseName
DB_HOST=5432
JWT_SECRET=yourSecretJwt
```
**3. Run Development:**
```bash
npm run dev
```