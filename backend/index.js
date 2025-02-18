require('dotenv').config();
const express = require('express');
const { connect } = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: function (origin, callback) {
      // Allow all requests from Vercel deployments
      if (!origin || origin.endsWith(".vercel.app")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
  

// Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/doctors', doctorRoutes);
    app.use('/api/book', appointmentRoutes);
    app.use('/api/patient', patientRoutes);

// Connect to MongoDB
connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
