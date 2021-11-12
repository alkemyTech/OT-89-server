const db = require("../models/index");

const Contact = db.sequelize.models.Contact;

//@DESC Brings the whole list of contacts
//@ROUTE /contacts
//@METHOD GET
const ContactsList = async (req, res, next) => {
  try {
    const contactsArr = await Contact.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (!contactsArr) {
      throw new Error("Unexpected.");
    } else if (contactsArr.length == 0) {
      res.sendStatus(204);
    } else {
      res.status(200).json({ message: "Ok!", data: contactsArr });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { ContactsList };
