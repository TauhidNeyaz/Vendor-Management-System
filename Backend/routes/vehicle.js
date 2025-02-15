const express = require('express');
const Vehicle = require('../models/vehicle');
const Vendor = require('../models/vendor');

const router = express.Router();

router.post('/onboard', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.userData.vendorId);
    
    if (!vendor.permissions.canOnboardVehicles) {
      return res.status(403).json({ message: 'You do not have permission to onboard vehicles' });
    }

    const vehicle = new Vehicle({
      ...req.body,
      vendor: req.userData.vendorId,
    });

    await vehicle.save();
    res.status(201).json({ message: 'Vehicle onboarded successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Error onboarding vehicle' });
  }
});

router.get('/list', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ vendor: req.userData.vendorId });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles' });
  }
});

module.exports = router;