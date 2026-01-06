# Doctor Appointment System - Complete Setup Guide

This guide will help you set up and run the complete Doctor Appointment System with both backend and frontend.

## Prerequisites

1. **Java Development Kit (JDK) 17** or higher
2. **Node.js** (v16 or higher) and npm
3. **MySQL** database server
4. **Maven** (usually comes with Spring Boot projects)

## Backend Setup

### 1. Database Configuration

1. Open MySQL and create a database:
   ```sql
   CREATE DATABASE doctor_appointment;
   ```

2. Update database credentials in `doctorappointmentbackendlogic/doctorappointmentbackendlogic/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   ```

### 2. Run the Backend

Navigate to the backend directory:
```bash
cd doctorappointmentbackendlogic/doctorappointmentbackendlogic
```

Run the Spring Boot application:
```bash
# Using Maven Wrapper (Windows)
.\mvnw.cmd spring-boot:run

# Or using Maven directly
mvn spring-boot:run
```

The backend will start on **http://localhost:8081**

## Frontend Setup

### 1. Install Dependencies

Navigate to the frontend directory:
```bash
cd frontend
```

Install npm packages:
```bash
npm install
```

### 2. Run the Frontend

Start the development server:
```bash
npm run dev
```

The frontend will start on **http://localhost:3000**

## Application Features

### For Patients (USER role):
- ✅ Register and Login
- ✅ Browse available doctors
- ✅ Book appointments
- ✅ View and manage appointments
- ✅ Cancel appointments

### For Doctors (DOCTOR role):
- ✅ Register and Login
- ✅ Create and update doctor profile
- ✅ View all appointment requests
- ✅ Approve or reject appointments
- ✅ Manage appointments

## API Endpoints

### User Endpoints
- `POST /user/register` - Register new user
- `POST /user/login` - Login user

### Doctor Endpoints
- `GET /doctor` - Get all doctors
- `GET /doctor/{id}` - Get doctor by ID
- `POST /doctor` - Add new doctor
- `PUT /doctor/{id}` - Update doctor
- `DELETE /doctor/{id}` - Delete doctor

### Appointment Endpoints
- `POST /appointment/book` - Book appointment
- `GET /appointment` - Get all appointments
- `GET /appointment/user/{userId}` - Get user appointments
- `PUT /appointment/approve/{id}` - Approve appointment
- `PUT /appointment/reject/{id}` - Reject appointment
- `DELETE /appointment/{id}` - Delete appointment

## Testing the Application

1. **Start the backend** (ensure MySQL is running)
2. **Start the frontend**
3. Open **http://localhost:3000** in your browser
4. Register as a patient or doctor
5. If registering as a doctor, create your profile in the "Profile" section
6. If registering as a patient, browse doctors and book appointments

## Troubleshooting

### Backend Issues:
- **Port 8081 already in use**: Change `server.port` in `application.properties`
- **Database connection failed**: Check MySQL is running and credentials are correct
- **Tables not created**: Ensure `spring.jpa.hibernate.ddl-auto=update` is set

### Frontend Issues:
- **API connection failed**: Ensure backend is running on port 8081
- **CORS errors**: Backend is configured to allow all origins (`@CrossOrigin(origins = "*")`)
- **Build errors**: Run `npm install` again to ensure all dependencies are installed

## Project Structure

```
backend/
├── doctorappointmentbackendlogic/
│   └── doctorappointmentbackendlogic/
│       ├── src/main/java/... (Backend Java code)
│       └── src/main/resources/
│           └── application.properties
│
frontend/
├── src/
│   ├── components/ (React components)
│   ├── context/ (Auth context)
│   ├── pages/ (Page components)
│   ├── services/ (API services)
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Build for Production

### Backend:
```bash
cd doctorappointmentbackendlogic/doctorappointmentbackendlogic
mvn clean package
java -jar target/doctor-appointment-backend-0.0.1-SNAPSHOT.jar
```

### Frontend:
```bash
cd frontend
npm run build
# Serve the dist/ folder with a web server
```

## Notes

- The backend runs on port **8081** (configured in `application.properties`)
- The frontend runs on port **3000** (configured in `vite.config.js`)
- Frontend API calls are configured to connect to `http://localhost:8081`
- All endpoints have CORS enabled for development
- Authentication uses JWT tokens (configured in backend)

## Support

If you encounter any issues:
1. Check that both backend and frontend are running
2. Verify database connection
3. Check browser console for frontend errors
4. Check backend logs for API errors