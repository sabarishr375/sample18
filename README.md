# Campus Resource Booking System

A full-stack application for managing campus resource bookings (Labs, Event Halls, Smart Classrooms).

## Tech Stack

### Backend
- Spring Boot 3.x (Java 21)
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

## Features

### User Management
- Three roles: Student, Staff, Admin
- Admin-only user creation (no public registration)
- Single device login (auto-logout from other devices)
- Role-based access control
- JWT authentication

### Booking System
- Resource types: Labs (8), Event Halls (4), Smart Classrooms (10)
- Booking approval workflow (Admin approval required)
- Real-time availability check
- Conflict detection for overlapping bookings
- Duration limits:
  - Students: 1 hour max per booking
  - Staff: 3 hours max per booking
- Daily limits:
  - Students: 2 bookings per day
  - Staff: 4 bookings per day
- Weekly limits:
  - Students: 3 bookings per week
  - Staff: 5 bookings per week

### Session Management
- Auto-logout after inactivity:
  - Students: 10 minutes
  - Staff: 20 minutes
  - Admin: No timeout
- Session timer displayed for Students/Staff
- Activity tracking (mouse, keyboard, scroll)

### Admin Features
- Approve/Reject bookings with reasons
- Create users (Student/Staff/Admin)
- Add new resources
- View all users and bookings
- No booking limits

## Setup Instructions

### Prerequisites
- Java 21
- Node.js 18+
- Maven 3.9+
- Supabase account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Configure Supabase connection in `src/main/resources/application.properties`:
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

3. Start development server:
```bash
npm run dev
```

Frontend will start on `http://localhost:5173` or `http://localhost:5174`

### Database Setup

1. Create a Supabase project
2. Run the SQL schema from `database/schema.sql`
3. Update connection details in backend `application.properties`
4. On first run, sample users and resources will be created automatically

## Default Credentials

### Admin
- Email: admin@ksrce.ac.in
- Password: Admin@123
- Login URL: http://localhost:5174/admin-login

### Students (10 users)
- Email: raj@ksrce.ac.in, suraj@ksrce.ac.in, abi@ksrce.ac.in, etc.
- Password: Student@123
- Login URL: http://localhost:5174/login (Select "Student" role)

### Staff (6 users)
- Email: drkumar@ksrce.ac.in, proflakshmi@ksrce.ac.in, etc.
- Password: Staff@123
- Login URL: http://localhost:5174/login (Select "Staff" role)

See `DEFAULT_USERS_CREDENTIALS.md` for complete list.

## API Documentation

See `postman/Campus-Resource-Booking.postman_collection.json` for complete API collection.

### Key Endpoints

**Authentication:**
- POST `/api/auth/login` - Login
- POST `/api/auth/register` - Register (disabled)

**Bookings:**
- POST `/api/bookings` - Create booking
- GET `/api/bookings/my` - Get user's bookings
- GET `/api/bookings/pending` - Get pending bookings (Admin)
- GET `/api/bookings/check-availability` - Check slot availability
- PUT `/api/bookings/{id}/approve` - Approve booking (Admin)
- PUT `/api/bookings/{id}/reject` - Reject booking (Admin)

**Resources:**
- GET `/api/resources` - Get all resources
- POST `/api/resources` - Add resource (Admin)

**Users:**
- GET `/api/users` - Get all users (Admin)
- POST `/api/users/create` - Create user (Admin)

## Project Structure

```
campus-resource-booking/
├── backend/
│   ├── src/main/java/com/campus/booking/
│   │   ├── config/          # Data initialization
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Data transfer objects
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data repositories
│   │   ├── security/        # JWT & Security config
│   │   └── service/         # Business logic
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   └── src/
│       ├── components/      # Reusable components
│       ├── config/          # Axios configuration
│       ├── context/         # Auth context
│       └── pages/           # Page components
├── database/
│   └── schema.sql          # Database schema
├── postman/                # API collection
└── Documentation files (.md)
```

## Documentation Files

- `DEFAULT_USERS_CREDENTIALS.md` - All default user credentials
- `BOOKING_DURATION_AND_AVAILABILITY.md` - Booking limits and availability
- `BOOKING_LIMITS_AND_SINGLE_SESSION.md` - Session management
- `SEPARATE_LOGIN_GUIDE.md` - Login system guide
- `LOGIN_TROUBLESHOOTING.md` - Login issues and solutions
- `SETUP_GUIDE.md` - Detailed setup instructions

## Security Features

- JWT token-based authentication
- Password encryption with BCrypt
- Role-based access control
- CORS configuration
- Single device login enforcement
- Session token validation
- Protected routes

## Business Rules

1. Only admin can create users (no public registration)
2. Only admin can approve/reject bookings
3. Students and staff bookings require admin approval
4. Overlapping bookings are prevented
5. Past date bookings are not allowed
6. Weekly and daily booking limits enforced
7. Duration limits based on role
8. Single device login per user
9. Auto-logout after inactivity (except admin)

## Technologies Used

- **Backend:** Spring Boot, Spring Security, Spring Data JPA, JWT, Lombok
- **Frontend:** React, React Router, Axios, Tailwind CSS
- **Database:** PostgreSQL (Supabase)
- **Build Tools:** Maven, Vite
- **Version Control:** Git

## License

This project is for educational purposes.

## Author

Sabarish R

