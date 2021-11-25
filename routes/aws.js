const express = require("express");

const {
  uploadImage,
  // uploadMiddleware,
  getImages,
  deleteImage,
} = require("../controllers/ImageController");
// const { v4: uuidv4 } = require("uuid");

const multer = require("multer");
const AWS = require("aws-sdk");

const awsConfig = require("../config/aws.config");
const s3 = new AWS.S3(awsConfig);
const uuid = require("uuid").v4;

const router = express.Router();

const uploadMiddleware = multer({
  storage: multer.memoryStorage({
    destination: (req, file, callback) => {
      callback(null, "");
    },
  }),
}).single("image");

router.post("/upload", uploadMiddleware, (req, res) => {
  const { originalname, buffer, mimetype } = req.file;

  const fileName = originalname.split(".");
  const fileExt = fileName[fileName.length - 1];

  const params = {
    Key: `${uuid()}.${fileExt}`,
    Body: buffer,
    Bucket: awsConfig.bucketName,
    ACL: "public-read",
    ContentType: mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    console.log(data);
    data.Key = res.status(200).json({ data });
  });
});

router.get("/", getImages);

module.exports = router;
