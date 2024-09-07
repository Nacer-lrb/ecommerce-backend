const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const  bcrypt = require("bcryptjs");



 const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: '1d' });
};





const registerUser = asyncHandler(async (req,res)=>{
    const {name, email, password} = req.body;

    if (!name || !email || !password){
        res.status(400);
        throw new Error("Please fill in all required fields");
        
    }
 const userExists = await User.findOne({email});
 if (userExists){
     res.status(400);
     throw new Error("Email already exists");
 }
    const user = await User.create({name,
        email,
        password,

        });
    const token = generateToken(user._id);

    res.cookie("token", token,{
        path:"/",
        httpOnly: true,
        expires: new Date(Date.now()+1000 *86400),
        sameSite: true,
        secure: true,
    });

    if (user) {
        const {_id ,name,email,role,photo} = user;
        res.status(201).json({_id ,name,email,role,photo,token});
    }else{
        res.status(400);
        throw new Error("Invalid user data");;
    }


});



const loginUser = asyncHandler(async(req, res, next)=>{

 const {email, password} = req.body;
 if (!email || !password){
    res.status(400);
    throw new Error("Please provide email and password");
 }

 const user = await User.findOne({email});
 if (!user){
    res.status(401);
    throw new Error("User not found ,Please signup");
 }

 const passwordIsCorrect = await bcrypt.compare(password, user.password);

 const token = await generateToken(user._id );
 res.cookie("token", token,{
    path:"/",
    httpOnly: true,
    expires: new Date(Date.now()+1000 *86400),
    sameSite: "none",
    secure: true,
 });

 if (user && passwordIsCorrect) {
    const {_id,name,email,role,photo} = user;
    res.json({_id,name,email,role,photo});

 }else{
    res.status(401);
    throw new Error("Invalid user data");
 }


});



const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json(false);
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        return res.json(true);
    } catch (err) {
        return res.json(false);
    }
});

const logoutUser = asyncHandler(async(req, res)=>{
    res.cookie("token", "",{
        path:"/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
        secure: true,
     });
     return res.status(200).json({message: "Succcessfully logged out."});

});

const loginAsSeller = asyncHandler(async(req,res) => {


 const {email, password} = req.body;
     if (!email || !password){
     res.status(400);
     throw new Error("Please provide email and password");
 }

 const user = await User.findOne({email});
 if (!user){
    res.status(404);
    throw new Error("User not found ,Please signup");
 }

 const passwordIsCorrect = await bcrypt.compare(password, user.password);
 if (!passwordIsCorrect){
    res.status(404);
    throw new Error("Invalid password");
 }

 user.role = "seller";
 await user.save();

 const token = await generateToken(user._id );
 res.cookie("token", token,{
    path:"/",
    httpOnly: true,
    expires: new Date(Date.now()+1000 *86400),
    sameSite: "none",
    secure: true,
 });

 if (user && passwordIsCorrect) {
    const {_id,name,email,role,photo} = user;
    res.json({_id,name,email,role,photo});

 }else{
    res.status(401);
    throw new Error("Invalid user data");
 }




});

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
});



const getUserBalance = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404)
      throw new Error("User not found" );
    }
     res.status(200).json({ 
        balance : user.balance,
        
      });



});

const getAlluser = asyncHandler(async (req, res) => {
    const userlist = await User.find({});
  
    if (!userlist.length) {
      return res.status(404).json({ message: "No users found" });
    }
  
    res.status(200).json({ userlist });
});
  


const estimateIncome = asyncHandler(async(req,res) => {
    try {
        const admin = await User.findOne({role: 'admin'});
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const commssionBalance = await admin.commssionBalance;
        res.status(200).json({ commssionBalance});
    }
    catch(error){
        res.status(500).json({ error:"Internal server error" });
    }


});







module.exports = { 
    registerUser,
    loginUser,
    loginStatus,
    logoutUser,
    loginAsSeller,
    getUser,
    getUserBalance,
    getAlluser,
    estimateIncome
    
};