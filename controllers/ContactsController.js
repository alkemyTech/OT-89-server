const db = require("../models/index");
const sendMail = require("../services/sendMail");

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

//Verify content fiels name and email
//@ROUTE /contacts
//@METHOD POST
const StoreContact = async (req, res, next) => {
  const { name, phone, email, message } = req.body;

  if (!name || !email) {
    res.status(400).json({ message: "Todos los campos deben ser completados" });
  } else {
    try {
      const storeContact = await Contact.create(
        { name, phone, email, message },
        { attributes: [name, phone, email, message], validation: true }
      );
      const subject = "Su contacto fue recepcionado";
      const text = `Tu contacto fue recibido correctamente, gracias ${name} por tu interés`;
      sendMail(email, subject, text);
      res.status(201).json({ message: "Ok", data: storeContact });
    } catch (err) {
      if (err.errors.validationErrorItem.message) {
        res.status(400).json(err.errors.validationErrorItem.message);
      } else {
        next(err);
      }
    }
  }
};

module.exports = { ContactsList, StoreContact };
