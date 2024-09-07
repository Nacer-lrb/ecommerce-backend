const express = require("express");
const router = express.Router();
const {createProduct,getAllProducts,DeleteProduct} = require("../controllers/productCtr");
const {protect,isSeller}= require("../middleware/authMiddleware");
const {upload}= require("../utils/fileUpload");



router.post("/",protect,isSeller,upload.single("image"),createProduct);
router.get("/",getAllProducts);
router.delete("/:id",protect,DeleteProduct);


module.exports = router;