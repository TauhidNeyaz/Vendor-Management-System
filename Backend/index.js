// File: index.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongo_url = "mongodb+srv://adarshgupta0601:DayDtuJltux6vcQs@cluster0.lqkmi.mongodb.net/vendor_mng";

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongo_url);

// Models
const Vendor = require('./models/vendor');
const Vehicle = require('./models/vehicle');
const Driver = require('./models/driver');

// Authentication middleware
const authMiddleware = require('./middleware/auth');

// Routes
const authRoutes = require('./routes/auth');
const vendorRoutes = require('./routes/vendor');
const vehicleRoutes = require('./routes/vehicle');
const driverRoutes = require('./routes/driver');

app.use('/auth', authRoutes);
app.use('/vendor', authMiddleware, vendorRoutes);
app.use('/vehicle', authMiddleware, vehicleRoutes);
app.use('/driver', authMiddleware, driverRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});