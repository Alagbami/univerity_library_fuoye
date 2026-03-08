"use server";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import BookActions from "@/components/admin/BookActions";

const Page = async () => {
  const allBooks = await db.select().from(books);

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-7">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-x-auto">
        {allBooks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No books found. Create your first book!
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Author
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Genre
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Total Copies
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Available
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Rating
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allBooks.map((book) => (
                <tr
                  key={book.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {book.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {book.author}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {book.genre}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {book.totalCopies}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {book.availableCopies}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {book.rating}★
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <BookActions bookId={book.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Page;
