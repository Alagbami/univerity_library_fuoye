import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = (await db
      .selectDistinct({
        genre: books.genre,
      })
      .from(books)
      .orderBy(books.genre)) as { genre: string }[];

    const genres = result.map((item) => item.genre);

    return NextResponse.json({ genres });
  } catch (error) {
    console.error("Genres fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch genres" },
      { status: 500 }
    );
  }
}
