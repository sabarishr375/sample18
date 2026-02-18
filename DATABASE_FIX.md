# Database Schema Fix

## Issue
The backend failed to start because the database schema doesn't match the expected structure.

Error: `column "password" of relation "users" does not exist`

## Solution

You need to run the SQL schema in your Supabase database. Follow these steps:

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase project: https://supabase.com/dashboard
2. Click on your project
3. Go to "SQL Editor" in the left sidebar

### Step 2: Drop Existing Tables (if any)

Run this first to clean up any existing tables:

```sql
-- Drop existing tables if they exist
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS users CASCADE;
```

### Step 3: Run the Schema

Copy and paste the entire contents of `database/schema.sql` and execute it.

Or run this complete schema:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('STUDENT', 'STAFF', 'ADMIN')),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Resources Table
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('LAB', 'EVENT_HALL', 'SMART_CLASSROOM')),
    capacity INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'MAINTENANCE'))
);

-- Bookings Table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    resource_id UUID NOT NULL REFERENCES resources(id),
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    rejection_reason VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    approved_by UUID REFERENCES users(id)
);

-- Indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_resource_id ON bookings(resource_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_resource_date ON bookings(resource_id, booking_date);
```

### Step 4: Verify Tables Created

Run this query to verify:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';
```

You should see: users, resources, bookings

### Step 5: Restart Backend

After the schema is created, restart the backend:

```bash
cd backend
$env:JAVA_HOME="C:\Program Files\Java\jdk-21.0.10"
.\mvnw.cmd spring-boot:run
```

## Alternative: Change Hibernate DDL Mode

If you want Hibernate to create the tables automatically (not recommended for production):

Edit `backend/src/main/resources/application.properties`:

Change:
```properties
spring.jpa.hibernate.ddl-auto=update
```

To:
```properties
spring.jpa.hibernate.ddl-auto=create-drop
```

⚠️ WARNING: `create-drop` will delete all data every time you restart the application!

For development, use:
```properties
spring.jpa.hibernate.ddl-auto=create
```

This will create tables on startup but won't drop them on shutdown.

## Current Status

- ✅ Frontend: Running on http://localhost:5176/
- ❌ Backend: Failed due to database schema mismatch
- ⚠️ Database: Needs schema to be created/fixed

## Next Steps

1. Run the SQL schema in Supabase
2. Restart the backend
3. Test the application
