const db = require("../models/index");

const Entry = db.sequelize.models.Entry;

//@DESC Brings the whole list of news
//@ROUTE /news
//@METHOD GET
const NewsList = async (req, res, next) => {};

//@DESC single news by id
//@ROUTE /news/:id
//@METHOD GET
const NewsById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "Id must be a valid number" });
            return;
        }

        const news = await Entry.findByPk(id);

        if (!news) {
            res.status(400).json({ message: "Id not found" });
        } else if (news.length == 0) {
            res.status(204);
        } else {
            res.status(200).json({ message: "Ok!", data: news });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { NewsList, NewsById };
