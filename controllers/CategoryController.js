const {update} = require("../services/categoryService");

const updateOperation = async (req, res) => {
  const id = req.params.id;
  const dataBody = req.body;

  const updateCategory = await update(id, dataBody);
  res.status(201).json("Operation Modified");
};






module.exports = {
    updateOperation,
    
  };