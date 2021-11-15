const db = require("../models/index");
const testimonials = db.sequelize.models.testimonials;

const update = async (id, dataBody) => {
  const data = {
    name: dataBody.name,
    image: dataBody.image,
    content: dataBody.content,
  };
  const byEntry = await getByentryId(id);
  try {
    return await testimonials.update(data, {
      returning: true,
      where: {
        id: id,
      },
    });
  } catch (e) {
    res.status(404).json({ message: "Cant make this request" });
  }
  
};





const deleteOperation = async (id)=>{
    
    const deleteOpertion = await testimonials.destroy({
      where: {
        id: id,

      }
    });
    return deleteOpertion;

  };

  module.exports = {
    update,
    deleteOperation
  };