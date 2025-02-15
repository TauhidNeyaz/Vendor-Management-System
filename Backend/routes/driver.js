const express = require('express');
const Driver = require('../models/driver');
const Vendor = require('../models/vendor');

const router = express.Router();

router.post('/onboard', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.userData.vendorId);
    
    if (!vendor.permissions.canOnboardDrivers) {
      return res.status(403).json({ message: 'You do not have permission to onboard drivers' });
    }

    const driver = new Driver({
      ...req.body,
      vendor: req.userData.vendorId,
    });

    await driver.save();
    res.status(201).json({ message: 'Driver onboarded successfully', driver });
  } catch (error) {
    res.status(500).json({ message: 'Error onboarding driver' });
  }
});

router.get('/list', async (req, res) => {
  try {
    const drivers = await Driver.find({ vendor: req.userData.vendorId });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers' });
  }
});

module.exports = router;