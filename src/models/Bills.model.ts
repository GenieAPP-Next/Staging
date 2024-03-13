import { DataTypes } from "sequelize";

import sequelize from "@/server-action/middlewares/dbConnection";

import Gifts from "./Gifts.model";

const Bills = sequelize.define("bills", {
  bill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  gift_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  total_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

Bills.belongsTo(Gifts, {
  foreignKey: "gift_id",
  targetKey: "gift_id",
});

export default Bills;
