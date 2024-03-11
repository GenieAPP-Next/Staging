import { DataTypes } from "sequelize";

import sequelize from "@/server-action/middlewares/dbConnection";

import Bills from "./Bills.model";
import Users from "./Users.model";
import Groups from "./Groups.model";

const BillSplits = sequelize.define("bill_splits", {
  bill_split_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  bill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  amount: {
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

BillSplits.belongsTo(Bills, {
  foreignKey: "bill_id",
  targetKey: "bill_id",
});

BillSplits.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

BillSplits.belongsTo(Groups, {
  foreignKey: "group_id",
  targetKey: "group_id",
});

export default BillSplits;
