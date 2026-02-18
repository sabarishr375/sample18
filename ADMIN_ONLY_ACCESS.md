# 🔒 Admin-Only Access - Security Update

## ✅ Changes Implemented

### 1. Student Registration Only (Public)
- **Public registration** (`/api/auth/register`) now **ONLY allows STUDENT role**
- Attempting to register as ADMIN or STAFF will be **rejected** with error message
- Frontend registration page clearly states: "Student Registration"
- Blue info box explains that Staff and Admin accounts must be created by administrators

### 2. Admin-Only User Creation
- **New endpoint**: `POST /api/users/create` (Admin only)
- Only users with ADMIN role can create STAFF and ADMIN accounts
- Protected by `@PreAuthorize("hasRole('ADMIN')")`

### 3. Security Enforcement

#### Backend Protection:
```java
// In AuthService.register() - Public registration
if ("ADMIN".equals(requestedRole) || "STAFF".equals(requestedRole)) {
    throw new RuntimeException("Cannot self-register as ADMIN or STAFF");
}
// Forces role to STUDENT
user.setRole(User.Role.STUDENT);
```

#### Admin-Only Endpoint:
```java
// In UserController - Admin creates users
@PostMapping("/create")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<User> createUser(@Valid @RequestBody RegisterRequest request)
```

## 🚫 What's Blocked

### Public Users CANNOT:
- ❌ Register as ADMIN
- ❌ Register as STAFF
- ❌ Access admin endpoints
- ❌ Approve/reject bookings
- ❌ Create other users
- ❌ Manage user status

### Only ADMIN Can:
- ✅ Create STAFF accounts
- ✅ Create ADMIN accounts
- ✅ Approve/reject bookings
- ✅ View all users
- ✅ Manage user status (activate/deactivate)
- ✅ Access admin panel

## 📋 How It Works

### For Students (Public):
1. Go to registration page
2. See "Student Registration" title
3. See info box: "This registration is for students only"
4. Fill in details (Name, Email, Password, Phone)
5. Submit → Automatically registered as STUDENT
6. Cannot access admin features

### For Admin Creating Staff/Admin:
1. Login as ADMIN
2. Use Postman or create admin UI
3. POST to `/api/users/create` with JWT token
4. Specify role: STAFF or ADMIN
5. User is created with specified role

## 🔐 API Endpoints

### Public Endpoints:
```
POST /api/auth/register  → Student registration only
POST /api/auth/login     → All users can login
```

### Admin-Only Endpoints:
```
GET  /api/users                → List all users
POST /api/users/create         → Create STAFF/ADMIN (NEW!)
PUT  /api/users/{id}/status    → Update user status
GET  /api/bookings/pending     → View pending bookings
PUT  /api/bookings/{id}/approve → Approve booking
PUT  /api/bookings/{id}/reject  → Reject booking
```

## 🧪 Testing

### Test 1: Try to Register as Admin (Should Fail)
**Request:**
```json
POST /api/auth/register
{
  "name": "Hacker",
  "email": "hacker@test.com",
  "password": "Hack@123",
  "phone": "1234567890",
  "role": "ADMIN"
}
```
**Response:**
```json
{
  "message": "Cannot self-register as ADMIN or STAFF. Only STUDENT registration is allowed."
}
```

### Test 2: Admin Creates Staff (Should Succeed)
**Request:**
```json
POST /api/users/create
Authorization: Bearer {admin-jwt-token}
{
  "name": "Staff Member",
  "email": "staff@campus.edu",
  "password": "Staff@123",
  "phone": "9876543210",
  "role": "STAFF"
}
```
**Response:**
```json
{
  "id": "uuid",
  "name": "Staff Member",
  "email": "staff@campus.edu",
  "role": "STAFF",
  "status": "ACTIVE"
}
```

### Test 3: Student Tries to Access Admin Panel (Should Fail)
- Student logs in
- Tries to access `/admin` route
- Automatically redirected to `/dashboard`
- Cannot see "Admin Panel" link in navbar

## 📱 Frontend Changes

### Registration Page:
- Title changed to: **"Student Registration"**
- Blue info box added with message:
  > "This registration is for students only. Staff and Admin accounts must be created by an administrator."
- Role field removed (hardcoded to STUDENT)

### Navbar:
- "Admin Panel" link only visible to users with ADMIN role
- Protected route redirects non-admins to dashboard

## 🎯 Current User Accounts

### Pre-existing Admin:
- **Email**: `admin@campus.edu`
- **Password**: `Admin@123`
- **Role**: ADMIN
- **Can**: Create staff/admin, approve bookings, manage users

### Students (Self-registered):
- **Role**: STUDENT (forced)
- **Can**: Browse resources, create bookings, view own bookings
- **Cannot**: Access admin features, approve bookings

## 🔄 To Create Staff/Admin Accounts

### Option 1: Using Postman
1. Login as admin to get JWT token
2. Use `POST /api/users/create` endpoint
3. Include token in Authorization header
4. Specify role as STAFF or ADMIN

### Option 2: Create Admin UI (Future Enhancement)
- Add "Create User" button in Admin Panel
- Form with role dropdown (STAFF/ADMIN only)
- Submit to `/api/users/create` endpoint

## ✅ Security Summary

| Action | Student | Staff | Admin |
|--------|---------|-------|-------|
| Self-register | ✅ (as STUDENT only) | ❌ | ❌ |
| Login | ✅ | ✅ | ✅ |
| Browse resources | ✅ | ✅ | ✅ |
| Create booking | ✅ | ✅ | ✅ |
| View own bookings | ✅ | ✅ | ✅ |
| Approve bookings | ❌ | ❌ | ✅ |
| Create users | ❌ | ❌ | ✅ |
| Manage users | ❌ | ❌ | ✅ |
| Access admin panel | ❌ | ❌ | ✅ |

---

**Your system is now secure! Only admins can create admin/staff accounts.** 🔒
