const express = require('express');
const router = express.Router();
const User = require('../models/user')

/////////////////////////////////////////////////////////////////////GET

router.get('/', async (req, res) => {
  try{        
      const {firstName, lastName, email} = await User.findOne({ 
          where: {email: req.user.email}})

      const response = {firstName, lastName, email}

      res.send(response);               
  }
  catch(e){
      res.status(403).send({message: e.message});
  }
})

module.exports = router;
