const db = require("../models/index");

const Entry = db.sequelize.models.Entry;

//@DESC Brings the whole list of news
//@ROUTE /news
//@METHOD GET
const getAllNews = async (req, res, next) => {
  try {
    const allNews = await Entry.findAll({
      attributes: ["name", "image", "content", "createdAt", "id", "categoryId"],
      where: {
        type: "allNews",
      },
      order: [["createdAt", "DESC"]],
    });

    if (allNews) {
      res.status(200).json({
        message: "All news fetched successfully!",
        data: allNews,
      });
    }

    if (!allNews) {
      res.status(404).json({
        message: "No news found!",
      });
    }
  } catch (err) {
    next(err);
  }
};

//@DESC single news by id
//@ROUTE /news/:id
//@METHOD GET
const getNewsById = async (req, res, next) => {
  try {
    const { id: newsId } = req.params;

    const news = await Entry.findOne({
      where: {
        type: "news",
        id: newsId,
      },
    });

    if (!news) {
      res.status(404).json({ message: "No existe el id buscado" });
    } else {
      res.status(200).json({ message: "Ok!", data: news });
    }
  } catch (err) {
    next(err);
  }
};

const createNews = async (req, res, next) => {
  try {
    const { name, image, content, categoryId } = req.body;

    if (!name || !image || !content || !categoryId) {
      res.status(400).json({
        message: "Debes completar todos los campos",
      });
    } else {
      const news = await Entry.create({
        name,
        image,
        content,
        categoryId,
        type: "news",
      });
      res.status(201).json({
        message: "Noticia creada con exito",
        data: news,
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateNews = async (req, res, next) => {
  try {
    const id = req.params.id;
    const news = await Entry.findOne({
      where: {
        type: "news",
        id: id,
      },
    });
    if (!news) {
      res.status(404).json({
        message: "No existe el id",
      });
    } else {
      const update = await Entry.update(
        {
          name: req.body.name,
          image: req.body.image,
          content: req.body.content,
          categoryId: req.body.category,
          type: req.body.type,
        },
        {
          where: {
            id: id,
          },
          validation: true,
        }
      );
      const noveletyUpdate = await Entry.findByPk(id);
      if (!noveletyUpdate) {
        res.status(404).json({
          message: "Id no encontrado",
        });
      } else {
        res.status(200).json({
          message: "Actualizado de forma correcta",
          data: noveletyUpdate,
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    const id = req.params.id;
    const news = await Entry.findOne({ where: { type: "news", id: id } });
    if (!news) {
      res.status(404).json({ message: "No existe el id buscado" });
    } else {
      const deletedNews = await Entry.destroy({
        where: { id: id },
      });
      res
        .status(200)
        .json({ message: "Eliminado con exito", data: deletedNews });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  updateNews,
  createNews,
  deleteNews,
};
