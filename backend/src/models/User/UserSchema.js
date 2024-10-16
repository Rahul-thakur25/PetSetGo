import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    AccessToken: {
      type: String,
      default: null,      // Default value is null
      sparse: true,       // Allows multiple null values
    },
    Pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  { timestamps: true }
);

// Create the User model
export default mongoose.model("User", UserSchema);
// done