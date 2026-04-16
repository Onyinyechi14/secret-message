import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SecretLink from "@/models/SecretLink";

const createToken = () => crypto.randomBytes(12).toString("hex");

export async function POST() {
  try {
    await connectDB();

    const secretLink = await SecretLink.create({
      shareId: createToken(),
      inboxId: createToken(),
    });

    return NextResponse.json({
      shareId: secretLink.shareId,
      inboxId: secretLink.inboxId,
    });
  } catch (error) {
    console.error("[CREATE LINK] Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create secret link",
      },
      { status: 500 },
    );
  }
}
