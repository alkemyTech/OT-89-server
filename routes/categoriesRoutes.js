const express = require("express");
const db = require("../models/index");
const Categories = db.sequelize.models.Categories;
const IsAuthenticated = require('../helpers/auth/isAuthenticated');
const IsAdmin = require('../helpers/auth/isAdmin');

const router = express.Router();

///////////////////////////////////////////////////////PUT

router.post("/categories", IsAuthenticated, IsAdmin, async (req, res) => {
    try{
        const name = req.body.name.toUpperCase().trim();
        const description = req.body.description.toUpperCase().trim();
        
        if(!name || !description){
            res.status(204).json({ message: "All fields must be completed" });
        }
    }
    catch(e){
        res.status(404).json({ message: e.message });
    }
});

