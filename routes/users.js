const express = require("express");
const db = require("../models/index");
const User = db.sequelize.models.User;
const IsAuthenticated = require('../helpers/auth/isAuthenticated');
const generateToken = require("../helpers/auth/generateToken");
const IsAdmin = require('../helpers/auth/isAdmin')


const router = express.Router();
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

    const response = { firstName, lastName, email, roleId };

    res.json({ data: response });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

/////////////////////////////////////////////////////////////////////PUT

router.put("/:id", IsAuthenticated, async (req, res) => {
  try {
    if (req.user.userId == req.params.id || req.user.roleId === 1) {
      if (req.user.roleId === 1) {
        const response = await User.update(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            roleId: req.body.roleId
          },
          {
            where: { userId: req.params.id },
          });
        if (response) {
          const token = generateToken(req.body)
          res.json({
            message: "Profile updated",
            token: token
          })
        } else {
          res.json({ response })
        }
      } else {
        const response = await User.update(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
          },
          {
            where: { userId: req.params.id },
          }
        )
        if (response) {
          const token = generateToken(req.body)
          res.json({
            message: "Profile updated",
            token: token
          })
        } else {
          res.json({ response })
        }
      }
    } else {
      res.status(403).json({ message: "You are not allowed to be here!" })
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

/////////////////////////////////////////////////////////////////////DELETE
//Borrado logico, paranoid configurado en models

router.delete("/:id", IsAuthenticated, async (req, res) => {
  try {
    if (req.params.id === req.user.userId || req.user.roleId === 1) {
      let query = await User.findByPk(req.params.id);
      if (!query) {
        //Si no encuentra el usuario no existe
        res.status(400).json({ message: "User not found" })
      } else {
        const response = await User.destroy({
          where: { userId: req.params.id },
        });
        res.json(response);
      }
    }
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

module.exports = router;
