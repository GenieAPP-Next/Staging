import { DataTypes } from "sequelize";

import sequelize from "@/server-action/middlewares/dbConnection";

const Categories = sequelize.define("categories", {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
});

export default Categories;
