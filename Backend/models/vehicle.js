const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  registrationNumber: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  seatingCapacity: { type: Number, required: true },
  fuelType: { type: String, required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  documents: {
    registrationCertificate: { type: String, required: true },
    insurancePolicy: { type: String, required: true },
    pollutionCertificate: { type: String, required: true },
  },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);