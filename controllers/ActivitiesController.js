const db = require("../models/index");

const Activity = db.sequelize.models.Activity;

const postActivity = async (req, res, next) => {
  try {
    const { name, content, image } = req.body;

    if (name && content && image) {
      const activity = await Activity.create(
        { name, image, content },
        {
          attributes: ["name", "image", "content"],
          validation: true,
        }
      );
      res
        .status(201)
        .json({ message: "Activity added succesfully!", data: activity });
    } else {
      res.status(400).json({ message: "All fields must be completed" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { postActivity };
