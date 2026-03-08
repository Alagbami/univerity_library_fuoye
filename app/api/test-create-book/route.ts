import { NextResponse } from "next/server";
import { createBook } from "@/lib/admin/actions/book";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createBook(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("API test-create-book error:", error);
    return NextResponse.json({ success: false, message: "server error" }, { status: 500 });
  }
}
