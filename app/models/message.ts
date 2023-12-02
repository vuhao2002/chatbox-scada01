import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewChat",
    },
    text: String,
    name: String,
  },
  { timestamps: true }
);

const Message =
  mongoose.models.Messages || mongoose.model("Messages", MessageSchema);

export default Message;
