const {
  updateService,
  deleteService,
  getTestimonialsService,
} = require("../services/testimonialsService");

const updateOperation = async (req, res) => {
  const id = req.params.id;
  const dataBody = req.body;

  const updateTestimonial = await updateService(id, dataBody);
  res.status(201).json("Operation Modified");
};

const deleteOperation = async (req, res) => {
  const id = req.params.id;

  const deleteOpertion = await deleteService(id);

  if (deleteOpertion == 1) {
    res.status(200).json("Testimonial Deleted");
  } else {
    res.status(400).json("Testimonial dont exist");
  }
};

const getOperation = async (req, res) => {
  const getTestimonials = await getTestimonialsService();
  if (getTestimonials.length > 0) {
    res.status(200).json(getTestimonials);
  } else {
    res.status(400).json("No hay testimonios");
  }
};


module.exports = {
  updateOperation,
  deleteOperation,
  getOperation,
};
