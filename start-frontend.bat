@echo off
echo ========================================
echo Campus Resource Booking System
echo Starting Frontend Server
echo ========================================
echo.

cd frontend

echo Installing/Checking dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: npm install failed!
    echo.
    pause
    exit /b 1
)

echo.
echo Starting Vite development server...
echo Frontend will be available at: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.
call npm run dev

pause
