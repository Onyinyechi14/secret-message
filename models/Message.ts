import mongoose, { Schema, Types } from "mongoose";

const messageSchema = new Schema(
  {
    linkId: {
      type: Schema.Types.ObjectId,
      ref: "SecretLink",
      required: true,
      index: true,
    },
    encryptedText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export type MessageDocument = {
  _id: Types.ObjectId;
  linkId: Types.ObjectId;
  encryptedText: string;
  createdAt: Date;
};

export default (mongoose.models.Message as mongoose.Model<MessageDocument>) ||
  mongoose.model<MessageDocument>("Message", messageSchema);
