import {Sequelize} from 'sequelize'

const db = new Sequelize('timv1','root','Melany2022',{
    host:'localhost',
    dialect: 'mysql'
})

export default db