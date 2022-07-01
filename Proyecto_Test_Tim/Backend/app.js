import express  from "express"
import cors from 'cors'
import db from "./database/db.js"
import routerUser from './routers/usersroutes.js'
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();


const app = express()

app.use(cors())
app.use(express.json())
app.use('/users', routerUser)
app.use(cors({ credentials:true, origin:'http://localhost:3000/' }));
app.use(cookieParser());
app.use(express.json());

try {
    await db.authenticate()
    console.log('Conexión exitosa a la DB')
} catch (error) {
    console.log(`El error de conexión es: ${error}`)
}

app.listen(5000, ()=>{
    console.log('Server UP running in http://localhost:5000/')
})