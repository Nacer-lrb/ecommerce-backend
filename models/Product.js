const mongoose = require("mongoose");


const productSchema = mongoose.Schema({
    user: {
        type :mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    titel:{
        type: String,
        required: [true,"Please add a title"],
        trime : true,
    },
    description: {
        type: String,
        required:[true,"Please add a description"],
        trime: true,
    },
    image: {
        type :Object,
        default :{},
    },
    category: {
        type: String,
        required: [true,"Please add a category"],
        default :"All",
    },
    commission: {
        type: Number,
        default :0,
    },
    slug: {
        type: String,
        unique: true,
    
    },
    price: {
        type: Number,
        required: [true,"Please add a price"],
    },
    heigth: {
        type: Number,
    },
    lengthPic: {type: Number},
    width: {type: Number},
    weight: {type: Number},
    mediumused: {type: String},
    isverify: {type: Boolean,default: false},
    isSoldout: {type: Boolean,default: false},
    soldTO :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

})


const Product = mongoose.model( "Product",productSchema);

module.exports = Product  ;