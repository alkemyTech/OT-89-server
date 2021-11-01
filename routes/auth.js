const express = require('express');
const router = express.Router();
const {validateLogin} = require('../auth/expressValidator');
const {login}= require('../servises/login');


router.post('/login',validateLogin,(req, res) => {login});