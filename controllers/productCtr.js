const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/Product");
const isSeller = require("../middleware/authMiddleware");


const createProduct = asyncHandler(async (req, res) => {
    const { titel, description, price, heigth, category, lengthPic, width, mediumused, weight } = req.body;
    const userid = req.user.id;

    const originaSlug = slugify(titel, {
        lower: true,
        remove: /[*+~.?^${}()|[\]\\]/g,
        strict: true,
    });
    let slug = originaSlug;
    let suffix = 1;

    while (await Product.findOne({ slug })) {
        slug = `${originaSlug}-${suffix}`;
        suffix++;
    }
    if (!titel || !description || !price) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    let fileData = {};
    if (req.file) {
        let uploadFiles;
        try {
            uploadFiles = await cloudinary.uploader.upload(req.file.path, {
                folder: "Bidding/products",
                resource_type: "image",
            });
        } catch (error) {
            res.status(500);
            throw new Error("Image cannot be uploaded");
        }
        fileData = {
            filename: req.file.originalname, // Correction ici: 'original_filename' n'existe pas, utilise 'originalname'
            filepath: uploadFiles.secure_url,
            filetype: req.file.mimetype,
            public_id: uploadFiles.public_id,
        };
    }

    const product = await Product.create({
        user: userid,
        titel,
        slug,
        description,
        price,
        heigth,
        category,
        lengthPic,
        width,
        mediumused,
        weight,
        image: fileData,
    });

    res.status(201).json({
        success: true,
        data: product,
    });
});

const getAllProducts= asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort("createdAt").populate("user");

    res.json({
        success: true,
        data: products,
    });




});


const DeleteProduct = asyncHandler(async (req, res) => {
    const {id}= req.params;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404);
        throw new Error("Product not found");
    }
    if (product.user?.toString() !== req.user.id){
        res.status(404);
        throw new Error("Not authorized to delete this product");
    } 
    if (product.image && product.image.public_id){
        try {
        await cloudinary.uploader.destroy(product.image.public_id);
        }
        catch (error) {
            console.error(error);
            res.status(500);
            throw new Error("Image cannot be deleted from cloudinary");

        }

    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({message :"Product delete successfully"});


});
const test = asyncHandler(async (req, res) => {
    // Logique pour test ici
});

module.exports = {
    createProduct,
    test,
    getAllProducts,
    DeleteProduct,
};
