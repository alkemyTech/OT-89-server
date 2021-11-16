const db = require("../models/index");

const Categories = db.sequelize.models.Categories;

//@DESC Brings the whole list of category names
//@ROUTE /categories
//@METHOD GET
const CategoriesList = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
};

module.exports = { CategoriesList };
