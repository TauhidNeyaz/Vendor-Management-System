const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  documents: {
    drivingLicense: { type: String, required: true },
    identityProof: { type: String, required: true },
  },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Driver', driverSchema);