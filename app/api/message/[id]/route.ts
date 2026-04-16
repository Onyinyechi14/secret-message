import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { encryptMessage } from "@/lib/encryption";
import Message from "@/models/Message";
import SecretLink from "@/models/SecretLink";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET() {
  return NextResponse.json(
    { error: "Use this link page to send a message." },
    { status: 400 },
  );
}

export async function POST(req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const { text } = await req.json();

    if (!text || !String(text).trim()) {
      return NextResponse.json(
        { error: "Message text is required" },
        { status: 400 },
      );
    }

    await connectDB();

    const secretLink = await SecretLink.findOne({ shareId: id }).lean();

    if (!secretLink) {
      return NextResponse.json({ error: "Secret link not found" }, { status: 404 });
    }

    const encrypted = encryptMessage(String(text).trim());

    await Message.create({
      linkId: secretLink._id,
      encryptedText: encrypted,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[SEND MESSAGE] Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to send message",
      },
      { status: 500 },
    );
  }
}
