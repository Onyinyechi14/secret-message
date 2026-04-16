import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "Message id is required" },
    { status: 400 },
  );
}

export async function POST() {
  return NextResponse.json(
    { error: "Message id is required" },
    { status: 400 },
  );
}
