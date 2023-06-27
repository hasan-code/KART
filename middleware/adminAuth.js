const jwt = require('jsonwebtoken');
const User = require("../src/models/users");

const adminAuth = async (req, res, next) => {
  const adminEmail = 'admin.kart@gmail.com';

  try {
    const token = req.cookies.jwt;
    const verifyAdmin = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await User.findOne({ _id: verifyAdmin._id });

    if (admin.email !== adminEmail) {
      return res.redirect('/login');
    }

    req.user = admin;
    next();
  } catch (error) {
    console.error(error);
    return res.redirect('/login');
    // res.status(500).json({ error: 'You need to log in as Admin first!.' });
  }
};

module.exports = adminAuth;
