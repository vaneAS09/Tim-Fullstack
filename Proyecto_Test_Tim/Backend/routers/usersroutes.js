import express from 'express'
import { getAllUsers, getUser, createUser, updateUser, deleteUser, Login, Logout } from '../controllers/usercontroller.js'
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";


const routerUser = express.Router()

routerUser.get('/', getAllUsers,verifyToken)
routerUser.get('/:id', getUser)
routerUser.post('/', createUser)
routerUser.put('/:id', updateUser)
routerUser.delete('/:id', deleteUser)
routerUser.post('/login', Login);
routerUser.get('/token', refreshToken);
routerUser.delete('/logout', Logout);
 

export default routerUser