# Installation Notes

## Current System Status

✅ Java 25.0.2 - Installed
✅ Node.js 24.11.1 - Installed  
✅ npm 11.6.2 - Installed
❌ Maven - Not Installed

## Required: Install Maven

To run the Spring Boot backend, you need to install Maven:

### Option 1: Using Chocolatey (Recommended for Windows)

1. Open PowerShell as Administrator
2. Install Chocolatey if not already installed:
   ```powershell
   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
   ```

3. Install Maven:
   ```powershell
   choco install maven
   ```

4. Restart your terminal and verify:
   ```bash
   mvn -version
   ```

### Option 2: Manual Installation

1. Download Maven from: https://maven.apache.org/download.cgi
2. Extract to a folder (e.g., C:\Program Files\Apache\maven)
3. Add to System PATH:
   - Open System Properties > Environment Variables
   - Add Maven bin folder to PATH (e.g., C:\Program Files\Apache\maven\bin)
4. Restart terminal and verify: `mvn -version`

### Option 3: Use IDE (IntelliJ IDEA / Eclipse)

If you have IntelliJ IDEA or Eclipse:
1. Open the backend folder as a Maven project
2. The IDE will automatically download Maven dependencies
3. Run the main class: `CampusResourceBookingApplication.java`

## After Installing Maven

Once Maven is installed, run these commands:

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will start on: http://localhost:8080

### Frontend Setup (Already Done)
```bash
cd frontend
npm run dev
```

Frontend will start on: http://localhost:5173

## Quick Start (After Maven Installation)

1. Configure Supabase database in `backend/src/main/resources/application.properties`
2. Run backend: `cd backend && mvn spring-boot:run`
3. Run frontend: `cd frontend && npm run dev`
4. Open browser: http://localhost:5173
5. Login with: admin@campus.edu / Admin@123

## Frontend Status

✅ Dependencies installed successfully
✅ Ready to run with `npm run dev`

Note: 2 moderate severity vulnerabilities detected in npm packages. Run `npm audit fix` if needed.
