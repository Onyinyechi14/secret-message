import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    console.log("[DB] Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("[DB] Connected successfully");
  } catch (error) {
    console.error(
      "[DB] Connection error:",
      error instanceof Error ? error.message : error,
    );
    throw error;
  }
};
