import { DataTypes } from "sequelize";

import sequelize from "@/server-action/middlewares/dbConnection";

import Groups from "./Groups.model";

const SharedLinks = sequelize.define("shared_links", {
  shared_link_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  shared_with: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  link_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

SharedLinks.belongsTo(Groups, {
  foreignKey: "group_id",
  targetKey: "group_id",
});

export default SharedLinks;
