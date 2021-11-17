const db = require("../models/index");
const { isEmpty } = require("lodash");

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

const updateActivity = async (req, res, next) => {
  try {
    const { name, image, content } = req.body;
    const { id: activityId } = req.params;

    const isActivity = await Activity.findByPk(activityId);

    if (!isActivity) {
      res.status(404).json({ message: "Activity doesn't exist" });
      return;
    }

    const payload = {};
    if (name) payload.name = name;
    if (image) payload.image = image;
    if (content) payload.content = content;

    if (isEmpty(payload)) {
      res.status(400).json({
        message:
          "Either a name, image or content is required to perform an update!",
      });
    }

    const updatedActivity = await Activity.update(payload, {
      where: { id: activityId },
      validate: true,
    });

    if (updatedActivity) {
      res.status(200).json({
        message: "Activity updated succesfully!",
        data: payload,
      });
    } else {
      throw new Error("Ups! Something went wrong");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { postActivity, updateActivity };
