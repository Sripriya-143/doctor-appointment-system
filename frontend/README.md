# Doctor Appointment System - Frontend

A modern React frontend built with Vite, React Router, and Tailwind CSS for the Doctor Appointment System.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 🔐 User authentication (Login/Register)
- 👨‍⚕️ Doctor and Patient role-based access
- 📅 Appointment booking and management
- 🔍 Search and filter doctors by specialization
- ✅ Appointment approval/rejection for doctors
- 📱 Fully responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on http://localhost:8081

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The app will run on **http://localhost:3000**

Make sure your backend is running on **http://localhost:8081** before using the application.

## Build for Production

Build the application:
```bash
npm run build
```

The built files will be in the `dist/` directory.

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components (Layout, ProtectedRoute)
│   ├── context/          # React Context (AuthContext)
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Doctors.jsx
│   │   ├── BookAppointment.jsx
│   │   ├── Appointments.jsx
│   │   └── DoctorProfile.jsx
│   ├── services/         # API service layer
│   │   └── api.js
│   ├── App.jsx           # Main App component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## API Configuration

The frontend is configured to connect to the backend at `http://localhost:8081`.

To change the backend URL, update `API_BASE_URL` in `src/services/api.js`.

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## Usage

1. **Register**: Create a new account as a Patient or Doctor
2. **Login**: Sign in with your credentials
3. **For Patients**:
   - Browse available doctors
   - Book appointments
   - View and manage your appointments
4. **For Doctors**:
   - Create/update your profile
   - View all appointment requests
   - Approve or reject appointments

## Troubleshooting

- **Connection refused**: Make sure the backend is running on port 8081
- **CORS errors**: Backend should have CORS enabled (already configured)
- **Build errors**: Delete `node_modules` and run `npm install` again