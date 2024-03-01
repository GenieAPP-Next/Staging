import { DataTypes } from "sequelize";

import sequelize from "@/server-action/middlewares/dbConnection";

import Users from "./Users.model";
import Groups from "./Groups.model";

const GroupMembers = sequelize.define("group_members", {
  group_member_id: {
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

GroupMembers.belongsTo(Users, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

GroupMembers.belongsTo(Groups, {
  foreignKey: "group_id",
  targetKey: "group_id",
});

export default GroupMembers;
