import mongoose from "mongoose";

const NewChatSchema = new mongoose.Schema(
  {
    userID: String,
  },
  { timestamps: true }
);

const NewChat =
  mongoose.models.NewChat || mongoose.model("NewChat", NewChatSchema);

export default NewChat;
