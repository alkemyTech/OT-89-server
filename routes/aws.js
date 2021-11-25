const express = require("express");

const {
  uploadImage,
  uploadMiddleware,
  getImages,
  deleteImage,
} = require("../controllers/ImageController");

const router = express.Router();

router.post("/upload", uploadMiddleware, uploadImage);

router.get("/", getImages);

module.exports = router;
