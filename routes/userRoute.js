const express = require("express");
const router = express.Router();
const { registerUser, loginUser, loginStatus, logoutUser, loginAsSeller, getUser, getUserBalance, getAlluser,estimateIncome } = require("../controllers/userCtr");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/loggedin", loginStatus);
router.get("/logout", logoutUser);
router.post("/Seller", loginAsSeller);
router.get("/getuser", protect, getUser);
router.get("/sell-amount", protect, getUserBalance);

//only accessible for admin user`
router.get("/estimate-income", protect,isAdmin,estimateIncome);//only accessible for admin user 
router.get("/users", protect, isAdmin, getAlluser); //only accessible for admin user 

module.exports = router;
