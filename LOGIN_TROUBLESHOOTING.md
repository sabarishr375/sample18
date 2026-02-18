# Login Troubleshooting Guide

## Test Credentials

### For Student Login (http://localhost:5174/login)
1. Select "Student" role button (🎓)
2. Email: `raj@ksrce.ac.in`
3. Password: `Student@123`
4. Click "Sign In"

### For Staff Login (http://localhost:5174/login)
1. Select "Staff" role button (👨‍🏫)
2. Email: `drkumar@ksrce.ac.in`
3. Password: `Staff@123`
4. Click "Sign In"

### For Admin Login (http://localhost:5174/admin-login)
1. Email: `admin@ksrce.ac.in`
2. Password: `Admin@123`
3. Click "Sign In"

## Common Issues

### Issue 1: "You selected STUDENT but your account is STAFF"
- **Cause**: Wrong role button selected
- **Solution**: Make sure you select the correct role button before logging in
  - Students must click the "Student" button
  - Staff must click the "Staff" button

### Issue 2: "Invalid credentials"
- **Cause**: Wrong email or password
- **Solution**: 
  - Check email format: must be @ksrce.ac.in
  - Check password: case-sensitive
  - Use exact credentials from DEFAULT_USERS_CREDENTIALS.md

### Issue 3: "Please use the Admin Login link below"
- **Cause**: Admin trying to login through student/staff portal
- **Solution**: Use http://localhost:5174/admin-login instead

### Issue 4: "Access denied. Admin credentials required"
- **Cause**: Student/Staff trying to login through admin portal
- **Solution**: Use http://localhost:5174/login instead

## Backend Test
To verify backend is working, open PowerShell and run:
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/auth/login" -Method Post -ContentType "application/json" -Body '{"email":"raj@ksrce.ac.in","password":"Student@123"}'
```

Should return a token if successful.

## Frontend Check
1. Open browser console (F12)
2. Go to Network tab
3. Try to login
4. Check the request to `/api/auth/login`
5. Look at the response

## What Error Are You Seeing?
Please provide:
1. The exact error message shown on screen
2. Which user you're trying to login with
3. Which role button you selected (if student/staff login)
4. Any errors in browser console (F12)
