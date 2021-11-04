const express = require("express");
const db = require("../models/index");
//news/:id controller imports

const router = express.Router();
const Entry = db.sequelize.models.Entry;

//@DESC News List
//@ROUTE /news
//@METHOD GET
router("/").get(async (req, res, next) => {
    try {
        const news = await Entry.findAll({
            attributes: ["name", "image", "createdAt"],
            where: { type: "news" },
            order: [["createdAt", DESC]],
        });

        if (!news) {
            res.status(404);
            throw new Error("There's no data to be found");
        }
        res.status(200).json(news);
    } catch (err) {
        next(err);
    }
});

//@DESC single news by id
//@ROUTE /news/:id
//@METHOD GET
router("/:id").get(middleware, controller);

module.exports = router;
