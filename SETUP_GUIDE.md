# Campus Resource Booking System - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Java 17 or higher
- Maven 3.8+
- Node.js 18+ and npm
- A Supabase account (free tier works)

## Step 1: Database Setup (Supabase)

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be provisioned
3. Go to the SQL Editor in your Supabase dashboard
4. Copy the contents of `database/schema.sql` and execute it
5. Note down your database credentials:
   - Host: Found in Settings > Database > Host
   - Database: postgres
   - Username: postgres
   - Password: Your database password

## Step 2: Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Open `src/main/resources/application.properties`

3. Update the database connection details:
   ```properties
   spring.datasource.url=jdbc:postgresql://[YOUR_SUPABASE_HOST]:5432/postgres
   spring.datasource.username=postgres
   spring.datasource.password=[YOUR_PASSWORD]
   ```

4. Update the JWT secret (use a strong random string):
   ```properties
   jwt.secret=your-256-bit-secret-key-change-this-in-production
   ```

## Step 3: Start the Backend

From the backend directory:

```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

You should see console output indicating:
- Database connection successful
- 22 resources initialized (8 labs, 4 halls, 10 classrooms)
- Admin user created: admin@campus.edu / Admin@123

## Step 4: Frontend Configuration

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) If your backend runs on a different port, update `src/config/axios.js`:
   ```javascript
   baseURL: 'http://localhost:8080/api'
   ```

## Step 5: Start the Frontend

From the frontend directory:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Step 6: Test the Application

1. Open your browser and go to `http://localhost:5173`

2. Login as admin:
   - Email: admin@campus.edu
   - Password: Admin@123

3. Test the workflow:
   - Register a new student account
   - Browse resources
   - Create a booking
   - Login as admin and approve/reject the booking

## API Testing with Postman

1. Import the Postman collection from `postman/Campus-Resource-Booking.postman_collection.json`

2. Set the environment variable:
   - `baseUrl`: http://localhost:8080/api

3. Login to get a token:
   - Use the "Login" request
   - Copy the token from the response
   - Set it in the `token` variable

4. Test all endpoints with the token

## Troubleshooting

### Backend Issues

**Database Connection Failed:**
- Verify Supabase credentials
- Check if your IP is allowed in Supabase settings
- Ensure PostgreSQL port (5432) is accessible

**Port 8080 Already in Use:**
- Change the port in `application.properties`:
  ```properties
  server.port=8081
  ```
- Update frontend axios config accordingly

### Frontend Issues

**Cannot Connect to Backend:**
- Ensure backend is running on port 8080
- Check CORS configuration in SecurityConfig.java
- Verify axios baseURL in `src/config/axios.js`

**Port 5173 Already in Use:**
- Change the port in `vite.config.js`:
  ```javascript
  server: { port: 5174 }
  ```

## Default Credentials

**Admin:**
- Email: admin@campus.edu
- Password: Admin@123

**Test Student (create via registration):**
- Use any email ending with .edu
- Password must contain letters, numbers, and special characters

## Features to Test

1. User Registration (Student self-registration)
2. User Login (All roles)
3. Resource Browsing (All authenticated users)
4. Booking Creation (Students and Staff)
5. Booking Limits (2 per day for students, 4 for staff)
6. Conflict Detection (Overlapping time slots)
7. Admin Approval/Rejection
8. User Status Management (Admin only)

## Production Deployment Notes

Before deploying to production:

1. Change JWT secret to a strong random value
2. Update CORS allowed origins in SecurityConfig.java
3. Set `spring.jpa.hibernate.ddl-auto=validate` in production
4. Use environment variables for sensitive data
5. Enable HTTPS
6. Set up proper logging
7. Configure database connection pooling
8. Add rate limiting
9. Implement proper error handling
10. Add monitoring and alerting

## Support

For issues or questions:
- Check the README.md for general information
- Review the API documentation in Postman collection
- Verify all prerequisites are installed correctly
