# Alternative Setup - Without Maven

Since Maven is not installed, here are alternative approaches to run the backend:

## Option 1: Install Maven (Recommended)

Maven is the standard build tool for this project. Install it using:

### Using Chocolatey (Easiest):
```powershell
# Run PowerShell as Administrator
choco install maven
```

### Manual Installation:
1. Download: https://maven.apache.org/download.cgi
2. Extract to: `C:\Program Files\Apache\maven`
3. Add to PATH: `C:\Program Files\Apache\maven\bin`
4. Restart terminal
5. Verify: `mvn -version`

## Option 2: Use IntelliJ IDEA (Easiest Alternative)

IntelliJ IDEA Community Edition (FREE) has built-in Maven support:

1. **Download IntelliJ IDEA Community**: https://www.jetbrains.com/idea/download/
2. **Install** IntelliJ IDEA
3. **Open Project**:
   - File > Open
   - Select the `backend` folder
   - IntelliJ will detect it's a Maven project
4. **Wait** for dependencies to download (automatic)
5. **Run**:
   - Find `CampusResourceBookingApplication.java`
   - Right-click > Run
   - Backend will start on port 8080

## Option 3: Use Eclipse (Free Alternative)

Eclipse IDE also has Maven support:

1. **Download Eclipse IDE for Java Developers**: https://www.eclipse.org/downloads/
2. **Install** Eclipse
3. **Import Project**:
   - File > Import > Maven > Existing Maven Projects
   - Select the `backend` folder
4. **Wait** for dependencies to download
5. **Run**:
   - Right-click on project > Run As > Spring Boot App

## Option 4: Use VS Code with Extensions

1. **Install VS Code**: https://code.visualstudio.com/
2. **Install Extensions**:
   - Extension Pack for Java
   - Spring Boot Extension Pack
3. **Open** the `backend` folder
4. **Run** using the Spring Boot Dashboard

## Option 5: Online IDE (Quick Test)

Use GitHub Codespaces or Gitpod (cloud-based IDEs with Maven pre-installed):

1. Push code to GitHub
2. Open in Codespaces/Gitpod
3. Run: `cd backend && mvn spring-boot:run`

## Why Maven is Needed

The Spring Boot project has many dependencies:
- Spring Framework (Web, Security, Data JPA)
- PostgreSQL Driver
- JWT Libraries
- Lombok
- Validation

Maven automatically:
- Downloads all dependencies
- Compiles Java code
- Packages the application
- Runs the Spring Boot server

## Current Workaround

While you decide on an approach, you can:

1. **Use the Frontend** (already running on port 5176)
2. **Review the code** in any text editor
3. **Test with Postman** once backend is running
4. **Setup Supabase database** (can be done now)

## Recommended: Install Maven

It takes just 2-3 minutes with Chocolatey:

```powershell
# Open PowerShell as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force
choco install maven -y

# Close and reopen terminal
mvn -version

# Then run backend
cd backend
mvn spring-boot:run
```

## After Backend Starts

Once you get the backend running (any method above):

1. Backend: http://localhost:8080
2. Frontend: http://localhost:5176 (already running)
3. Login: admin@campus.edu / Admin@123
4. Test the complete booking workflow

## Need Help?

The easiest path forward:
1. Install IntelliJ IDEA Community (free, 5 min download)
2. Open backend folder
3. Click Run button
4. Done!

No command line needed with IntelliJ!
