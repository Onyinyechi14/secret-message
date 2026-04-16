import mongoose, { Schema, Types } from "mongoose";

const secretLinkSchema = new Schema(
  {
    shareId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    inboxId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 2592000,
    },
  },
  {
    versionKey: false,
  },
);

export type SecretLinkDocument = {
  _id: Types.ObjectId;
  shareId: string;
  inboxId: string;
  createdAt: Date;
};

export default (mongoose.models.SecretLink as mongoose.Model<SecretLinkDocument>) ||
  mongoose.model<SecretLinkDocument>("SecretLink", secretLinkSchema);
