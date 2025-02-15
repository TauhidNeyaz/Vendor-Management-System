const express = require('express');
const Vendor = require('../models/vendor');

const router = express.Router();

router.get('/dashboard', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.userData.vendorId)
      .populate('children')
      .populate('parent');

    const subVendors = vendor.children;
    const vehicles = await Vehicle.find({ vendor: { $in: [vendor._id, ...subVendors.map(v => v._id)] } });
    const drivers = await Driver.find({ vendor: { $in: [vendor._id, ...subVendors.map(v => v._id)] } });

    res.status(200).json({
      vendor,
      subVendors,
      fleetStatus: {
        totalVehicles: vehicles.length,
        activeVehicles: vehicles.filter(v => v.isActive).length,
      },
      driverStatus: {
        totalDrivers: drivers.length,
        activeDrivers: drivers.filter(d => d.isActive).length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

router.post('/delegate', async (req, res) => {
  try {
    const { subVendorId, permissions } = req.body;
    const superVendor = await Vendor.findById(req.userData.vendorId);
    
    if (superVendor.role !== 'SuperVendor') {
      return res.status(403).json({ message: 'Only Super Vendors can delegate permissions' });
    }

    const subVendor = await Vendor.findById(subVendorId);
    
    if (!subVendor || !superVendor.children.includes(subVendorId)) {
      return res.status(404).json({ message: 'Sub-vendor not found' });
    }

    subVendor.permissions = { ...subVendor.permissions, ...permissions };
    await subVendor.save();

    res.status(200).json({ message: 'Permissions delegated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error delegating permissions' });
  }
});

module.exports = router;