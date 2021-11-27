const {
  updateService,
  deleteService,
  getTestimonialsService,
  createTestimonialsService,
} = require("../services/testimonialsService");

const getOperation = async (req, res) => {
  const getTestimonials = await getTestimonialsService();
  if (getTestimonials.length > 0) {
    res.status(200).json(getTestimonials);
  } else {
    res.status(400).json({ message: "No hay testimonios para mostrar" });
  }
};

const createOperation = async (req, res) => {
  const { name, image, content } = req.body;

  const createTestimonial = await createTestimonialsService({
    name,
    image,
    content,
  });

  if (createTestimonial) {
    res
      .status(201)
      .json({ message: "Testimonial Created", data: createTestimonial });
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
  updateOperation,
  deleteOperation,
  getOperation,
  createOperation,
};
