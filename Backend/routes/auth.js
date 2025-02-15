const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/vendor');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, parentId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const vendor = new Vendor({
      name,
      email,
      password: hashedPassword,
      role,
      parent: parentId,
    });

    await vendor.save();

    if (parentId) {
      await Vendor.findByIdAndUpdate(parentId, { $push: { children: vendor._id } });
    }

    res.status(201).json({ message: 'Vendor registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering vendor' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, vendor.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const token = jwt.sign(
      { vendorId: vendor._id, role: vendor.role },
      '1234',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

module.exports = router;