import { Sequelize } from "sequelize";

// Your database URL
const DB_URL =
  "postgres://postgres.uxvzogtukfcachazhbsg:Genierevounext@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

// Initialize Sequelize with your database URL
const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  dialectModule: require("pg"),
  logging: false,
});


export default sequelize;
