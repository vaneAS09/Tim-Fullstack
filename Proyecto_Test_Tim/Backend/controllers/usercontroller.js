//importamos el Modelo
import usermodel from "../models/usermodel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


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
       const { documentType, Document,lastName, rol, name, user, pass, Title, titleArea,refresh_token } = req.body;
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
       titleArea:titleArea,
       refresh_token:refresh_token,
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

// Usuario iniciar sesión

export const Login = async(req, res) => {
    try {
        const users = await usermodel.findAll({
            where:{
                user: req.body.user
            }
        });
        const match = await bcrypt.compare(req.body.pass, users[0].pass);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const id = users[0].id;
        const name = users[0].name;
        const user = users[0].user;
        const accessToken = jwt.sign({id, name, user}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
            
        });
     
        const refreshToken = jwt.sign({id, name, user}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await usermodel.update({refresh_token: refreshToken},{
            where:{
                id: id
            }
        });
   
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        console.log(error);
        res.status(404).json({msg:"User not found"});
    }
}
 
// Usuario Cerrar sesión 

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const users = await usermodel.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!users[0]) return res.sendStatus(204);
    const userId = users[0].id;
    await usermodel.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}
