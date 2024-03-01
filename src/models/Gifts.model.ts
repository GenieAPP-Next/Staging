import { DataTypes } from "sequelize";

import sequelize from "@/server-action/middlewares/dbConnection";

import Groups from "./Groups.model";
import Users from "./Users.model";

const Gifts = sequelize.define("gifts", {
  gift_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  added_by_user_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  gift_category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Gifts.belongsTo(Groups, {
  foreignKey: "group_id",
  targetKey: "group_id",
});

Gifts.belongsTo(Users, {
  foreignKey: "added_by_user_id",
  targetKey: "user_id",
});

export default Gifts;
