import express  from "express"
import cors from 'cors'
import db from "./config/db.js"
import routerUser from './routes/user.routes.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use('/users', routerUser)

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

app.listen(5000, ()=>{
    console.log('Server UP running in http://localhost:5000/')
})