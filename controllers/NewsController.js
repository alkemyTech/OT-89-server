const db = require("../models/index");

const Entry = db.sequelize.models.Entry;

//@DESC Brings the whole list of news
//@ROUTE /news
//@METHOD GET
const NewsList = async (req, res, next) => {
    try {
        const newsArr = await Entry.findAll({
            attributes: ["name", "image", "createdAt", "id"],
            where: { type: "news" },
            order: [["createdAt", "DESC"]],
        });

        if (!newsArr) {
            throw new Error("Unexpected.");
        } else if (newsArr.length == 0) {
            res.sendStatus(204); //Fun fact, no body will be sent with a 204 response
            //.json({ message: "No content could be found.",data: newsArr});
        } else {
            res.status(200).json({ message: "Ok!", data: newsArr });
        }
    } catch (err) {
        next(err);
    }
};

//@DESC single news by id
//@ROUTE /news/:id
//@METHOD GET
const NewsById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "Id must be valid!" });
            return;
        }

        const news = await Entry.findOne({ where: { type: "news", id: id } });

        if (news) {
            res.status(200).json({ message: "Ok!", data: news });
        } else {
            const newsByPk = await Entry.findByPk(id);
            if (!newsByPk) {
                res.status(400).json({ message: "Id not found!" });
            } else if (newsByPk) {
                res.status(400).json({ message: "This is not a news item!" });
            } else {
                throw new Error("Unexpected.");
            }
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { NewsList, NewsById };