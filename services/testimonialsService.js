const db = require("../models/index");
const Testimonials = db.sequelize.models.testimonials;

const updateService = async (id, dataBody) => {
  const data = {
    name: dataBody.name,
    image: dataBody.image,
    content: dataBody.content,
  };

  try {
    return await Testimonials.update(data, {
      returning: true,
      where: {
        id: id,
      },
    });
  } catch (e) {
    res.status(404).json({ message: "Cant make this request" });
  }
};

const deleteService = async (id) => {
  const deleteOpertion = await Testimonials.destroy({
    where: {
      id: id,
    },
  });
  return deleteOpertion;
};
const getTestimonialsService = async () => {
  const testimonials = await Testimonials.findAll({
    order: [["createdAt", "DESC"]],
  });
  return testimonials;
};

module.exports = {
  updateService,
  deleteService,
  getTestimonialsService,
};
