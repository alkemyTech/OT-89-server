const testimonials = require("../models/testimonials");

const update = async (id, dataBody) => {
  const data = {
    name: dataBody.name,
    image: decode.image,
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
  res.status(201).json({ message: "fue modificado, Nuevos datos:" + data });
};





const deleteOperation = async (id)=>{
    
    const deleteOpertion = await balanceModel.destroy({
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