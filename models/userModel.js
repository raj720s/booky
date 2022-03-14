import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { createHash } from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [3, "Your password must be longer than 3 characters"],
    select: false,
  },
  avatar: {
    required: false,
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (nxt) {
  if (!this.isModified("password")) {
    nxt();
  }
  this.password = await bcrypt.hash(this.password, 10);
  // salt also makes the password level of encryption
});

userSchema.methods.comparePassword = async function (entpass) {
  return await bcrypt.compare(entpass, this.password);
};

// gen passwrd reset tojken

userSchema.methods.getResetPasswordToken = function () {
  //genrate token
  const resetToken = crypto.randomBytes(20).toString();
  //hash and set reset password
  this.resetPasswordToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set token expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 mins
  return resetToken;
};

export default mongoose.models.User || mongoose.model("User", userSchema);
