import { usermodel } from "../models/user.model.js";



const getUserById = async (req, res) => {
    const { id } = req.user;
  
    if (id.length === 24) {
    usermodel.findById(id).then((usuario) => {
        if (!usuario) {
          return res.json({
            mensaje: "No se encontro ningun usuario con esa ID",
          });
        } else {
          const { _id, pass, __v, ...resto } = usuario._doc;
          res.json(resto);
        }
      });
    } else {
      res.json({ mensaje: "Estas enviando una contraseña incorrecta" });
    }
  };
  
  module.exports = getUserById;