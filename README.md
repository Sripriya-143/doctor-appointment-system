# Doctor Appointment System

A full-stack web application for managing doctor appointments, built with Spring Boot (backend) and React (frontend).

## 🚀 Quick Start

### Prerequisites
- **Java JDK 17+**
- **Node.js 16+** and npm
- **MySQL Database**

### 1. Database Setup

Create the MySQL database:
```sql
CREATE DATABASE doctor_appointment;
```

Update database credentials in:
`doctorappointmentbackendlogic/doctorappointmentbackendlogic/src/main/resources/application.properties`

### 2. Start Backend

```bash
cd doctorappointmentbackendlogic/doctorappointmentbackendlogic
./mvnw spring-boot:run    # Linux/Mac
# OR
.\mvnw.cmd spring-boot:run  # Windows
```

Backend runs on: **http://localhost:8081**

### 3. Start Frontend

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:3000**

### 4. Access the Application

Open your browser and navigate to: **http://localhost:3000**

## 📋 Features

### For Patients:
- ✅ User registration and authentication
- ✅ Browse available doctors
- ✅ Search and filter doctors by specialization
- ✅ Book appointments with date and time selection
- ✅ View all appointments
- ✅ Cancel appointments

### For Doctors:
- ✅ Doctor registration and authentication
- ✅ Create and manage doctor profile
- ✅ View all appointment requests
- ✅ Approve or reject appointments
- ✅ Manage appointments

## 🏗️ Architecture

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.5
- **Database**: MySQL with JPA/Hibernate
- **Security**: Spring Security (currently configured for development)
- **Port**: 8081
- **API**: RESTful API with CORS enabled

### Frontend (React)
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Port**: 3000

## 📁 Project Structure

```
.
├── doctorappointmentbackendlogic/        # Backend (Spring Boot)
│   └── doctorappointmentbackendlogic/
│       ├── src/main/java/
│       │   └── com/doctorappointmentbackend/
│       │       ├── controller/          # REST Controllers
│       │       ├── service/             # Business Logic
│       │       ├── model/               # Entity Models
│       │       ├── repository/          # Data Access Layer
│       │       ├── dto/                 # Data Transfer Objects
│       │       └── config/              # Configuration
│       └── src/main/resources/
│           └── application.properties   # Backend config
│
├── frontend/                             # Frontend (React)
│   ├── src/
│   │   ├── components/                  # Reusable components
│   │   ├── pages/                       # Page components
│   │   ├── context/                     # React Context
│   │   ├── services/                    # API services
│   │   └── App.jsx                      # Main app component
│   ├── package.json
│   └── vite.config.js
│
└── SETUP_GUIDE.md                       # Detailed setup instructions
```

## 🔌 API Endpoints

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
- `GET /appointment/user/{userId}` - Get user's appointments
- `PUT /appointment/approve/{id}` - Approve appointment
- `PUT /appointment/reject/{id}` - Reject appointment
- `DELETE /appointment/{id}` - Delete appointment

## 🛠️ Development

### Backend Development
- The backend uses Spring Boot's auto-reload feature
- Changes to Java files will trigger auto-recompilation
- Database schema is auto-updated (`spring.jpa.hibernate.ddl-auto=update`)

### Frontend Development
- Vite provides hot module replacement (HMR)
- Changes are reflected instantly in the browser
- API calls are made to `http://localhost:8081`

## 📦 Build for Production

### Backend
```bash
cd doctorappointmentbackendlogic/doctorappointmentbackendlogic
mvn clean package
java -jar target/doctor-appointment-backend-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist/ directory with a web server
```

## 🔒 Security Notes

- Currently configured for development with all endpoints open
- In production, implement proper JWT authentication
- Password encryption is handled by BCrypt
- CORS is enabled for all origins (restrict in production)

## 🐛 Troubleshooting

1. **Backend won't start**
   - Check MySQL is running
   - Verify database credentials in `application.properties`
   - Ensure port 8081 is not in use

2. **Frontend can't connect to backend**
   - Verify backend is running on port 8081
   - Check browser console for CORS errors
   - Verify API_BASE_URL in `frontend/src/services/api.js`

3. **Database connection issues**
   - Ensure MySQL server is running
   - Check database name matches (`doctor_appointment`)
   - Verify username and password in `application.properties`

## 📝 License

This project is for educational/demonstration purposes.

## 👥 Contributing

Feel free to fork, modify, and use this project as needed.

---

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)