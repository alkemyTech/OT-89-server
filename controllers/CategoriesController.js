const db = require("../models/index");

const Categories = db.sequelize.models.Categories;

//@DESC Brings the whole list of category names
//@ROUTE /categories
//@METHOD GET
const CategoriesList = async (req, res, next) => {
  try {
    const CategoriesArray = await Categories.findAll({
      attributes: ["id", "name", "description"],
    });

    if (!CategoriesArray) {
      throw new Error("Unexpected.");
    } else if (CategoriesArray.length == 0) {
      res.sendStatus(204);
    } else {
      res.status(200).json({ message: "Ok!", data: CategoriesArray });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { CategoriesList };
