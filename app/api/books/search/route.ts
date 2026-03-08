import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { ilike, and, eq, gt, desc, asc, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("q");
    const genre = request.nextUrl.searchParams.get("genre");
    const availability = request.nextUrl.searchParams.get("availability");
    const sort = request.nextUrl.searchParams.get("sort") || "newest";

    // Build where conditions
    const conditions = [];

    if (query && query.trim().length > 0) {
      conditions.push(
        ilike(books.title, `%${query}%`)
      );
    }

    if (genre && genre !== "all") {
      conditions.push(eq(books.genre, genre));
    }

    if (availability === "available") {
      conditions.push(gt(books.availableCopies, 0));
    } else if (availability === "borrowed") {
      conditions.push(eq(books.availableCopies, 0));
    }

    // Build query
    let queryBuilder = db.select().from(books);

    if (conditions.length > 0) {
      queryBuilder = queryBuilder.where(and(...conditions));
    }

    // Add sorting
    if (sort === "newest") {
      queryBuilder = queryBuilder.orderBy(desc(books.createdAt));
    } else if (sort === "alphabetical") {
      queryBuilder = queryBuilder.orderBy(asc(books.title));
    } else if (sort === "rating") {
      queryBuilder = queryBuilder.orderBy(desc(books.rating));
    }

    const searchResults = (await queryBuilder.limit(50)) as Book[];

    return NextResponse.json({ books: searchResults });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search books" },
      { status: 500 }
    );
  }
}
