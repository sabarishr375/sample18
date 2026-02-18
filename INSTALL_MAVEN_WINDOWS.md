# Install Maven on Windows - Step by Step

## ✅ Your Database is Already Configured!

Your Supabase credentials have been added to the backend configuration.

## 🎯 Now You Need Maven to Run the Backend

Choose ONE of these methods:

---

## Method 1: Using Chocolatey (EASIEST - Recommended)

### Step 1: Install Chocolatey (if not already installed)

1. **Open PowerShell as Administrator**
   - Press `Win + X`
   - Click "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Run this command:**
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

3. **Wait for installation to complete**

### Step 2: Install Maven

```powershell
choco install maven
```

### Step 3: Verify Installation

Close and reopen PowerShell, then run:
```powershell
mvn --version
```

You should see Maven version information.

---

## Method 2: Manual Installation

### Step 1: Download Maven

1. Go to: https://maven.apache.org/download.cgi
2. Download: **apache-maven-3.9.6-bin.zip** (or latest version)

### Step 2: Extract Maven

1. Extract the ZIP file to: `C:\Program Files\Apache\maven`
2. You should have: `C:\Program Files\Apache\maven\bin\mvn.cmd`

### Step 3: Add to System PATH

1. Press `Win + X` and select "System"
2. Click "Advanced system settings"
3. Click "Environment Variables"
4. Under "System variables", find and select "Path"
5. Click "Edit"
6. Click "New"
7. Add: `C:\Program Files\Apache\maven\bin`
8. Click "OK" on all windows

### Step 4: Verify Installation

1. **Close all PowerShell/CMD windows**
2. Open a new PowerShell
3. Run:
```powershell
mvn --version
```

---

## Method 3: Using IntelliJ IDEA (If you have it)

1. Open IntelliJ IDEA
2. Click "Open" and select the `backend` folder
3. IntelliJ will detect it's a Maven project
4. Wait for dependencies to download
5. Find `CampusResourceBookingApplication.java`
6. Right-click and select "Run"

---

## Method 4: Using Eclipse (If you have it)

1. Open Eclipse
2. File > Import > Maven > Existing Maven Projects
3. Select the `backend` folder
4. Click Finish
5. Wait for dependencies to download
6. Right-click project > Run As > Spring Boot App

---

## After Maven is Installed

### Start the Backend:

**Option A - Command Line:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Option B - Use the Batch File:**
```bash
# Double-click or run:
start-backend.bat
```

### Expected Output:

You should see:
```
Started CampusResourceBookingApplication in X.XXX seconds
Initialized 22 resources
Initialized admin user: admin@campus.edu / Admin@123
```

Backend will be running at: **http://localhost:8080**

---

## Verify Everything Works

### Test Backend API:

Open browser or Postman and test:
```
http://localhost:8080/api/resources
```

You should get a 401 Unauthorized (this is correct - you need to login first)

### Test Full Application:

1. Frontend is already running at: **http://localhost:5176/**
2. Open in browser
3. Click "Register" and create a student account
4. Or login as admin:
   - Email: `admin@campus.edu`
   - Password: `Admin@123`

---

## Troubleshooting

### "mvn is not recognized" after installation

**Solution:**
1. Make sure you closed and reopened PowerShell
2. Verify PATH was added correctly
3. Try restarting your computer

### Maven installation fails with Chocolatey

**Solution:**
1. Make sure you're running PowerShell as Administrator
2. Try the manual installation method instead

### Backend fails to start

**Check these:**
1. Java is installed: `java -version`
2. Port 8080 is not in use
3. Database credentials are correct in application.properties
4. Internet connection is working (for Supabase)

### Database connection error

**Solution:**
1. Verify Supabase credentials in application.properties
2. Check if your IP is allowed in Supabase dashboard
3. Make sure you ran the schema.sql in Supabase SQL Editor

---

## Quick Reference

### Check Installations:
```bash
java -version    # Should show Java 25.0.2
node --version   # Should show v24.11.1
mvn --version    # Should show Maven version (after installation)
```

### Start Services:
```bash
# Backend (after Maven is installed)
cd backend
mvn spring-boot:run

# Frontend (already running)
# Running at http://localhost:5176/
```

### Stop Services:
- Press `Ctrl + C` in the terminal window

---

## Need More Help?

1. Check if Java is installed: `java -version`
2. Make sure you're in the correct directory
3. Review error messages carefully
4. Check SETUP_GUIDE.md for more details
5. Verify Supabase database is accessible

---

## What Happens After Maven Installation?

1. Maven will download all dependencies (first time only)
2. Spring Boot will start
3. Database tables will be created automatically
4. 22 resources will be preloaded
5. Admin account will be created
6. Backend API will be available at http://localhost:8080

Then you can use the full application! 🎉
