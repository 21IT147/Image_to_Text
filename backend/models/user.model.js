  import mongoose from "mongoose";

  const { Schema } = mongoose;

  const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], 
    },
    password: {
      type: String,
      required: true,
    },
    images: [String] 
  });

  const User = mongoose.model("User", userSchema);

  export default User;
