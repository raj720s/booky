import catchAsync from "../middlewares/asyncError";
import userModel from "../models/userModel";
import APIFeatures from "../utils/Features";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import crypto from "crypto";
import absoluteUrl from "next-absolute-url";
import sendMail from "../utils/sendEmail";

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_Api,
  api_secret: process.env.cloudinary_Key,
});

export const registerUserController = catchAsync(async (req, res) => {
  const rest = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "booky/avatars",
    width: "150",
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: rest.public_id,
      url: rest.secure_url,
    },
  });
  res.status(200).json({
    msg: "user created successfully",
    user: user,
  });
});

export const currentUserController = catchAsync(async (req, res) => {
  // req.user is set from  the  authMiddware
  const user = await userModel.findById(req.user._id);

  res.status(200).json({
    user: user,
    msg: "user loaded successfully",
  });
});

export const updateUserProfileController = catchAsync(async (req, res) => {
  // req.user is set from  the  authMiddware
  const user = await userModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.password) user.password = req.body.password;
  }
  if (req.body.avatar) {
    const public_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);
    const res = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "booky/avatars",
      width: "150",
      crop: "scale",
    });
    user.avatar = {
      public_id: res.public_id,
      url: result.secure_url,
    };
  }

  await user.save();

  res.status(200).json({
    user: user,
    msg: "user created successfully",
  });
});

export const forgotPasswordController = catchAsync(async (req, res, nxt) => {
  // req.user is set from  the  authMiddware
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return nxt(new ErrorHandler("user not found with this email", 404));
  }

  const resetkn = user.getResetPasswordToken(); // db method

  await user.save({ validateBeforeSave: false });

  const url = absoluteUrl(req);

  const resetUrl = `${url}/password/reset/${resetkn}`;

  const message = `click to reset password: \n\n ${resetUrl} \n\n please ignore if you didnot request this`;

  try {
    sendMail({
      email: user.email,
      subject: "password recovery",
      message: message,
    });
    res.status(200).json({
      msg: "ok",
      message: `email sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return nxt(new ErrorHandler(err.message, 500));
  }
});

export const resetPasswordController = catchAsync(async (req, res, nxt) => {
  const resetPasstkn = crypto
    .createHash("sha256")
    .update(req.query.token)
    .digest("hex");
  const user = await userModel.findOne({
    resetPasswordToken: resetPasstkn,
    resetPasswordExpire: { $gt: Date.now() }, // gt  is greater than
  });
  if (!user) {
    return nxt(new ErrorHandler("password reset tkn expired", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return nxt(new ErrorHandler("passwords do not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res.status(200).json({
    msg: "password changed success fully",
  });
});
