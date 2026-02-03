import mongoose from "mongoose";
const DB_NAME = "verifyx_db"

const connectDB = async () => {
  try {
    let connnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MONGODB connected (:) DB HOST: ${connnectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB Connection error ", error);
    process.exit(1);
  }
};

export default connectDB;