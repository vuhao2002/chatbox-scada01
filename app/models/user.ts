import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: {
    type: String,
    required: true,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png",
  },
  role: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
