const express = require("express");
const db = require("../models/index");
const Categories = db.sequelize.models.Categories;
const IsAuthenticated = require('../helpers/auth/isAuthenticated');
const IsAdmin = require('../helpers/auth/isAdmin');

const router = express.Router();

///////////////////////////////////////////////////////POST CATEGORIE

router.post("/categories", IsAuthenticated, IsAdmin, async (req, res) => {
    try{
        const name = req.body.name.trim();
        const description = req.body.description.trim();

        if(!name || !description){
            res.status(204).json({ message: "All fields must be completed" });
        }else{
            const response = await Categories.create({
                name: name,
                description: description
            },
            {
                fields: ["name", "description"]
            });

            res.status(201).json(response);
        }
    }
    catch(e){
        res.status(404).json({ message: e.message });
    }
});

