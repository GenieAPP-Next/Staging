import { DataTypes } from "sequelize";

import sequelize from "@/server-action/middlewares/dbConnection";

import Users from "./Users.model";
import Gifts from "./Gifts.model";

const Votes = sequelize.define("votes", {
  vote_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  gift_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

Votes.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

Votes.belongsTo(Gifts, {
  foreignKey: "gift_id",
  targetKey: "gift_id",
});

export default Votes;
