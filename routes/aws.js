const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;

const AWS = require("aws-sdk");
const awsConfig = require("../config/aws.config");
const s3 = new AWS.S3(awsConfig);

const router = express.Router();

// GET
// Middleware to get the file from S3 still needs to be implemented
router.get("/", async (req, res) => {
  try {
    const response = await s3
      .listObjects({
        Bucket: awsConfig.bucketName,
      })
      .promise();

    res.send(response);
  } catch (err) {
    console.error(err, err.message);
  }
});

// GET by ID
// Middleware to get the file from S3 still needs to be implemented
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await s3
      .getObject({
        Bucket: awsConfig.bucketName,
        Key: id,
      })
      .promise();

    res.send(response);
  } catch (err) {
    console.log(err, err.message);
  }
});

// POST
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, ".");
  },
});

const upload = multer({ storage }).single("image");

router.post("/upload", upload, (req, res) => {
  const { originalname, buffer } = req.file;

  const fileName = originalname.split(".");
  const fileExt = fileName[fileName.length - 1];

  const params = {
    Key: `${uuid()}.${fileExt}`,
    Body: buffer,
    Bucket: awsConfig.bucketName,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    }

    console.log(data);
    data.Key = res.status(200).json({ data });
  });
});

module.exports = router;
