# Booking Limits and Single Device Login

## New Features Implemented

### 1. Single Device Login
**Description:** A user can only be logged in on one device at a time. When they login from a new device, their previous session is automatically invalidated.

**How it works:**
- When a user logs in, a session token is stored in the database
- Each API request validates that the token matches the active session
- If a user logs in from another device, the old session token is replaced
- The previous device will be logged out with the message: "You have been logged in from another device"

**User Experience:**
- Login on Device A → Works normally
- Login on Device B with same credentials → Device A is automatically logged out
- Device A tries to make a request → Gets 401 error and redirected to login

---

### 2. Weekly Booking Limits

**Student Limits:**
- **Daily:** 2 bookings per day (existing)
- **Weekly:** 3 bookings per week (NEW)

**Staff Limits:**
- **Daily:** 4 bookings per day (existing)
- **Weekly:** 5 bookings per week (NEW)

**Admin:**
- No limits (can override and approve any booking)

**Week Calculation:**
- Week starts on Monday and ends on Sunday
- Counts all PENDING and APPROVED bookings in the current week
- When limit is reached, shows error: "You reached your limit for this week"

---

## Error Messages

### Weekly Limit Reached
```
You reached your limit for this week
```
- **Students:** Shown when trying to book 4th venue in a week
- **Staff:** Shown when trying to book 6th venue in a week

### Daily Limit Reached (Existing)
```
Students cannot book more than 2 slots per day
Staff cannot book more than 4 slots per day
```

### Session Expired (Another Device)
```
You have been logged out because you logged in from another device.
```
- Shown when user's session is invalidated due to login from another device

---

## Testing

### Test Weekly Limits

**For Students (3 bookings/week):**
1. Login as: raj@ksrce.ac.in / Student@123
2. Book 3 different venues for different days in the same week
3. Try to book a 4th venue → Should show "You reached your limit for this week"

**For Staff (5 bookings/week):**
1. Login as: drkumar@ksrce.ac.in / Staff@123
2. Book 5 different venues for different days in the same week
3. Try to book a 6th venue → Should show "You reached your limit for this week"

### Test Single Device Login

**Scenario 1: Same user, two browsers**
1. Open Browser A (Chrome) → Login as raj@ksrce.ac.in
2. Open Browser B (Firefox) → Login as raj@ksrce.ac.in
3. Go back to Browser A → Try to navigate or make a booking
4. Browser A should be logged out with message about another device

**Scenario 2: Same user, two tabs (same browser)**
1. Open Tab 1 → Login as raj@ksrce.ac.in
2. Open Tab 2 → Login as raj@ksrce.ac.in (same user)
3. Go back to Tab 1 → Try to navigate
4. Tab 1 should be logged out

---

## Database Changes

### New Column Added
```sql
ALTER TABLE users ADD COLUMN active_session_token VARCHAR(255);
```

This column stores the JWT token of the current active session. When a user logs in:
1. New JWT token is generated
2. Token is stored in `active_session_token` column
3. Previous token (if any) is overwritten
4. All API requests validate against this stored token

---

## Technical Implementation

### Backend Changes
1. **User.java** - Added `activeSessionToken` field
2. **AuthService.java** - Store session token on login
3. **JwtAuthenticationFilter.java** - Validate session token on each request
4. **BookingService.java** - Added weekly booking limit validation
5. **BookingRepository.java** - Added `countUserBookingsForDateRange()` method

### Frontend Changes
1. **axios.js** - Enhanced 401 error handling to show device login message

---

## Notes
- Weekly limits reset every Monday
- Admin users have no booking limits
- Session tokens are JWT tokens stored in database
- Old sessions are automatically invalidated (no manual logout needed)
- PENDING and APPROVED bookings count towards limits
- REJECTED bookings do not count towards limits
