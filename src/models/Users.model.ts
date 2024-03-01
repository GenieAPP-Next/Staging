import { DataTypes } from "sequelize";

import sequelize from "@/server-action/middlewares/dbConnection";

const Users = sequelize.define('Users', {
  users_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Synchronize the model with the database (create the table if it doesn't exist)
// Note: You might want to handle this differently in a production environment
// sequelize.sync()
//   .then(() => {
//     console.log('Users table synced');
//   })
//   .catch((error: any) => {
//     console.error('Error syncing Users table:', error);
//   });

module.exports = Users;
