const User = require('../models/User');

exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('fullName email createdAt');

    if (!user) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    return res.json({
      message: `Welcome back, ${user.fullName}!`,
      userName: user.fullName,
      email: user.email,
      registrationDate: user.createdAt
    });
  } catch (error) {
    return res.status(500).json({ message: 'Could not load dashboard.', error: error.message });
  }
};
