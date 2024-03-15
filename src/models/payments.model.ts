import { DataTypes } from "sequelize";

import sequelize from "@/server-action/middlewares/dbConnection";

import BillSplits from "./BillSplits.model";

const Payments = sequelize.define("bill_splits", {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  bill_split_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  confirmation_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
  },
});

Payments.belongsTo(BillSplits, {
  foreignKey: "bill_split_id",
  targetKey: "bill_split_id",
});

export default Payments;
