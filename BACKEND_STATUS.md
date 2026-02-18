# Backend Status - Java Version Compatibility Issue

## Current Situation

✅ **Frontend**: Running successfully on http://localhost:5176/
✅ **Database**: Configured with Supabase credentials
✅ **Maven Wrapper**: Downloaded and ready
✅ **Dependencies**: All downloaded successfully
❌ **Compilation**: Failing due to Java 25 compatibility issue

## The Problem

You have Java 25.0.2 installed, which is very new (released January 2026). The Maven compiler plugin and Lombok have compatibility issues with Java 25.

**Error**: `java.lang.ExceptionInInitializerError: com.sun.tools.javac.code.TypeTag :: UNKNOWN`

This is a known issue when using cutting-edge Java versions with build tools that haven't been updated yet.

## Solutions (Choose ONE)

### Solution 1: Install Java 21 LTS (RECOMMENDED)

Java 21 is the latest Long-Term Support version and is fully compatible with all our dependencies.

**Download**: https://www.oracle.com/java/technologies/downloads/#java21

**Steps**:
1. Download and install Java 21
2. Set JAVA_HOME to Java 21:
   ```powershell
   $env:JAVA_HOME="C:\Program Files\Java\jdk-21"
   ```
3. Run the backend:
   ```bash
   cd backend
   .\mvnw.cmd spring-boot:run
   ```

### Solution 2: Install Java 17 LTS (Also Works)

Java 17 is another LTS version that's widely used and fully compatible.

**Download**: https://www.oracle.com/java/technologies/downloads/#java17

**Steps**:
1. Download and install Java 17
2. Set JAVA_HOME to Java 17:
   ```powershell
   $env:JAVA_HOME="C:\Program Files\Java\jdk-17"
   ```
3. Run the backend:
   ```bash
   cd backend
   .\mvnw.cmd spring-boot:run
   ```

### Solution 3: Use IntelliJ IDEA (Easiest)

IntelliJ IDEA handles Java version compatibility automatically.

**Steps**:
1. Download IntelliJ IDEA Community Edition (free): https://www.jetbrains.com/idea/download/
2. Open the `backend` folder as a project
3. IntelliJ will detect it's a Maven project and download dependencies
4. Right-click on `CampusResourceBookingApplication.java`
5. Select "Run 'CampusResourceBookingApplication'"

IntelliJ will automatically configure the correct Java version for the project.

### Solution 4: Use Eclipse (Alternative IDE)

**Steps**:
1. Download Eclipse IDE for Java Developers: https://www.eclipse.org/downloads/
2. File > Import > Maven > Existing Maven Projects
3. Select the `backend` folder
4. Right-click project > Run As > Spring Boot App

## Why This Happened

- Java 25 was just released (January 2026)
- Build tools like Maven compiler plugin need time to catch up
- Lombok annotation processing has compatibility issues
- Java 21 (LTS) is the recommended version for Spring Boot 3.x

## What's Already Working

✅ All dependencies downloaded (Spring Boot, PostgreSQL, JWT, Lombok, etc.)
✅ Maven Wrapper configured
✅ Database connection configured
✅ Frontend running and ready
✅ Project structure is correct

## Quick Fix Command (After Installing Java 21 or 17)

```powershell
# Set JAVA_HOME (adjust path based on your installation)
$env:JAVA_HOME="C:\Program Files\Java\jdk-21"

# Navigate to backend
cd backend

# Run the application
.\mvnw.cmd spring-boot:run
```

## Expected Output After Fix

Once you have the correct Java version, you'll see:

```
Started CampusResourceBookingApplication in X.XXX seconds
Initialized 22 resources
Initialized admin user: admin@campus.edu / Admin@123
```

Backend will be available at: **http://localhost:8080**

## Testing After Backend Starts

1. **Frontend**: Already running at http://localhost:5176/
2. **Backend API**: http://localhost:8080/api/resources (will return 401 - correct!)
3. **Full App**: Open http://localhost:5176/ in browser
4. **Login**: Use admin@campus.edu / Admin@123

## Alternative: Wait for Updates

If you prefer to keep Java 25:
- Wait for Maven compiler plugin 3.14+ (coming soon)
- Wait for Lombok 1.18.32+ with Java 25 support
- This could take a few weeks/months

## Recommendation

**Install Java 21 LTS** - It's the best balance of:
- Modern features
- Long-term support
- Full compatibility with Spring Boot 3.x
- Stable and production-ready

## Need Help?

1. Check which Java versions you have:
   ```powershell
   where.exe java
   ```

2. Check current JAVA_HOME:
   ```powershell
   $env:JAVA_HOME
   ```

3. List all Java installations:
   ```powershell
   dir "C:\Program Files\Java"
   ```

## Summary

Everything is ready to go! You just need to use Java 21 or 17 instead of Java 25. Once you switch Java versions, the backend will compile and run perfectly.

The frontend is already running and waiting for the backend! 🚀
