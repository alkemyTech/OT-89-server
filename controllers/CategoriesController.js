const db = require("../models/index");
const Categories = db.sequelize.models.Categories;

//@DESC Brings the whole list of category names
//@ROUTE /categories
//@METHOD GET
const getAllCategories = async (req, res, next) => {
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

const getCategoryById = async (req, res, next) => {
  console.log(req.params);
  try {
    const { id } = req.params;

    const category = await Categories.findOne({ where: { id: id } });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json({ message: "Ok!", data: category });
    }
  } catch (err) {
    console.log(err);
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
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Id is required" });
    } else {
      const response = await Categories.destroy({
        where: {
          id: id,
        },
      });
      if (response == 0) {
        res.status(404).json({ message: "Category not found" });
      } else {
        res.status(200).json({ message: "Category deleted" });
      }
    }
  } catch (e) {
    next(e);
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const response = await Categories.update(body, {
      where: {
        id: id,
      },
    });
    console.log(response);
    if (response == 0) {
      res.status(404).json({ message: "Category not found" });
    } else {
      const resBody = { ...body, id: id }
      res.status(200).json({ message: "Category updated", data: resBody });
    }
  } catch (e) {
    res.status(400).json({ message: "Error updating category" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
