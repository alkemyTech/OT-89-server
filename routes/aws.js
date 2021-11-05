const express = require("express");

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

module.exports = router;
