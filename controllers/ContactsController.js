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

//Verify content fiels name and email
//@ROUTE /contacts
//@METHOD POST
const StoreContact= async(req,res,next)=>{
  const {name,phone,email,message} =req.body

  if(!name && !email){
    res.status(400).json({message:"Todos los campos deben ser completados"})
  }else{
    const storeContact= await Contact.create(
      {name,phone,email,message},
      {attributes:[name,phone,email,message],
        validation:true
      }
    )
    res.status(201).json({message:"Ok",data:storeContact})
  }

}

module.exports = { ContactsList,StoreContact };
