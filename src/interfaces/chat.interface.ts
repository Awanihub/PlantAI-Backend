import mongoose from "mongoose";

export interface IMessage {
  role: "user" | "assistant";

  content: string;
}

export interface IChat {
  _id?: mongoose.Types.ObjectId;

  userId: mongoose.Types.ObjectId;

  plantScanId: mongoose.Types.ObjectId;

  messages: IMessage[];

  expiresAt: Date;

  createdAt?: Date;

  updatedAt?: Date;
}