import mongoose from "mongoose";

let User;
if (mongoose.models && mongoose.models.User) {
    User = mongoose.model("User");
} else {
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    age: {
      type: String,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  });

  User = mongoose.model("User", userSchema);
}

export default User
