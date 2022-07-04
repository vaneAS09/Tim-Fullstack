//importamos el Modelo
import usermodel from "../models/user.model.js";
import bcrypt from 'bcrypt';


//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllUsers = async (req, res) => {
    try {
        const users = await usermodel.findAll()
        res.json(users)
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Mostrar un registro
export const getUser = async (req, res) => {
        try {
            const user = await usermodel.findAll({
                where:{ id:req.params.id }
            })
            res.json(user[0])
        } catch (error) {
            res.json( {message: error.message} )
        }
}
//Crear un registro
export const createUser = async (req, res) => {
    try {
       const { documentType, Document,lastName, rol, name, user, pass, Title, titleArea } = req.body;
       bcrypt.hash(pass, 10).then((hash) => {
       usermodel.create({
       documentType:documentType,
       Document: Document,
       user: user,
       name: name,
       lastName:lastName,
       rol:rol,
       pass: hash,
       Title:Title,
       titleArea:titleArea
     });
     res.json("Registro creado de manera exito");
    });
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Actualizar un registro
export const updateUser = async (req, res) => {
    try {
        req.body.pass = await bcrypt.hash(req.body.pass, 10)
            await usermodel.update(req.body, {
            where: { id: req.params.id}
        })
        res.json({
            "message":"¡Registro actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}
//Eliminar un registro
export const deleteUser = async (req, res) => {
    try {
        await usermodel.destroy({ 
            where: { id : req.params.id }
        })
        res.json({
            "message":"¡Registro eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


