const db = require("../models/index");
const Testimonials = db.sequelize.models.testimonials;

const getTestimonials = async (req, res) => {
  const testimonials = await Testimonials.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (testimonials.length > 0) {
    res
      .status(200)
      .json({ message: "Mostrando testimonios", data: testimonials });
  } else {
    res.status(404).json({ message: "No testimonials found" });
  }
};

const createTestimonials = async (req, res, next) => {
  const { name, image, content } = req.body;

  try {
    if (name && content) {
      const createdTestimonial = await Testimonials.create({
        name,
        content,
        image: image || "",
      });

      res.status(200).json({
        message: "Testimonio creado correctamente",
        data: createdTestimonial,
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateTestimonials = async (req, res, next) => {
  try {
    const { id: testimonialId } = req.params;
    const dataBody = req.body;

    const updatedTestimonial = await Testimonials.update(dataBody, {
      returnning: true,
      where: {
        id: testimonialId,
      },
    });

    if (updatedTestimonial) {
      res.status(200).json({
        message: "Testimonio actualizado correctamente",
      });
    }
  } catch (err) {
    next(err);
  }
};

const deletedTestimonial = async (req, res, next) => {
  try {
    const { id: testimonialId } = req.params;
    const deletedTestimonial = await Testimonials.destroy({
      where: {
        id: testimonialId,
      },
    });

    if (deletedTestimonial) {
      res.status(200).json({
        message: "Testimonio eliminado correctamente",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTestimonials,
  createTestimonials,
  updateTestimonials,
  deletedTestimonial,
};
