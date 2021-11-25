const db = require("../models/index");
const Categories = db.sequelize.models.Categories;
const { update } = require("../services/categoryService");

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

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({ message: "All fields must be completed" });
    } else {
      const response = await Categories.create(
        {
          name: name.trim(),
          description: description.trim(),
        },
        {
          fields: ["name", "description"],
        }
      );

      res.status(201).json(response);
    }
  } catch (e) {
    next(e);
  }
};

const updateCategory = async (req, res) => {
  const id = req.params.id;
  const dataBody = req.body;

  await update(id, dataBody);

  res.status(201).json("Operation Modified");
};

module.exports = { createCategory, CategoriesList, updateCategory };
