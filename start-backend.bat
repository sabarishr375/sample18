@echo off
echo ========================================
echo Campus Resource Booking System
echo Starting Backend Server
echo ========================================
echo.

cd backend

echo Checking Maven installation...
mvn -version
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Maven is not installed!
    echo Please install Maven first. See INSTALLATION_NOTES.md
    echo.
    pause
    exit /b 1
)

echo.
echo Building project...
call mvn clean install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Build failed!
    echo.
    pause
    exit /b 1
)

echo.
echo Starting Spring Boot application...
echo Backend will be available at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
call mvn spring-boot:run

pause
