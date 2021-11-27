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

    if (allNews.length === 0) {
      res.status(404).json({
        message: "No hay noticias. Crea la primera!",
      });
    }

    if (allNews) {
      res.status(200).json({
        message: "Todas las noticias mostradas correctamente!",
        data: allNews,
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
      where: { type: "news", id: newsId },
    });

    if (!news) {
      res
        .status(404)
        .json({ message: `No existe la noticia con el ID ${newsId}` });
    } else {
      res
        .status(200)
        .json({ message: "La noticia existe y fue encontrada!", data: news });
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
    const { id: newsId } = req.params;
    const { name, image, content, categoryId } = req.body;

    const news = await Entry.findOne({ where: { type: "news", id: newsId } });

    if (!news) {
      res.status(404).json({ message: "No existe el id buscado" });
    }

    const updatedNews = await Entry.update(
      {
        name,
        image,
        content,
        categoryId,
      },
      { where: { id: newsId } }
    );

    res
      .status(200)
      .json({ message: "Actualizado con exito", data: updatedNews });
  } catch (err) {
    next(err);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    const { id: newsId } = req.params;

    const news = await Entry.findOne({ where: { type: "news", id: newsId } });

    if (!news) {
      res.status(404).json({ message: "No existe el id buscado" });
    }

    const deletedNews = await Entry.destroy({ where: { id: newsId } });
    res.status(200).json({ message: "Eliminado con exito", data: deletedNews });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  updateNews,
  createNews,
  deleteNews,
};
