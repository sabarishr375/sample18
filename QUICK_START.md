# 🚀 Quick Start Guide

## Current Status: Frontend Running ✅

Your frontend is currently running at: **http://localhost:5176/**

## What You Need to Do Next

### 1️⃣ Install Maven (Required for Backend)

**Easiest Method - Using Chocolatey:**
```powershell
# Open PowerShell as Administrator and run:
choco install maven

# Verify installation:
mvn -version
```

**Alternative - Manual Installation:**
- Download: https://maven.apache.org/download.cgi
- Extract and add to PATH
- Restart terminal

### 2️⃣ Setup Supabase Database

1. **Create Account**: Go to https://supabase.com (free tier)
2. **Create Project**: Click "New Project"
3. **Run Schema**: 
   - Open SQL Editor in Supabase dashboard
   - Copy contents from `database/schema.sql`
   - Execute the SQL
4. **Get Credentials**: Settings > Database
   - Host
   - Database name (usually "postgres")
   - Password

### 3️⃣ Configure Backend

Edit `backend/src/main/resources/application.properties`:

```properties
# Replace these with your Supabase credentials
spring.datasource.url=jdbc:postgresql://[YOUR_SUPABASE_HOST]:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=[YOUR_PASSWORD]

# Change this to a secure random string
jwt.secret=your-secure-256-bit-secret-key-change-this
```

### 4️⃣ Start Backend

**Option A - Using Command Line:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Option B - Using Batch File:**
```bash
# Double-click or run:
start-backend.bat
```

**Option C - Using IDE:**
- Open `backend` folder in IntelliJ IDEA or Eclipse
- Run `CampusResourceBookingApplication.java`

Backend will start at: **http://localhost:8080**

### 5️⃣ Access the Application

Frontend is already running at: **http://localhost:5176/**

Once backend is running:

1. **Open Browser**: http://localhost:5176/
2. **Login as Admin**:
   - Email: `admin@campus.edu`
   - Password: `Admin@123`
3. **Or Register**: Create a new student account

## 🎯 Test the Complete Workflow

1. **Register a Student Account**
   - Click "Register" on login page
   - Fill in details (use .edu email)
   - Password must have letters, numbers, special chars

2. **Browse Resources**
   - View 8 Labs, 4 Event Halls, 10 Smart Classrooms
   - Filter by type

3. **Create a Booking**
   - Select a resource
   - Choose date and time
   - Submit booking (status: PENDING)

4. **Login as Admin**
   - Logout and login with admin credentials
   - Go to Admin Panel
   - View pending bookings

5. **Approve/Reject Booking**
   - Click Approve or Reject
   - For rejection, provide a reason
   - Student will see updated status

## 📋 Available Scripts

### Frontend (Already Running)
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend (After Maven Installation)
```bash
cd backend
mvn clean install    # Build project
mvn spring-boot:run  # Start server
mvn test            # Run tests
```

## 🔍 API Endpoints

Once backend is running, test with Postman:

1. Import: `postman/Campus-Resource-Booking.postman_collection.json`
2. Set baseUrl: `http://localhost:8080/api`
3. Login to get JWT token
4. Test all endpoints

### Key Endpoints:
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/resources` - List resources
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my` - My bookings
- `GET /api/bookings/pending` - Pending (Admin)
- `PUT /api/bookings/{id}/approve` - Approve (Admin)
- `PUT /api/bookings/{id}/reject` - Reject (Admin)

## 🎨 Features Overview

### For Students
- Self-registration
- Browse resources by type
- Book available slots
- View booking history
- See approval status
- Max 2 bookings per day

### For Staff
- Same as students
- Max 4 bookings per day

### For Admin
- Approve/reject bookings
- Provide rejection reasons
- Manage user status
- View all users
- Override booking limits

## 🛠️ Troubleshooting

**Frontend not loading?**
- Check if it's running: http://localhost:5176/
- Restart: Stop process and run `npm run dev` in frontend folder

**Backend connection error?**
- Ensure backend is running on port 8080
- Check console for errors
- Verify Supabase credentials

**Database connection failed?**
- Verify Supabase credentials in application.properties
- Check if IP is allowed in Supabase settings
- Ensure schema.sql was executed

**Port conflicts?**
- Frontend auto-selects available port
- Backend port can be changed in application.properties

## 📚 Documentation Files

- `README.md` - Project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `INSTALLATION_NOTES.md` - Maven installation help
- `CURRENT_STATUS.md` - Current project status
- `QUICK_START.md` - This file

## 🎉 Success Indicators

You'll know everything is working when:

✅ Frontend loads at http://localhost:5176/
✅ Backend console shows "Started CampusResourceBookingApplication"
✅ You can login with admin@campus.edu
✅ Resources page shows 22 resources
✅ You can create and approve bookings

## 💡 Tips

- Keep both terminal windows open (frontend & backend)
- Use Postman for API testing
- Check browser console for frontend errors
- Check terminal for backend errors
- Admin account is created automatically on first run

## 🆘 Need Help?

1. Check if Java, Node.js, and Maven are installed
2. Verify Supabase database is configured
3. Check application.properties has correct credentials
4. Look for error messages in terminal/console
5. Review the detailed SETUP_GUIDE.md

---

**Current Status**: Frontend running on port 5176 ✅
**Next Step**: Install Maven and start backend 🚀
