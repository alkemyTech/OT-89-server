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

const updateOperation = async (req, res) => {
  const { id } = req.params;
  const dataBody = req.body;

  const updatedTestomonial = await updateService(id, dataBody);

  res
    .status(201)
    .json({ message: "Operation Modified", data: updatedTestomonial });
};

const deleteOperation = async (req, res) => {
  const id = req.params.id;

  const deletedTestimonial = await deleteService(id);

  if (deletedTestimonial == 1) {
    res.status(200).json({ message: "Testimonial Deleted" });
  } else {
    res.status(400).json({ message: "Testimonial dont exist" });
  }
};

module.exports = {
  getTestimonials,
  createTestimonials,
  updateOperation,
  deleteOperation,
};
