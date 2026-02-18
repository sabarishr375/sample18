# Campus Resource Booking System

A full-stack application for managing campus resource bookings (Labs, Event Halls, Smart Classrooms).

## Tech Stack

### Backend
- Spring Boot 3.x (Java 17)
- Spring Data JPA
- Spring Security with JWT
- PostgreSQL (Supabase)
- Maven

### Frontend
- React 18 with Vite
- React Router
- Axios
- Context API
- Tailwind CSS

## Setup Instructions

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.8+
- Supabase account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Configure Supabase connection in `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://[YOUR_SUPABASE_HOST]:5432/postgres
spring.datasource.username=[YOUR_USERNAME]
spring.datasource.password=[YOUR_PASSWORD]
```

3. Run the application:
```bash
mvn spring-boot:run
```

Backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API base URL in `src/config/axios.js` if needed

4. Start development server:
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

### Database Setup

1. Create a Supabase project
2. Run the SQL schema from `database/schema.sql`
3. Update connection details in backend `application.properties`

## Default Admin Credentials

After running the application, use these credentials to login as admin:
- Email: admin@campus.edu
- Password: Admin@123

## API Documentation

See `postman/Campus-Resource-Booking.postman_collection.json` for complete API collection.

## Features

- User Management (Student, Staff, Admin roles)
- Resource Management (Labs, Event Halls, Smart Classrooms)
- Booking System with approval workflow
- Conflict detection for overlapping bookings
- Role-based access control
- JWT authentication

## Project Structure

```
campus-resource-booking/
├── backend/               # Spring Boot application
├── frontend/             # React application
├── database/             # SQL schemas
├── postman/              # API collection
└── README.md
```
