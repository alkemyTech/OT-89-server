const express = require("express");
const router = express.Router();
const {
  updateOperation,
  deleteOperation,
  getOperation,
} = require("../controllers/testimonialsControllers");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");

const db = require("../models/index");
const Testimonials = db.sequelize.models.testimonials;

router.get("/", getOperation);
router.put("/:id", IsAuthenticated, IsAdmin, updateOperation);
router.delete("/:id", IsAuthenticated, IsAdmin, deleteOperation);

router.post("/", IsAuthenticated, IsAdmin, (req, res) => {
  if (req.body.name && req.body.content) {
    Testimonials.create({
      name: req.body.name,
      image: req.body.image,
      content: req.body.content,
    })
      .then((testimonialEntry) => {
        res.status(200).send(testimonialEntry);
      })
      .catch((err) => {
        res.send({ message: err });
      });
  } else {
    res.status(400).send({ message: "Missing data" });
  }
});

module.exports = router;
