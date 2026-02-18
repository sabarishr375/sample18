# ✅ Maven Successfully Installed!

## Installation Details

- **Maven Version**: 3.9.9
- **Maven Home**: C:\Users\sabar\apache-maven
- **Java Version**: 25.0.2
- **Installation Date**: Just now!

## What's Next?

### Step 1: Configure Supabase Database

Before running the backend, you need to set up your database:

1. **Create Supabase Account**: Go to https://supabase.com
2. **Create New Project**: Click "New Project" (free tier is fine)
3. **Run Database Schema**:
   - Open SQL Editor in Supabase dashboard
   - Copy all contents from `database/schema.sql`
   - Execute the SQL script
4. **Get Database Credentials**:
   - Go to Settings > Database in Supabase
   - Note down:
     - Host (e.g., db.xxxxx.supabase.co)
     - Database name (usually "postgres")
     - Password

### Step 2: Update Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Replace with your Supabase credentials
spring.datasource.url=jdbc:postgresql://[YOUR_SUPABASE_HOST]:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=[YOUR_PASSWORD]

# Change this to a secure random string (at least 256 bits)
jwt.secret=your-secure-256-bit-secret-key-change-this-to-something-random
```

### Step 3: Build and Run Backend

Open a NEW terminal/PowerShell window (to load the updated PATH), then run:

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Or simply double-click: `start-backend.bat`

The backend will start on: **http://localhost:8080**

### Step 4: Access the Application

1. **Frontend** is already running at: **http://localhost:5176/**
2. Once backend starts, open your browser to: **http://localhost:5176/**
3. **Login as Admin**:
   - Email: `admin@campus.edu`
   - Password: `Admin@123`

## Current Status

✅ Java 25.0.2 - Installed
✅ Node.js 24.11.1 - Installed
✅ npm 11.6.2 - Installed
✅ Maven 3.9.9 - Installed (Just now!)
✅ Frontend - Running on port 5176
⏳ Backend - Ready to start (needs Supabase config)
⏳ Database - Needs Supabase setup

## Quick Commands

### Start Backend (after Supabase setup):
```bash
cd backend
mvn spring-boot:run
```

### Check Frontend Status:
Frontend is already running at http://localhost:5176/

### Test API (after backend starts):
Import `postman/Campus-Resource-Booking.postman_collection.json` into Postman

## Troubleshooting

**If mvn command not found in new terminal:**
- Close ALL terminal windows
- Open a fresh PowerShell/CMD window
- Try again

**If backend fails to start:**
- Check Supabase credentials in application.properties
- Ensure database schema was executed
- Check if port 8080 is available

## Features Ready to Test

Once everything is running:

1. ✅ User Registration (Students can self-register)
2. ✅ User Login (All roles)
3. ✅ Resource Browsing (22 resources: 8 labs, 4 halls, 10 classrooms)
4. ✅ Booking Creation (Students & Staff)
5. ✅ Booking Approval/Rejection (Admin only)
6. ✅ Conflict Detection (No overlapping bookings)
7. ✅ Daily Limits (2 for students, 4 for staff)
8. ✅ User Management (Admin can activate/deactivate users)

## Success! 🎉

Maven is now installed and ready. Just configure Supabase and you're good to go!

---

**Next Step**: Set up Supabase database and update application.properties
