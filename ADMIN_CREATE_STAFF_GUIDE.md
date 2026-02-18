# 👥 Admin Guide: Creating Staff/Admin Accounts

## ✅ New Feature Added!

You can now create Staff and Admin accounts directly from the web interface!

## 🚀 How to Create Staff/Admin Accounts

### Method 1: Using the Web Interface (NEW!)

**Step 1: Login as Admin**
1. Go to http://localhost:5173/login
2. Email: `admin@campus.edu`
3. Password: `Admin@123`
4. Click Login

**Step 2: Go to Admin Panel**
1. Click "Admin Panel" in the navbar
2. You'll see a green button: **"+ Create Staff/Admin"**

**Step 3: Click Create Button**
1. Click the **"+ Create Staff/Admin"** button
2. You'll be taken to the user creation form

**Step 4: Fill in the Form**
1. **Role**: Select STAFF or ADMIN from dropdown
2. **Name**: Enter full name (e.g., "Robert Brown")
3. **Email**: Enter email (e.g., "robert@campus.edu")
4. **Password**: Enter password (e.g., "Staff@123")
   - Must be at least 8 characters
   - Must contain letters, numbers, and special characters
   - Real-time validation will show errors if invalid
5. **Phone**: Enter phone number (e.g., "9876543210")

**Step 5: Submit**
1. Click **"Create STAFF Account"** or **"Create ADMIN Account"**
2. Success message will appear
3. You'll be redirected back to Admin Panel
4. New user can now login with their credentials

### Method 2: Using Postman (Alternative)

**Step 1: Login to Get Token**
```
POST http://localhost:8080/api/auth/login
{
  "email": "admin@campus.edu",
  "password": "Admin@123"
}
```
Copy the `token` from response.

**Step 2: Create User**
```
POST http://localhost:8080/api/users/create
Authorization: Bearer {paste-token-here}
{
  "name": "Staff Member",
  "email": "staff@campus.edu",
  "password": "Staff@123",
  "phone": "9876543210",
  "role": "STAFF"
}
```

## 📋 Example Accounts to Create

### Staff Account 1:
- **Role**: STAFF
- **Name**: Robert Brown
- **Email**: robert@campus.edu
- **Password**: Staff@123
- **Phone**: 9876543210

### Staff Account 2:
- **Role**: STAFF
- **Name**: Sarah Wilson
- **Email**: sarah@campus.edu
- **Password**: Staff@456
- **Phone**: 9876543211

### Another Admin:
- **Role**: ADMIN
- **Name**: Michael Admin
- **Email**: michael@campus.edu
- **Password**: Admin@456
- **Phone**: 9876543212

## 🎯 What Each Role Can Do

### STUDENT (Self-registered)
- Browse resources
- Create bookings (max 2 per day)
- View own bookings
- Cannot approve bookings

### STAFF (Admin-created)
- Same as students
- Create bookings (max 4 per day)
- Cannot approve bookings

### ADMIN (Admin-created)
- Everything staff can do
- Approve/reject bookings
- Create staff/admin accounts
- Manage user status
- Access admin panel

## 🔒 Security Features

1. **Only Admin Can Access**
   - Create User page is protected
   - Requires ADMIN role
   - Students/Staff cannot access

2. **Password Validation**
   - Real-time validation as you type
   - Shows errors only when invalid
   - Red border for invalid passwords

3. **Email Uniqueness**
   - System checks if email already exists
   - Shows error if duplicate

4. **Role Selection**
   - Only STAFF and ADMIN available
   - Students must use public registration

## 📱 User Interface

### Admin Panel with Create Button:
```
┌─────────────────────────────────────────────┐
│ Admin Panel        [+ Create Staff/Admin]   │
├─────────────────────────────────────────────┤
│                                             │
│ [Pending Bookings] [Users]                  │
│                                             │
└─────────────────────────────────────────────┘
```

### Create User Form:
```
┌─────────────────────────────────────────────┐
│ Create Staff/Admin Account                  │
├─────────────────────────────────────────────┤
│ ℹ Admin Only                                │
│ Use this form to create Staff or Admin      │
│ accounts.                                   │
├─────────────────────────────────────────────┤
│ Role: [STAFF ▼]                             │
│                                             │
│ Name: [________________]                    │
│                                             │
│ Email: [________________]                   │
│                                             │
│ Password: [________________]                │
│ (validation appears if invalid)             │
│                                             │
│ Phone: [________________]                   │
│                                             │
│ [Create STAFF Account] [Cancel]             │
└─────────────────────────────────────────────┘
```

## ✅ Testing the Feature

### Test 1: Create Staff Account
1. Login as admin
2. Go to Admin Panel
3. Click "+ Create Staff/Admin"
4. Select Role: STAFF
5. Fill in details:
   - Name: Test Staff
   - Email: teststaff@campus.edu
   - Password: Staff@123
   - Phone: 1234567890
6. Click "Create STAFF Account"
7. See success message
8. Logout and login with new staff credentials

### Test 2: Create Admin Account
1. Same steps as above
2. Select Role: ADMIN
3. Fill in details
4. New admin can now access admin panel

### Test 3: Password Validation
1. Go to create user form
2. Type invalid password: "123"
3. See red border and error message
4. Type valid password: "Staff@123"
5. Error disappears

## 🎉 Quick Start

**Right now, you can:**

1. **Login as Admin**
   - Email: `admin@campus.edu`
   - Password: `Admin@123`

2. **Click "Admin Panel"** in navbar

3. **Click "+ Create Staff/Admin"** button

4. **Fill the form** and create your first staff account!

5. **Test it** by logging in with the new credentials

## 📞 Common Questions

**Q: Can students create staff accounts?**
A: No, only admins can access the create user page.

**Q: Can I create multiple admins?**
A: Yes, any admin can create more admin accounts.

**Q: What if email already exists?**
A: You'll see an error: "Email already exists"

**Q: Can I edit users after creation?**
A: Currently, you can only change their status (Active/Inactive) in the Users tab.

**Q: Where do I see all created users?**
A: In Admin Panel, click the "Users" tab to see all users.

---

**You can now easily create staff and admin accounts from the web interface!** 🎉
