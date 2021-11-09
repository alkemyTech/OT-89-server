const express = require("express");
const router = express.Router();
const db = require("../models/index");
const User = db.sequelize.models.User;
const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");

//importar middleware de autenticacion

/////////////////////////////////////////////////////////////////////GET

router.get("/", IsAuthenticated, IsAdmin, async (req, res) => {
  try {
    const dataUsers = await User.findAll();
    res.status(200).json({ 
      message: "Estos son los usuarios de la base de datos",
      data: dataUsers
    })
  }
  catch (error) {
    res.json({ error: error })
  }
})


router.get("/:id", async (req, res) => {
  try {
    const { firstName, lastName, email } = await User.findByPk(req.params.id);

    const response = { firstName, lastName, email };

    res.send(response);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});

/////////////////////////////////////////////////////////////////////PUT

router.put("/:id", async (req, res) => {
  try {
    const response = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
      {
        where: { userId: req.params.id },
      }
    );
    res.send(response);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

/////////////////////////////////////////////////////////////////////DELETE
//Borrado logico, paranoid configurado en models

router.delete("/:id", async (req, res) => {
  try {
    let query = await User.findByPk(req.params.id);

    if (!query) {
      //Si no encuentra el usuario no existe
      res.status(400).json({ message: "User not found" })
    }
    const response = await User.destroy({
      where: { userId: req.params.id },
    });
    res.send(response);
  } catch (e) {
    res.status(404).send({ message: e.message });
  }
});

module.exports = router;
