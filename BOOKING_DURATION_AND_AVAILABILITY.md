# Booking Duration Limits and Availability Check

## New Features Implemented

### 1. Time Slot Duration Limits

**Student Booking Limits:**
- Maximum duration: 1 hour per booking
- Example: Can book from 9:00 AM to 10:00 AM (1 hour) ✓
- Example: Cannot book from 9:00 AM to 11:00 AM (2 hours) ✗

**Staff Booking Limits:**
- Maximum duration: 3 hours per booking
- Example: Can book from 9:00 AM to 12:00 PM (3 hours) ✓
- Example: Cannot book from 9:00 AM to 1:00 PM (4 hours) ✗

**Admin:**
- No duration limits (can approve any booking)

**Error Messages:**
```
Students can only book for maximum 1 hour
Staff can only book for maximum 3 hours
```

---

### 2. Real-Time Availability Check

**How it works:**
- When user selects date, start time, and end time
- System automatically checks if the slot is available
- Shows green message: "✓ Time slot is available"
- Shows red message: "✗ Time slot is not available"
- Prevents booking if slot is unavailable

**Overlapping Check:**
- Checks all APPROVED bookings for the same resource
- Checks all PENDING bookings (waiting for approval)
- Prevents double booking
- Shows error: "Slot already booked. Please check availability and choose another time."

---

### 3. Add Resources (Admin Only)

**Access:**
- Admin Panel → "+ Add Resource" button
- URL: http://localhost:5174/admin/add-resource

**Fields:**
- Resource Name (e.g., "Lab 9 - Blockchain Lab")
- Resource Type (LAB, EVENT_HALL, SMART_CLASSROOM)
- Capacity (number of people)
- Status (ACTIVE, MAINTENANCE)

**Features:**
- Only admins can add resources
- Success message shown after adding
- Auto-redirect to Admin Panel after 2 seconds

---

### 4. Create Users (Already Implemented)

**Access:**
- Admin Panel → "+ Create User" button
- URL: http://localhost:5174/admin/create-user

**Can Create:**
- Students
- Staff
- Admins

---

## Complete Booking Limits Summary

### Students
| Limit Type | Value | Error Message |
|------------|-------|---------------|
| Per Booking Duration | 1 hour | "Students can only book for maximum 1 hour" |
| Per Day | 2 bookings | "Students cannot book more than 2 slots per day" |
| Per Week | 3 bookings | "You reached your limit for this week" |

### Staff
| Limit Type | Value | Error Message |
|------------|-------|---------------|
| Per Booking Duration | 3 hours | "Staff can only book for maximum 3 hours" |
| Per Day | 4 bookings | "Staff cannot book more than 4 slots per day" |
| Per Week | 5 bookings | "You reached your limit for this week" |

### Admin
- No limits on any bookings
- Can override and approve any booking

---

## Booking Page Features

### Visual Indicators
1. **Duration Limits Info Box** (Blue)
   - Shows booking duration limits
   - Shows weekly limits
   - Always visible at top of form

2. **Availability Status** (Green/Red)
   - Green: "✓ Time slot is available"
   - Red: "✗ Time slot is not available"
   - Updates automatically when time changes

3. **Validation Messages** (Red)
   - Shows if duration exceeds limit
   - Shows if end time is before start time
   - Prevents form submission

---

## API Endpoints

### Check Availability
```
GET /api/bookings/check-availability
Parameters:
  - resourceId: UUID
  - date: YYYY-MM-DD
  - startTime: HH:mm
  - endTime: HH:mm
Response:
  { "available": true/false }
```

### Add Resource (Admin Only)
```
POST /api/resources
Body:
  {
    "name": "Lab 9 - Blockchain Lab",
    "type": "LAB",
    "capacity": 30,
    "status": "ACTIVE"
  }
```

---

## Testing Scenarios

### Test Duration Limits

**Student (1 hour max):**
1. Login as: raj@ksrce.ac.in / Student@123
2. Try to book from 9:00 AM to 10:00 AM → Should work ✓
3. Try to book from 9:00 AM to 11:00 AM → Should show error ✗

**Staff (3 hours max):**
1. Login as: drkumar@ksrce.ac.in / Staff@123
2. Try to book from 9:00 AM to 12:00 PM → Should work ✓
3. Try to book from 9:00 AM to 1:00 PM → Should show error ✗

### Test Availability Check

**Scenario 1: Available Slot**
1. Select a resource
2. Choose tomorrow's date
3. Select 9:00 AM to 10:00 AM
4. Should show green "✓ Time slot is available"

**Scenario 2: Unavailable Slot**
1. User A books Lab 1 for tomorrow 9:00 AM - 10:00 AM
2. User B tries to book Lab 1 for tomorrow 9:30 AM - 10:30 AM
3. Should show red "✗ Time slot is not available"
4. Cannot submit booking

### Test Add Resource

**As Admin:**
1. Login as: admin@ksrce.ac.in / Admin@123
2. Go to Admin Panel
3. Click "+ Add Resource"
4. Fill in details:
   - Name: "Lab 9 - Blockchain Lab"
   - Type: LAB
   - Capacity: 30
   - Status: ACTIVE
5. Click "Add Resource"
6. Should show success message
7. Redirects to Admin Panel

---

## Technical Implementation

### Backend Changes
1. **BookingService.java**
   - Added duration validation (1 hour for students, 3 hours for staff)
   - Added `checkAvailability()` method
   - Enhanced overlapping check

2. **BookingController.java**
   - Added `/check-availability` endpoint

3. **ResourceController.java**
   - Already has `/resources` POST endpoint for adding resources

### Frontend Changes
1. **BookingPage.jsx**
   - Added real-time availability check
   - Added duration validation
   - Added visual indicators
   - Added info box with limits

2. **AddResource.jsx** (NEW)
   - Form for adding new resources
   - Admin-only access
   - Success/error handling

3. **AdminPanel.jsx**
   - Added "+ Add Resource" button
   - Links to /admin/add-resource

4. **App.jsx**
   - Added route for /admin/add-resource

---

## Notes
- Availability check runs automatically when date/time changes
- Duration validation happens before form submission
- Overlapping check includes PENDING and APPROVED bookings
- REJECTED bookings don't block time slots
- Admin can add resources anytime
- User creation already implemented (no changes needed)
