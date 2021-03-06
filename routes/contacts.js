const express = require("express");
const { ContactsList,StoreContact } = require("../controllers/ContactsController");
const IsAdmin = require("../helpers/auth/isAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

const router = express.Router();

//@DESC Brings the whole list of contacts
//@ROUTE /contacts
router.route("/").get(IsAuthenticated, IsAdmin, ContactsList);

router.route("/").post(IsAuthenticated, IsAdmin,StoreContact)

module.exports = router;
