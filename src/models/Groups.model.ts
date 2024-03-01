import { DataTypes } from "sequelize";

import sequelize from "@/server-action/middlewares/dbConnection";

import Users from "./Users.model";

const Groups = sequelize.define("groups", {
  groups_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  event_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  creator_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Groups.belongsTo(Users, {
  foreignKey: "creator_user_id",
  targetKey: "user_id",
});

export default Groups;
