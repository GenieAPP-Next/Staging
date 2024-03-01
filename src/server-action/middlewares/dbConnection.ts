import { Sequelize } from "sequelize";

// Your database URL
const DB_URL = "postgres://postgres.uxvzogtukfcachazhbsg:Genie123!@#@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

// Initialize Sequelize with your database URL
const sequelize = new Sequelize(DB_URL, { dialect: "postgres", dialectModule: require('pg'), logging: false });

// Sync models with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("DATABASE CONNECTED");

    // Sync models with the database
    await sequelize.sync();
    console.log("Models synced with the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
})();

export default sequelize;
