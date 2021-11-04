const db = require("../models/index");

const Entry = db.sequelize.models.Entry;

//@DESC Brings the whole list of news
//@ROUTE /news
//@METHOD GET
const NewsList = async (req, res, next) => {
    try {
        const newsArr = await Entry.findAll({
            attributes: ["name", "image", "createdAt"],
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
const NewsById = async (req, res, next) => {};

module.exports = { NewsList, NewsById };
