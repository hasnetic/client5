import Image from "next/image";

const sequelize = require('../lib/db');
const User = require('../lib/models/user');
import Login from "./login/page";

async function initDatabase() {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

initDatabase();

export default function Home() {
  return (
    
    <>
    <Login />
    </>
  );
}
