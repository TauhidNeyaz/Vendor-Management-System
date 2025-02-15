// File: models/vendor.js

const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['SuperVendor', 'RegionalVendor', 'CityVendor', 'LocalVendor'], required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }],
  permissions: {
    canOnboardVehicles: { type: Boolean, default: false },
    canOnboardDrivers: { type: Boolean, default: false },
    canManageBookings: { type: Boolean, default: false },
    canProcessPayments: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model('Vendor', vendorSchema);

