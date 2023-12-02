import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Chatbox-scada database connected successfully!");
  } catch (error) {
    console.log(`Getting Error from DB connection  ${error}`);
  }
};

export default connectToDB;
