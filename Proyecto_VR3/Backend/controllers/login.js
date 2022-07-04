import bcrypt from 'bcrypt';
import usermodel from "../models/user.model.js";
import  jwt from "jsonwebtoken";


export const login = async (req, res) => {

    const { email, pass } = req.body;
  
    usermodel.findOne({ email }).then((usuario) => {
      if (!usuario) {
        return res.json({ mensaje: "Usuario no encontrado" });
      }
  
      bcrypt.compare(pass, usuario.pass).then((esCorrecta) => {
        if (esCorrecta) {
          const { id, name } = usuario;
  
          const data = {
            id,
            name,
          };
  
          const token = jwt.sign(data, "secreto", {
            expiresIn: 86400 /* 24hs */,
          });
  
          res.json({
            mensaje: "Usuario logeado correctamente",
            usuario: {
              id,
              name,
              token,
            },
          });
        } else {
          return res.json({ mensaje: "Contraseña incorrecta" });
        }
      });
    });
  };

  //Cerrar sesión

export const logoutUser = async (req, res) => {
  try {

      const userlog = {
          userlog: req.params.user
      };

      const emptyToken = {
          token: ""
      };
      const user = await usermodel.findOneAndUpdate(userlog, emptyToken);
      res.send({
          message: `Goodbye ${user.name}!`
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({
          error,
          message: 'There was a problem trying to disconnected the user'
      })
  }
}
  
