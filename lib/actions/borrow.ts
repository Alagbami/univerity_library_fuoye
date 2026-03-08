"use server";

import { db } from "@/database/drizzle";
import { borrowRecords, books } from "@/database/schema";
import { eq } from "drizzle-orm";

interface ActionResult {
  success: boolean;
  message?: string;
}

export const markAsReturned = async (borrowId: string): Promise<ActionResult> => {
  try {
    const record = await db
      .select({ bookId: borrowRecords.bookId })
      .from(borrowRecords)
      .where(eq(borrowRecords.id, borrowId))
      .limit(1);

    if (record.length) {
      // update borrow record status and returnDate
      await db
        .update(borrowRecords)
        .set({ status: "RETURNED", returnDate: new Date().toDateString() })
        .where(eq(borrowRecords.id, borrowId));

      // fetch current available copies
      const bookData = await db
        .select({ availableCopies: books.availableCopies })
        .from(books)
        .where(eq(books.id, record[0].bookId))
        .limit(1);

      if (bookData.length) {
        await db
          .update(books)
          .set({
            availableCopies: bookData[0].availableCopies + 1,
          })
          .where(eq(books.id, record[0].bookId));
      }
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to mark as returned" };
  }
};

export const rejectBorrow = async (borrowId: string): Promise<ActionResult> => {
  try {
    const record = await db
      .select({ bookId: borrowRecords.bookId, status: borrowRecords.status })
      .from(borrowRecords)
      .where(eq(borrowRecords.id, borrowId))
      .limit(1);

    if (record.length) {
      // if it was borrowed, restore copy count
      if (record[0].status === "BORROWED") {
        const bookData = await db
          .select({ availableCopies: books.availableCopies })
          .from(books)
          .where(eq(books.id, record[0].bookId))
          .limit(1);

        if (bookData.length) {
          await db
            .update(books)
            .set({
              availableCopies: bookData[0].availableCopies + 1,
            })
            .where(eq(books.id, record[0].bookId));
        }
      }

      // delete the record entirely
      await db.delete(borrowRecords).where(eq(borrowRecords.id, borrowId));
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to reject borrow" };
  }
};
