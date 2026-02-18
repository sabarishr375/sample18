# Separate Login System Guide

## Overview
The system now has separate login sections for Student/Staff and Admin users on the same page.

## Login URLs

### Student/Staff Login
- **URL**: `http://localhost:5174/login`
- **Access**: For students and staff members
- **Features**: 
  - Blue-themed interface
  - 10-minute session timeout for students
  - 20-minute session timeout for staff
  - Session timer displayed

### Admin Login
- **URL**: `http://localhost:5174/admin-login`
- **Access**: For administrators only
- **Features**:
  - Red-themed interface
  - No session timeout
  - No session timer displayed
  - Full admin panel access

## Login Page Features

### Same Card, Two Sections
The login page displays both login options side by side:
- Left side: Student/Staff Login (Blue)
- Right side: Admin Login (Red)

### Role Validation
- Student/Staff users cannot login through admin portal
- Admin users cannot login through student/staff portal
- Appropriate error messages displayed for wrong portal access

### Visual Indicators
- Active section is highlighted with colored border
- Icons differentiate between user types
- Clear labels and descriptions

## Session Management

### Students
- Timeout: 10 minutes of inactivity
- Timer shows: "Student Session: X:XX"
- Auto-logout with alert

### Staff
- Timeout: 20 minutes of inactivity
- Timer shows: "Staff Session: X:XX"
- Auto-logout with alert

### Admin
- No timeout restriction
- No timer displayed
- Full access duration

## Usage

1. Navigate to appropriate URL based on your role
2. Enter credentials in the correct section
3. System validates role matches login portal
4. Redirects to dashboard on successful login
5. Session timer starts for students/staff only

## Error Messages
- "Access denied. Admin credentials required." - Non-admin trying admin portal
- "Please use the admin login page." - Admin trying student/staff portal
- "Login failed" - Invalid credentials
