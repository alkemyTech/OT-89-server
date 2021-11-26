const express = require("express");

const AWS = require("aws-sdk");
const multer = require("multer");
const uuid = require("uuid").v4;
const awsConfig = require("../config/aws.config");

const s3 = new AWS.S3(awsConfig);

//-------------------------------------------------//

const getImages = async (req, res) => {
  try {
    const response = await s3
      .listObjects({
        Bucket: awsConfig.bucketName,
      })
      .promise();

    res.json(response);
  } catch (err) {
    console.error(err, err.message);
  }
};

const uploadMiddleware = multer({
  storage: multer.memoryStorage({
    destination: (req, file, callback) => {
      callback(null, "");
    },
  }),
}).single("image");

const uploadImage = async (req, res) => {
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
    } else {
      data.Key = res.status(200).json({ data });
    }
  });
};

const deleteImage = (imageUrl) => {
  if (
    imageUrl &&
    imageUrl.startsWith(
      `https://${awsConfig.bucketName}.s3.sa-east-1.amazonaws.com/`
    )
  ) {
    const urlSplited = imageUrl.split("/");
    const imageName = urlSplited[urlSplited.length - 1];

    const params = {
      Bucket: awsConfig.bucketName,
      Key: imageName,
    };

    return new Promise((resolve, reject) =>
      s3.deleteObject(params, (error, data) => {
        if (error) reject(error);
        else resolve(data);
      })
    );
  } else {
    return new Promise((resolve, reject) =>
      resolve({ message: "Not image at amazon" })
    );
  }
};

module.exports = { deleteImage, uploadMiddleware, getImages, uploadImage };
