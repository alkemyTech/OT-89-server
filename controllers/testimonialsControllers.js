const testimonialsService = require("../services/testimonialsService");

const updateOperation = async (req, res) => {
  const id = req.params.id;
  const dataBody = req.body;

  const updateTestimonial = await testimonialsService.update(id, dataBody);
  res.status(201).json("Operation Modified");
};

module.exports = {
  updateOperation,
};
