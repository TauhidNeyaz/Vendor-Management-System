# Ride-Sharing Platform

## Overview
This is a **ride-sharing platform** designed to manage vendors, vehicles, and drivers efficiently. It supports multi-level vendor management, authentication, and role-based access control.

## Features
- **User Authentication**: Secure login and registration with JWT authentication.
- **Vendor Management**: Hierarchical structure with SuperVendor, RegionalVendor, etc.
- **Vehicle & Driver Onboarding**: Vendors can onboard and manage their fleets and drivers.
- **Role-Based Access Control**: Permissions vary based on vendor roles.
- **Secure API**: Protected routes using authentication middleware.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Token)
- **Security**: Bcrypt for password hashing

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-repo.git
   cd ride-sharing-platform
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file and add:
   ```env
   mongo_url = "your_mongodb_connection_string"
   JWT_SECRET_KEY = "your_secret_key"
   ```

4. **Run the server**
   ```sh
   node index.js
   ```

## Project Structure
```
ride-sharing-platform/
│-- models/
│   ├── vendor.js
│   ├── vehicle.js
│   ├── driver.js
│-- routes/
│   ├── auth.js
│   ├── vendor.js
│   ├── vehicle.js
│   ├── driver.js
│-- middleware/
│   ├── auth.js
│-- index.js
│-- .env
│-- package.json
```

## Code Flow

### 1. **Authentication** (`routes/auth.js`)
- `/auth/register`: Registers a new vendor.
- `/auth/login`: Authenticates and returns a JWT token.

### 2. **Vendor Management** (`routes/vendor.js`)
- `/vendor/dashboard`: Fetches vendor data, sub-vendors, fleet, and drivers.
- `/vendor/delegate`: Delegates permissions to sub-vendors.

### 3. **Driver Management** (`routes/driver.js`)
- `/driver/onboard`: Onboards a new driver.
- `/driver/list`: Lists all drivers under a vendor.

### 4. **Vehicle Management** (`routes/vehicle.js`)
- **(To be implemented)** Add vehicle-related APIs for fleet management.

## Middleware
- **`middleware/auth.js`**: Protects routes by verifying JWT tokens.

## Demonstration
### Video / Screenshots
- Include a video demonstration highlighting key features.
- Alternatively, provide screenshots of API responses using **Postman** or a frontend UI.

## Future Enhancements
- Implement **ride-booking** functionality.
- Add **payment integration**.
- Develop a **frontend** using React or Vue.js.



