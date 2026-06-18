import { Request, Response } from "express";
import User from "../models/user.model";

export const getProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const decoded = (req as any).user as {
      userId: string;
    };

    const user = await User.findById(
      decoded.userId
    ).select("-password -otp -otpExpiry");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(
      "Get profile error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching profile",
    });
  }
};