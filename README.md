# Finance Management Backend API

## Overview

This project is a role-based Finance Management Backend System designed to manage financial data such as income and expenses while providing aggregated insights through dashboard APIs. The system implements secure authentication, role-based access control (RBAC), filtering, pagination, and AI-powered insights. It is fully documented using Swagger (OpenAPI 3.0) and deployed for real-time testing.

---

## Key Features

### 1. User and Role Management

* Create and manage users
* Assign roles: Viewer, Analyst, Admin
* Role-based access control (RBAC)

  * **Viewer**: Can only view dashboard data
  * **Analyst**: Can view records and insights
  * **Admin**: Full access including user and record management
* Update user roles and manage user lifecycle
* Restrict API access based on roles

---

### 2. Authentication & Security

* JWT-based authentication
* Secure login system
* Protected routes using middleware
* Token-based authorization for all sensitive endpoints
* Role-based route protection (Admin / Analyst / Viewer)

---

### 3. Financial Records Management

* Create financial records (income/expense)
* View records with filtering support
* Update existing records
* Delete records
* Structured data model including:

  * Type (income/expense)
  * Amount
  * Category
  * Date
  * Notes/description

---

### 4. Filtering & Pagination

* Filter records based on:

  * Category
  * Type (income/expense)
  * Date range
* Pagination support for efficient data handling:

  * Page number
  * Limit per page
* Enables scalable handling of large datasets

---

### 5. Dashboard Summary APIs

Provides aggregated financial insights instead of just raw data:

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Recent transactions
* Monthly trends

---

### 6. Budget Management

* Set budget for categories
* Retrieve budget details
* Helps compare spending against limits

---

### 7. AI Insights

* Generate insights based on financial data
* Analyze spending patterns
* Provide meaningful summaries for better decision-making

---

### 8. API Documentation (Swagger)

* Fully integrated Swagger UI
* Interactive API testing
* Authorization support via Bearer Token
* Clear grouping of endpoints

---

## Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose)
* **Authentication**: JSON Web Token (JWT)
* **Documentation**: Swagger (OpenAPI 3.0)
* **Deployment**: Render

---

## Project Structure

```id="z3v7l9"
project-root/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── services/
├── utils/
├── swagger.js
├── server.js
├── app.js
└── package.json
```

---

## API Endpoints

### Auth

* POST `/api/auth/login` – Login user

---

### Users

* POST `/api/users` – Create user (Register)
* GET `/api/users` – Get all users (Admin only)
* PUT `/api/users/:id` – Update user (Admin only)
* DELETE `/api/users/:id` – Delete user (Admin only)

---

### Records

* POST `/api/records` – Create record
* GET `/api/records` – Get records with filtering & pagination
* PUT `/api/records/:id` – Update record
* DELETE `/api/records/:id` – Delete record

---

### Budget

* POST `/api/budgets` – Set budget
* GET `/api/budgets` – Get budgets

---

### Dashboard

* GET `/api/dashboard/summary` – Get summary (income, expense, balance)
* GET `/api/dashboard/category-totals` – Category-wise totals
* GET `/api/dashboard/recent` – Recent transactions
* GET `/api/dashboard/monthly-trends` – Monthly trends

---

### AI

* GET `/api/ai/insights` – Generate financial insights

---

## System Workflow

1. Create a user using `/api/users` and assign a role.
2. Login using `/api/auth/login` to receive a JWT token.
3. Authorize using the token for protected endpoints.
4. Based on role:

   * Viewer → Access dashboard data
   * Analyst → View records and insights
   * Admin → Full system control
5. Create and manage financial records.
6. Apply filters and pagination while retrieving records.
7. View aggregated dashboard data.
8. Generate AI-based insights.

---

## Swagger Documentation

Swagger UI is available at:

```
/api-docs
```

### Steps to Test APIs

1. Create a user using `POST /api/users`.
2. Login using `POST /api/auth/login`.
3. Copy the JWT token from the response.
4. Click **Authorize** in Swagger UI.
5. Enter token as:

   ```
   Bearer <your_token>
   ```
6. Use **Try it out** to test endpoints.
7. Verify role-based access and responses.

---

## Deployment

Base URL:

```
https://finance-backend-uazm.onrender.com
```

Swagger UI:

```
https://finance-backend-uazm.onrender.com/api-docs
```

---

## Notes

* User creation is kept public for easier testing.
* Role-based restrictions are enforced across APIs.
* Pagination and filtering improve performance and usability.
* Dashboard APIs demonstrate aggregation logic beyond CRUD operations.
* AI insights enhance analytical capabilities of the system.

---

## Future Enhancements

* Advanced search functionality
* Soft delete for records
* Rate limiting and security enhancements
* Export reports (PDF/CSV)
* Enhanced analytics and visualization support
