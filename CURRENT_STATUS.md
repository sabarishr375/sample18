# Campus Resource Booking System - Current Status

## ✅ What's Working

### Frontend
- **Status**: Running successfully
- **URL**: http://localhost:5176/
- **Dependencies**: All installed (157 packages)
- **Framework**: React 18 + Vite + Tailwind CSS

### System Requirements
- ✅ Java 25.0.2 installed
- ✅ Node.js 24.11.1 installed
- ✅ npm 11.6.2 installed

## ⚠️ What Needs Setup

### Backend
- **Status**: Not running (Maven required)
- **Issue**: Maven is not installed on your system
- **Required**: Install Maven to build and run the Spring Boot backend

### Database
- **Status**: Schema ready, needs Supabase configuration
- **File**: `database/schema.sql` is ready to execute
- **Required**: Create Supabase project and configure connection

## 🚀 Next Steps

### Step 1: Install Maven

Choose one option:

**Option A - Using Chocolatey (Easiest):**
```powershell
# Run PowerShell as Administrator
choco install maven
```

**Option B - Manual Download:**
1. Download from: https://maven.apache.org/download.cgi
2. Extract and add to PATH
3. Restart terminal

**Option C - Use IDE:**
- Open backend folder in IntelliJ IDEA or Eclipse
- IDE will handle Maven automatically

### Step 2: Setup Supabase Database

1. Go to https://supabase.com and create a free project
2. In SQL Editor, run the contents of `database/schema.sql`
3. Get your database credentials from Settings > Database
4. Update `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://[YOUR_HOST]:5432/postgres
   spring.datasource.username=postgres
   spring.datasource.password=[YOUR_PASSWORD]
   ```

### Step 3: Start Backend

After Maven is installed:
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will start on: http://localhost:8080

### Step 4: Access the Application

1. Frontend is already running: http://localhost:5176/
2. Once backend starts, you can:
   - Register as a student
   - Login as admin: admin@campus.edu / Admin@123
   - Browse and book resources
   - Manage bookings (admin)

## 📁 Project Structure

```
campus-resource-booking/
├── backend/                    # Spring Boot application
│   ├── src/main/java/         # Java source code
│   │   └── com/campus/booking/
│   │       ├── entity/        # JPA entities
│   │       ├── dto/           # Data transfer objects
│   │       ├── repository/    # Data access layer
│   │       ├── service/       # Business logic
│   │       ├── controller/    # REST endpoints
│   │       ├── security/      # JWT & Spring Security
│   │       └── config/        # Configuration classes
│   ├── src/main/resources/    # Configuration files
│   └── pom.xml               # Maven dependencies
│
├── frontend/                  # React application (RUNNING)
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # Auth context
│   │   └── config/           # Axios configuration
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── schema.sql            # PostgreSQL schema
│
├── postman/
│   └── Campus-Resource-Booking.postman_collection.json
│
├── README.md                 # Main documentation
├── SETUP_GUIDE.md           # Detailed setup instructions
├── INSTALLATION_NOTES.md    # Maven installation guide
└── CURRENT_STATUS.md        # This file

```

## 🎯 Features Implemented

### User Management
- ✅ Student self-registration
- ✅ JWT authentication
- ✅ BCrypt password encryption
- ✅ Role-based access (Student, Staff, Admin)
- ✅ User status management

### Resource Management
- ✅ 8 Labs (AI, ML, IoT, Cloud, Cyber Security, Data Science, Robotics, Networking)
- ✅ 4 Event Halls (Main Auditorium, Seminar Halls A & B, Conference Hall)
- ✅ 10 Smart Classrooms (SCR 1-10)
- ✅ Auto-initialization on startup

### Booking System
- ✅ Create booking requests
- ✅ Conflict detection (overlapping time slots)
- ✅ Daily limits (2 for students, 4 for staff)
- ✅ Admin approval/rejection workflow
- ✅ Rejection with reason
- ✅ Booking history

### Validations
- ✅ No past date bookings
- ✅ End time must be after start time
- ✅ Only active users can book
- ✅ Only active resources can be booked
- ✅ Duplicate booking prevention

## 🔧 Troubleshooting

### Frontend Issues
If you need to restart the frontend:
```bash
# Stop the current process
# Then run:
cd frontend
npm run dev
```

### Port Conflicts
- Frontend auto-selected port 5176 (5173-5175 were in use)
- Backend will use port 8080 (configurable in application.properties)

### Database Connection
Make sure to:
1. Create Supabase project
2. Run schema.sql in SQL Editor
3. Update connection details in application.properties
4. Allow your IP in Supabase settings

## 📞 Support

- Check README.md for overview
- Check SETUP_GUIDE.md for detailed setup
- Check INSTALLATION_NOTES.md for Maven installation
- Import Postman collection for API testing

## 🎉 Once Everything is Running

You'll have a complete full-stack application with:
- Modern React frontend with Tailwind CSS
- Secure Spring Boot backend with JWT
- PostgreSQL database on Supabase
- Role-based access control
- Complete booking workflow
- Admin management panel

Default admin credentials:
- Email: admin@campus.edu
- Password: Admin@123
