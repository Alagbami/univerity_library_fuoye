"use server";

import React from "react";
import { db } from "@/database/drizzle";
import { borrowRecords, users, books } from "@/database/schema";
import { Button } from "@/components/ui/button";
import BorrowActions from "@/components/admin/BorrowActions";
import { desc, eq } from "drizzle-orm";

const Page = async () => {
  // Fetch all borrow records with user and book information
  const allBorrows = await db
    .select({
      id: borrowRecords.id,
      userId: borrowRecords.userId,
      bookId: borrowRecords.bookId,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
      userName: users.fullName,
      userEmail: users.email,
      bookTitle: books.title,
      bookAuthor: books.author,
    })
    .from(borrowRecords)
    .innerJoin(users, eq(borrowRecords.userId, users.id))
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .orderBy(desc(borrowRecords.borrowDate));

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isOverdue = (dueDate: Date | string | null, status: string) => {
    if (!dueDate || status === "RETURNED") return false;
    return new Date(dueDate) < new Date();
  };

  const borrowedCount = allBorrows.filter(
    (b) => b.status === "BORROWED"
  ).length;
  const returnedCount = allBorrows.filter(
    (b) => b.status === "RETURNED"
  ).length;
  const overdueCount = allBorrows.filter(
    (b) => isOverdue(b.dueDate, b.status)
  ).length;

  return (
    <section className="w-full">
      <div className="mb-7">
        <h2 className="text-2xl font-semibold mb-5">Borrow Management</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl p-4 bg-blue-100 shadow-sm">
            <p className="text-sm font-medium text-blue-800 mb-1">
              Total Borrows
            </p>
            <p className="text-2xl font-bold text-blue-900">
              {allBorrows.length}
            </p>
          </div>
          <div className="rounded-xl p-4 bg-orange-100 shadow-sm">
            <p className="text-sm font-medium text-orange-800 mb-1">
              Currently Borrowed
            </p>
            <p className="text-2xl font-bold text-orange-900">
              {borrowedCount}
            </p>
          </div>
          <div className="rounded-xl p-4 bg-red-100 shadow-sm">
            <p className="text-sm font-medium text-red-800 mb-1">
              Overdue Books
            </p>
            <p className="text-2xl font-bold text-red-900">{overdueCount}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-7 shadow-sm overflow-x-auto">
        {allBorrows.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No borrow records found.
          </div>
        ) : (
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  User
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Book
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Borrowed Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Due Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Return Date
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allBorrows.map((borrow) => {
                const overdue = isOverdue(borrow.dueDate, borrow.status);
                const statusColor =
                  borrow.status === "RETURNED"
                    ? "bg-green-100 text-green-800"
                    : overdue
                      ? "bg-red-100 text-red-800"
                      : "bg-orange-100 text-orange-800";

                const statusLabel =
                  borrow.status === "RETURNED"
                    ? "Returned"
                    : overdue
                      ? "Overdue"
                      : "Borrowed";

                return (
                  <tr
                    key={borrow.id}
                    className={`border-b hover:bg-gray-50 transition ${overdue ? "bg-red-50" : ""}`}
                  >
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">
                          {borrow.userName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {borrow.userEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div>
                        <p className="font-medium text-gray-900">
                          {borrow.bookTitle}
                        </p>
                        <p className="text-xs text-gray-600">
                          {borrow.bookAuthor}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatDate(borrow.borrowDate)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      <span
                        className={
                          overdue ? "font-semibold text-red-600" : ""
                        }
                      >
                        {formatDate(borrow.dueDate)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {formatDate(borrow.returnDate)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <BorrowActions borrowId={borrow.id} status={borrow.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Page;
