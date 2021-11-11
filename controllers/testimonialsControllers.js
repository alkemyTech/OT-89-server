const testimonialsService = require("../services/testimonialsService");

const updateOperation = async (req, res) => {
  const id = req.params.id;
  const dataBody = req.body;

  const updateTestimonial = await testimonialsService.update(id, dataBody);
  res.status(201).json("Operation Modified");
};




const deleteOperation = async (req,res) => {
    const id = req.params.id;
    
    const deleteOpertion = await testimonialsService.deleteOperation(id)
    
    if(deleteOpertion==1){
      res.status(200).json("Testimonial Deleted")
    }else{
      res.status(400).json("Testimonial dont exist")
    }

  }








module.exports = {
  updateOperation,
  deleteOperation
};
