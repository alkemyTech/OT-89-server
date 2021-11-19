const db = require("../models/index");
const Categories = db.sequelize.models.Categories;


const createCategory = async (req, res, next) => {
    try{
        const {name, description} = req.body;

        if(!name || !description){
            res.status(400).json({ message: "All fields must be completed" });
        }else{
            const response = await Categories.create({
                name: name.trim(),
                description: description.trim()
            },
            {
                fields: ["name", "description"]
            });

            res.status(201).json(response);
        }
    }
    catch(e){
        next(e);
    }
}
module.exports = {createCategory};