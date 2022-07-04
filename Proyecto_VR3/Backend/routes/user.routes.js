import express from 'express'
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/usercontroller.js'
import { login } from '../controllers/login.js'
const routerUser = express.Router()

routerUser.get('/', getAllUsers)
routerUser.get('/:id', getUser)
routerUser.post('/', createUser)
routerUser.put('/:id', updateUser)
routerUser.delete('/:id', deleteUser)
routerUser.post('/login', login)
routerUser.post('/logoutUser', login)

export default routerUser