const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id); 
    if (!user) {
      return res.status(404).json({ message: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, please login" });
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, You are not an administrator" });
  }
};
const isSeller = (req, res, next) => {
  if (req.user && req.user.role === "seller" || req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, You are not a Seller" });
  }
};

module.exports = {
  protect,
  isAdmin,
  isSeller,
};
