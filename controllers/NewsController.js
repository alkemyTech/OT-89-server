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
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({
        error: "Id must be valid!",
      });
      return;
    }

    const newsById = await Entry.findOne({
      where: {
        type: "news",
        id: id,
      },
    });

    if (newsById) {
      res.status(200).json({
        message: "Ok!",
        data: newsById,
      });
    } else {
      const newsByPk = await Entry.findByPk(id);
      if (!newsByPk) {
        res.status(400).json({
          message: "Id not found!",
        });
      } else if (newsByPk) {
        res.status(400).json({
          message: "This is not a news item!",
        });
      } else {
        throw new Error("Unexpected.");
      }
    }
  } catch (err) {
    next(err);
  }
};

const createNews = async (req, res, next) => {
  try {
    const { name, image, content, categoryId } = req.body;
    if (!name || !image || !content || !categoryId) {
      res
        .status(400)
        .json({ message: "Todos los campos deben ser completados" });
    } else {
      //FIXME: Entry.create() esta fallando. Causa: no se esta mandando una image url adecuadamente desde el cliente
      const news = await Entry.create(
        { name, image, content, categoryId, type: "news" },
        {
          attributes: ["name", "image", "content", "categoryId", "type"],
          validation: true,
        }
      );
      res.status(201).json({ message: "Ok!", data: news });
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
