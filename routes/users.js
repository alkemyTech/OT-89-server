const express = require("express");
const db = require("../models/index");
const User = db.sequelize.models.User;
const IsAuthenticated = require('../helpers/auth/isAuthenticated')
// const { IsAdmin } = require('../helpers/auth/isAdmin')

const router = express.Router();
/////////////////////////////////////////////////////////////////////GET

router.get("/:id", IsAuthenticated, async (req, res) => { // agregar el IsAdmin para que no se hookeen 
  try {
    const { firstName, lastName, email } = await User.findByPk(req.params.id);

    const response = { firstName, lastName, email };

    res.json({data: response});
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

/////////////////////////////////////////////////////////////////////PUT

router.put("/:id", IsAuthenticated, async (req, res) => {
  try {
    if(req.user.userId == req.params.id || req.user.roleId === 1) {
      if(req.user.roleId === 1){
        const response = await User.update(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            roleId: req.body.roleId
          },
          {
            where: { userId: req.params.id}, 
          });
          response ? res.json({data: req.body }) : res.json({ response }) 
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
        response ? res.json({data: req.body }) : res.json({ response })
      }
    } else {
      res.status(403).json({ message: "You are not allowed to be here!" })
    }
  } catch (e) {
    res.status(400).json({ message: e.message});
  }
});

/////////////////////////////////////////////////////////////////////DELETE
//Borrado logico, paranoid configurado en models

router.delete("/:id", IsAuthenticated, async (req, res) => {
  try {
    let query = await User.findByPk(req.params.id);

    if (!query) {
      //Si no encuentra el usuario no existe
      res.status(400).json({ message: "User not found" })
    }
    const response = await User.destroy({
      where: { userId: req.params.id },
    });
    res.json(response);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
});

module.exports = router;
