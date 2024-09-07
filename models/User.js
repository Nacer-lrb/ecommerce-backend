const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please add a name"],
    },
    email: {
        type: String, 
        required:[true,"Please add a email"],
    },
    password: {
        type: String,
        required: [true, "Please proveide your password"],
        minlength: 8,
    },
    photo: {
        type: String,
        require:[true,"Please add your avatar "],

        default: "default_photo.jpg"
    },
    role : {
        type: String,
        enum: ['admin', 'seller','buyer'],
        default: 'buyer'
    },
    commssionBalance: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },

},
    { timestamps: true }
);

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')){
        return next();
    } 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model("User",UserSchema);

module.exports = User;

