# Default Users Credentials

## Login URLs
- **Student/Staff Login**: http://localhost:5174/login
- **Admin Login**: http://localhost:5174/admin-login

---

## ADMIN (1 User)
Login at: http://localhost:5174/admin-login

| Name  | Email              | Password    | Role  |
|-------|-------------------|-------------|-------|
| Admin | admin@ksrce.ac.in | Admin@123   | ADMIN |

---

## STUDENTS (10 Users)
Login at: http://localhost:5174/login (Select "Student" role)

| Name    | Email                | Password      | Role    |
|---------|---------------------|---------------|---------|
| Raj     | raj@ksrce.ac.in     | Student@123   | STUDENT |
| Suraj   | suraj@ksrce.ac.in   | Student@123   | STUDENT |
| Abi     | abi@ksrce.ac.in     | Student@123   | STUDENT |
| Ram     | ram@ksrce.ac.in     | Student@123   | STUDENT |
| Priya   | priya@ksrce.ac.in   | Student@123   | STUDENT |
| Karthik | karthik@ksrce.ac.in | Student@123   | STUDENT |
| Divya   | divya@ksrce.ac.in   | Student@123   | STUDENT |
| Arun    | arun@ksrce.ac.in    | Student@123   | STUDENT |
| Sneha   | sneha@ksrce.ac.in   | Student@123   | STUDENT |
| Vijay   | vijay@ksrce.ac.in   | Student@123   | STUDENT |

---

## STAFF (6 Users)
Login at: http://localhost:5174/login (Select "Staff" role)

| Name          | Email                    | Password   | Role  |
|---------------|-------------------------|------------|-------|
| Dr.Kumar      | drkumar@ksrce.ac.in     | Staff@123  | STAFF |
| Prof.Lakshmi  | proflakshmi@ksrce.ac.in | Staff@123  | STAFF |
| Dr.Ravi       | drravi@ksrce.ac.in      | Staff@123  | STAFF |
| Prof.Meena    | profmeena@ksrce.ac.in   | Staff@123  | STAFF |
| Dr.Ganesh     | drganesh@ksrce.ac.in    | Staff@123  | STAFF |
| Prof.Saranya  | profsaranya@ksrce.ac.in | Staff@123  | STAFF |

---

## Session Timeouts
- **Students**: 10 minutes of inactivity
- **Staff**: 20 minutes of inactivity
- **Admin**: No timeout

---

## Notes
- All users are created automatically when the backend starts for the first time
- Students must select "Student" role button when logging in
- Staff must select "Staff" role button when logging in
- Admin uses separate login page (no role selection needed)
- All passwords follow the required format: 8+ chars, letters, numbers, special characters
- Contact admin to create new user accounts (no public registration)
