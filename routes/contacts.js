const express = require("express");
const { ContactsList } = require("../controllers/ContactsController");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

const router = express.Router();

//@DESC Brings the whole list of contacts
//@ROUTE /contacts
router.route("/").get(IsAuthenticated, ContactsList);

module.exports = router;
