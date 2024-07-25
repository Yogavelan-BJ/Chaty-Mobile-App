import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB Connection Successful");
  } catch (error) {
    console.log(
      `There was an error connecting to the database : ${error.message}`
    );
  }
};
export default connectToMongoDB;
