//importamos la conexión a la DB
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

 const usermodel = db.define('users', {
    documentType: { type: DataTypes.STRING },
    Document: { type: DataTypes.STRING },
    user: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    rol: { type: DataTypes.STRING },
    pass: { type: DataTypes.STRING },
    Title: { type: DataTypes.STRING },
    titleArea: { type: DataTypes.STRING },
    refresh_token:{
      type: DataTypes.TEXT
  }
 } , {
   freezeTableName:true
});
(async () => {
   await db.sync();
})();

 export default usermodel